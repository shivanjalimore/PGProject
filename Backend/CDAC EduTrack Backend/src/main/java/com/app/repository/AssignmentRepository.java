package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Assignment;
import com.app.entities.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

	List<Assignment> findByFaculty(User u);

}
