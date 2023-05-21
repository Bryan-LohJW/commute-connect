package com.bryan.commuteconnect.user;

import com.bryan.commuteconnect.user.request.UserProfileRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {
    @Mapping(target = "email", source = "userProfileRequest.userEmail")
    @Mapping(target = "name", source = "name")
    User userProfileToUser(UserProfileRequest userProfileRequest);
}
