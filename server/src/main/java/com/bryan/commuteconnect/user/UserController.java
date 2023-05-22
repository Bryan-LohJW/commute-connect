package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.user.advice.UserNotFoundException;
import com.bryan.commuteconnect.user.dto.UserDTO;
import com.bryan.commuteconnect.user.dto.UserProfileRequest;
import com.bryan.commuteconnect.user.dto.UserRequest;
import com.bryan.commuteconnect.util.response.ErrorResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {
    private final UserService service;

    // moving forward will change to get user email from sub for security
    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUserByEmail() throws UserNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = authentication.getName();
        User user = service.getUserByEmail(authEmail);
        return ResponseEntity.ok(service.convertUserToDTO(user));
    }

    @PutMapping("/user/profile")
    public ResponseEntity<UserDTO> setUserProfile(@RequestBody UserProfileRequest request) throws UserNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = authentication.getName();
        User user = service.getUserByEmail(authEmail);
        User updatedUser = service.setProfile(user, request);
        return ResponseEntity.ok(service.convertUserToDTO(updatedUser));
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> userNotFoundExceptionHandler(UserNotFoundException exception) {
        return new ResponseEntity<ErrorResponse>(ErrorResponse.builder().message("User not found").build(), HttpStatus.NOT_FOUND);
    }

}
