package com.example.springapp.controller;

import com.example.springapp.database.entities.User;
import com.example.springapp.database.repos.UserRepo;
import com.example.springapp.exceptions.UserNotFoundException;
import com.example.springapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserRepo userRepo;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        users.forEach(user -> user.setPassword(null));
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(path = "/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") String userId){
        try {
            return new ResponseEntity<>(userService.getUser(userId), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<String>("User not found with ID: "+userId, HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<String>("Something went wrong on our side. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/user/add")
    public ResponseEntity<?> addUser(@RequestBody User user){
        return new ResponseEntity<User>(userRepo.save(user), HttpStatus.CREATED);
    }

    @DeleteMapping("/user/{id}/delete")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String userId){
        try {
            userRepo.deleteById(userId);
            return new ResponseEntity<String>("User Deleted Successfully", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("Something went wrong on our side. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
