package com.example.springapp.database.repos;

import com.example.springapp.database.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, String> {

    List<Task> findTasksByAddedBy_Id(String id);
}
