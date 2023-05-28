package com.bryan.commuteconnect.auth;

import com.bryan.commuteconnect.auth.dto.*;
import com.bryan.commuteconnect.config.JwtService;
import com.bryan.commuteconnect.user.Role;
import com.bryan.commuteconnect.user.User;
import com.bryan.commuteconnect.user.UserRepository;
import com.bryan.commuteconnect.user.UserService;
import com.bryan.commuteconnect.util.response.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public ResponseEntity register(RegisterRequest request) {
        Optional<User> userOptional = repository.findByEmail(request.getEmail());
        if (userOptional.isPresent()) {
            return new ResponseEntity<ErrorResponse>(ErrorResponse.builder().message("Email taken").build(), HttpStatus.CONFLICT);
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return new ResponseEntity<AuthenticationResponse>(AuthenticationResponse.builder()
                .access_token(jwtToken)
                .build(), HttpStatus.OK);
    }

    public ResponseEntity authenticate(AuthenticateRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(AuthenticationResponse.builder().access_token(jwtToken).build());
    }

    public ChangePasswordResponse changePassword(ChangePasswordRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = authentication.getName();
        User user = userService.getUserByEmail(authEmail);
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        repository.save(user);
        return ChangePasswordResponse.builder().message("Password successfully changed").build();
    }
}
