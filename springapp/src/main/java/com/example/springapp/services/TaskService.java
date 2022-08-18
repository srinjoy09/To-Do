package com.example.springapp.services;

import com.example.springapp.database.entities.Task;
import com.example.springapp.database.entities.User;
import com.example.springapp.database.model.UserModel;
import com.example.springapp.database.repos.TaskRepo;
import com.example.springapp.database.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
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
        List<Task> tasks=taskRepo.findTasksByAddedBy_Id(id);
        Collections.sort(tasks, new Comparator<Task>() {public int compare(Task o1, Task o2) {
            return o1.getTimeAdded().compareTo(o2.getTimeAdded());}});
        Collections.sort(tasks, new Comparator<Task>() {public int compare(Task o1, Task o2) {
                return o1.getStatus().length()-o2.getStatus().length();}});
        return tasks;
    }

    public void deleteTask(String taskId){
        taskRepo.deleteById(taskId);
    }

    public Task findTask(String taskId, String userId){
        Task task=taskRepo.findById(taskId).get();
        if (task.getAddedBy().getId() == userId)
            return task;
        else
            return null;
    }

    public List<Task> sortTask(String userId){
        List<Task> tasks=taskRepo.findTasksByAddedBy_Id(userId);
        //taskRepo.findTasksByAddedBy_Id(us)
        //Collections.sort(tasks, (Task a1, Task a2) -> a1.getTimeAdded().compareTo(a2.getTimeAdded()));
        Collections.sort(tasks, new Comparator<Task>() {
            public int compare(Task o1, Task o2) {
                return o1.getTimeAdded().compareTo(o2.getTimeAdded());
            }
        });
        return tasks;
    }
}
