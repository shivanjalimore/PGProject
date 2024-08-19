package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;
public interface FacultyRepository extends JpaRepository<User, Long> {
     
}
