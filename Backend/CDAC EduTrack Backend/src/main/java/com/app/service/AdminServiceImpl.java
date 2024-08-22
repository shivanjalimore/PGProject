package com.app.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.IUserRepository;

@Service
public class AdminServiceImpl implements IAdminService {

	@Autowired
	IUserRepository userRepo;

	

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createAdmin() {
        // Check if admin already exists
        if (userRepo.existsByEmail("1")) {
            throw new RuntimeException("Admin already exists");
        }

        // Create admin user
        User admin = new User();
        admin.setId(Long.valueOf("1"));
        admin.setEmail("admin@gmail.com");
        admin.setAddress("pune");
        admin.setDob(LocalDate.parse("2024-02-02")); 
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setMobNo("8007592194");
        admin.setRole(Role.valueOf("ROLE_ADMIN"));
        admin.setName("admin");

        // Save admin to database
        userRepo.save(admin);
    }
	
	
	
	@Override
	public User addFaculty(User u) {
		u.setRole(Role.ROLE_FACULTY);
		return userRepo.save(u);
	}

	@Override
	public User addStudent(User u) {
		u.setRole(Role.ROLE_STUDENT);
		return userRepo.save(u);
	}

	@Override
	public User getFacultyById(Long id) {
		// TODO Auto-generated method stub
		return userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("faculty doesnt exist"));
	}

	@Override
	public User editFacultyDetails(User detachedUser, Long id) {
	    User u=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("faculty doesnt exist"));
		u.setAddress(detachedUser.getAddress());
		u.setDob(detachedUser.getDob());
		u.setMobNo(detachedUser.getMobNo());
		u.setName(detachedUser.getName());
		return userRepo.save(u);
	}

	@Override
	public List<User> getAllStudents() {
		return userRepo.findByRole(Role.ROLE_STUDENT);
	}

	@Override
	public String deleteStudentDetails(Long id) {
	    User u=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("student doesnt exist"));
	    userRepo.delete(u);
	    return "Deleted student successfully";
	}

	@Override
	public String deleteFacultyDetails(Long id) {
	    User u=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("faculty doesnt exist"));
	    userRepo.delete(u);
	    return "Deleted faculty successfully";
	}

	@Override
	public List<User> getAllFaculties() {
		return userRepo.findByRole(Role.ROLE_FACULTY);
	}

	@Override
	public User getStudentById(Long id) {
		return userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("student doesnt exist"));
	}

	@Override
	public User editStudentDetails(User detachedUser, Long id) {
		User u=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("student doesnt exist"));
		u.setAddress(detachedUser.getAddress());
		u.setDob(detachedUser.getDob());
		u.setMobNo(detachedUser.getMobNo());
		u.setName(detachedUser.getName());
		return userRepo.save(u);
	}
   
}