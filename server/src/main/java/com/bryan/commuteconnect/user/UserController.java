package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.userProfile.UserProfile;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@AllArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) throws Exception {
        return ResponseEntity.ok(service.getUser(id));
    }

    @ExceptionHandler
    public ResponseEntity handleException() {
        return new ResponseEntity("An error occured", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
