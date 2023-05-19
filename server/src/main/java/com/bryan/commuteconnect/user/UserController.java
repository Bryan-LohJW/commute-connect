package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.user.advice.UserNotFoundException;
import com.bryan.commuteconnect.user.request.UserProfileRequest;
import com.bryan.commuteconnect.user.request.UserRequest;
import com.bryan.commuteconnect.util.response.ErrorResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) throws UserNotFoundException {
        return ResponseEntity.ok(service.getUser(id));
    }

    // moving forward will change to get user email from sub for security
    @GetMapping("/user")
    public ResponseEntity<User> getUserByEmail(@RequestBody UserRequest request) throws UserNotFoundException {
        return ResponseEntity.ok(service.getUserByEmail(request.getUserEmail()));
    }

    @PutMapping("/user/profile")
    public ResponseEntity<User> setUserProfile(@RequestBody UserProfileRequest request) throws UserNotFoundException {
        return ResponseEntity.ok(service.setProfile(request.getUserEmail(), request.getUserProfile()));
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> userNotFoundExceptionHandler(UserNotFoundException exception) {
        return new ResponseEntity<ErrorResponse>(ErrorResponse.builder().message("User not found").build(), HttpStatus.NOT_FOUND);
    }

}
