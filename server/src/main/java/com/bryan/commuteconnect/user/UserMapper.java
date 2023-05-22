package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.user.dto.UserDTO;
import com.bryan.commuteconnect.user.dto.UserProfileRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "email", source = "userProfileRequest.userEmail")
    @Mapping(target = "name", source = "name")
    User userProfileToUser(UserProfileRequest userProfileRequest);

    UserDTO userToUserDTO(User user);
}
