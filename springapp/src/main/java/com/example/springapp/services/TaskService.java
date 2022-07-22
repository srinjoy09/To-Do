package com.example.springapp.services;

import com.example.springapp.database.entities.Task;
import com.example.springapp.database.entities.User;
import com.example.springapp.database.model.UserModel;
import com.example.springapp.database.repos.TaskRepo;
import com.example.springapp.database.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserRepo userRepo;

    //POST
    public Task saveTask(Task task) {
        return taskRepo.save(task);
    }
    public Task updateTask(Task task, int id){
        //Task old=taskRepo.findById(id).get();
        task.setId(id);
        return taskRepo.save(task);
    }

    //Optional!
    /*public List<Course> saveCourses(List<Course> courses) {
        return courseRepository.saveAll(courses);
    }

    //GET
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }
    public Course getCourseById(int id) {
        return courseRepository.findById(id).orElse(null);
    }
    public Course getCourseByName(String name) {
        return courseRepository.findByName(name);
    }
    public List<Course> getCoursesForUser(String username) {
        return courseRepository.findAllByUsername(username);
    }

    //PUT
    public Course updateCourse(Course course) {
        System.out.println("updates");
        Course existing_course = courseRepository.findById(course.getId()).orElse(null);
        existing_course.setName(course.getName());
        existing_course.setDescription(course.getDescription());
        existing_course.setStatus(course.getStatus());
        return courseRepository.save(existing_course);
    }

    //DELETE
    public String deleteCourse(int id) {
        courseRepository.deleteById(id);
        return id + " id -> course removed/completed";
    }*/

}
