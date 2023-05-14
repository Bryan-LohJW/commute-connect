package com.bryan.commuteconnect.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(Integer id) throws Exception {
        Optional<User> userResponse = userRepository.findById(id);
        if (userResponse.isEmpty()) throw new Exception("User not found");
        return userResponse.get();
    }
}
