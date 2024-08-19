package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.AssignmentAnswer;
import com.app.entities.User;

public interface AssignmentAnswerRepository extends JpaRepository<AssignmentAnswer, Long> {

	List<AssignmentAnswer> findByFaculty(User u);

	List<AssignmentAnswer> findByStudent(User u);

}
