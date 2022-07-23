package com.example.springapp.controller;

import com.example.springapp.database.entities.Task;
import com.example.springapp.database.entities.User;
import com.example.springapp.database.repos.TaskRepo;
import com.example.springapp.database.repos.UserRepo;
import com.example.springapp.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskRepo taskRepo;
    @Autowired
    private UserRepo userRepo;
    //POST
    @PostMapping("/addTask")
    public ResponseEntity<?> addTask(@RequestBody Task task, Authentication authentication) {
        String username=authentication.getName();
        User user = userRepo.findByEmail(username).get();
        task.setAddedBy(user);
        return new ResponseEntity<>(taskService.saveTask(task), HttpStatus.OK);
    }

    @PutMapping("/task/{id}/update")
    public ResponseEntity<?> updateTask(@PathVariable String id, @RequestBody Task task, Authentication authentication) {
        String username=authentication.getName();
        User user = userRepo.findByEmail(username).get();
        task.setAddedBy(user);
        return new ResponseEntity<>(taskService.updateTask(task, id), HttpStatus.OK);
    }

    @DeleteMapping("/task/{id}/delete")
    public ResponseEntity<?> deleteTask(@PathVariable String id){
        taskRepo.deleteById(id);
        return new ResponseEntity<>("Task deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/allTasks")
    public ResponseEntity<?> getAllTasks(Authentication authentication){
        String username=authentication.getName();
        String id=userRepo.findByEmail(username).get().getId();
        return new ResponseEntity<>(taskService.getTasksByUser(id), HttpStatus.OK);
    }

}
