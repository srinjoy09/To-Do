package com.example.springapp.services;

import com.example.springapp.database.entities.Task;
import com.example.springapp.database.entities.User;
import com.example.springapp.database.model.UserModel;
import com.example.springapp.database.repos.TaskRepo;
import com.example.springapp.database.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserRepo userRepo;

    //POST
    public Task saveTask(Task task) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter format1 = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a");
        String formatDateTime = currentDateTime.format(format1);
        task.setTimeAdded(formatDateTime);
        return taskRepo.save(task);
    }
    public Task updateTask(Task task, String id){
        //Task old=taskRepo.findById(id).get();
        task.setId(id);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter format1 = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a");
        String formatDateTime = currentDateTime.format(format1);
        task.setTimeAdded(formatDateTime);
        return taskRepo.save(task);
    }
    public List<Task> getTasksByUser(String id){
        return taskRepo.findTasksByAddedBy_Id(id);
    }

}
