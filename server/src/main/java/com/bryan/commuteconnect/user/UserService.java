package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.user.advice.UserNotFoundException;
import com.bryan.commuteconnect.user.request.UserProfileRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserProfileMapper mapper;

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

    public User setProfile(User user, UserProfileRequest profile) throws UserNotFoundException {
        User updatedUser = mapper.userProfileToUser(profile);
        return userRepository.save(updatedUser);
    }
}
