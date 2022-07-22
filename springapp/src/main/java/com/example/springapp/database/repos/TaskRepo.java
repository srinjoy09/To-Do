package com.example.springapp.database.repos;

import com.example.springapp.database.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TaskRepo extends JpaRepository<Task, String> {
    @Transactional
    void deleteTaskById(int id);
}
