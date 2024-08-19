package com.app.service;


import java.util.List;

import com.app.entities.User;

public interface IAdminService {

	public User addFaculty(User s);

	public User addStudent(User u);

	public User getFacultyById(Long id);

	public User editFacultyDetails(User u, Long id);

	public List<User> getAllStudents();

	public List<User> getAllFaculties();

	public String deleteStudentDetails(Long id);

	public User getStudentById(Long id);
	
	public User editStudentDetails(User u, Long id);

	public String deleteFacultyDetails(Long id);
	void createAdmin();
}
