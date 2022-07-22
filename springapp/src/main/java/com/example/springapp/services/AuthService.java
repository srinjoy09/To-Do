package com.example.springapp.services;


import com.example.springapp.database.entities.User;
import com.example.springapp.database.enums.Role;
import com.example.springapp.database.model.UserModel;
import com.example.springapp.database.repos.UserRepo;
import com.example.springapp.exceptions.EmailTakenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User saveUser(UserModel userModel) throws EmailTakenException {
        Optional<User> userOptional = getUserByEmail(userModel.getEmail());
        if (userOptional.isPresent())
            throw new EmailTakenException();
        return userRepo.save(new User(userModel.getEmail(),userModel.getUserName(),passwordEncoder.encode(userModel.getPassword()), Role.CUSTOMER));
    }


}
