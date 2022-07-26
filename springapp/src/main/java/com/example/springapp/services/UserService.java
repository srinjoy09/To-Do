package com.example.springapp.services;

import com.example.springapp.database.entities.User;
import com.example.springapp.database.repos.UserRepo;
import com.example.springapp.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    public UserRepo userRepo;

    public void addUser(User user) {
        userRepo.save(user);
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public User getUser(String id) throws UserNotFoundException {
        Optional<User> userOptional = userRepo.findById(id);
        userOptional.orElseThrow(UserNotFoundException::new);
        return userOptional.get();
    }
    public void deleteUser(String userId) {
        userRepo.deleteById(userId);
    }
}
