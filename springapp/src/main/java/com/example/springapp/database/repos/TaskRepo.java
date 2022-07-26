package com.example.springapp.database.repos;

import com.example.springapp.database.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TaskRepo extends JpaRepository<Task, String> {
    /*@Query(value="SELECT task.* FROM user INNER JOIN task ON user.id = task.added_by_id WHERE  task.id = :id",  nativeQuery = true)
    public Task findThatTask(@Param("id") String id);*/
    List<Task> findTasksByAddedBy_Id(String id);
}
