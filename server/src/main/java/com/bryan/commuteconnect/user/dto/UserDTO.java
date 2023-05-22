package com.bryan.commuteconnect.user.dto;

import com.bryan.commuteconnect.user.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String email;
    private String name;

    private Gender gender;

    private Integer age;

    private String occupation;

    private String[] interests;

    private String about;
}
