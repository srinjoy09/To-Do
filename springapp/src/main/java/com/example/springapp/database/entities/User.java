package com.example.springapp.database.entities;

import com.example.springapp.database.enums.Role;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String email;
    private String userName;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role = Role.CUSTOMER;

    public User(String email, String userName, String password, Role role) {
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }
}