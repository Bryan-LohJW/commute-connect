package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.user.advice.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(Integer id) throws UserNotFoundException {
        Optional<User> result = userRepository.findById(id);
        if (result.isEmpty()) throw new UserNotFoundException();
        return result.get();
    }

    public User getUserByEmail(String email) throws UserNotFoundException {
        Optional<User> result = userRepository.findByEmail(email);
        if (result.isEmpty()) throw new UserNotFoundException();
        return result.get();
    }

    public ResponseEntity<User> setProfile(String email, UserProfile profile) throws UserNotFoundException {
        Optional<User> result = userRepository.findByEmail(email);
        if (result.isEmpty()) throw new UserNotFoundException();
        User user = result.get();
        user.setProfile(profile);
        return new ResponseEntity<User>(userRepository.save(user), HttpStatus.OK);
    }
}
