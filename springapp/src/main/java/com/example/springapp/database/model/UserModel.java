package com.example.springapp.database.model;

import com.example.springapp.database.enums.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserModel {
    private String email;
    private String userName;
    private String password;
    private Role userRole;


}