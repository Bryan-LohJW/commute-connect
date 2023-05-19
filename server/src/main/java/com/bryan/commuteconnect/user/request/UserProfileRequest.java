package com.bryan.commuteconnect.user.request;

import com.bryan.commuteconnect.user.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRequest {
    private String userEmail;
    private UserProfile userProfile;
}
