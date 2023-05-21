package com.bryan.commuteconnect.user.request;

import com.bryan.commuteconnect.user.Gender;
import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRequest {
    private String userEmail;
    private String name;
    private Gender gender;
    private Integer age;
    private String occupation;
    private String[] interests;
    private String about;
}
