package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.user.dto.UserDTO;
import com.bryan.commuteconnect.user.dto.UserProfileRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO userToUserDTO(User user);
}
