package com.app.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.entities.User;
import com.app.service.IAdminService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	IAdminService adminService;

	@Autowired
	private PasswordEncoder passwordEncode;

	

    @PostMapping("/createadmin")
    public ResponseEntity<String> createAdmin() {
        adminService.createAdmin();
        return new ResponseEntity<>("Admin created successfully", HttpStatus.CREATED);
    }
	
	
	
	@PostMapping("/addfaculty")
	public ResponseEntity<?> addFaculty(@RequestBody User u) {

		u.setPassword(passwordEncode.encode(u.getPassword()));
		try {
			return new ResponseEntity<>(adminService.addFaculty(u), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("err in add Faculty " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);// => invalid data from
		}
		
	}
	@PostMapping("/addstudent")
	public ResponseEntity<?> addStudent(@RequestBody User u)
	{
		u.setPassword(passwordEncode.encode(u.getPassword()));
		try {
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addStudent(u));
		}
		catch (Exception e) {
		    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping("/editfaculty/{id}")
	public ResponseEntity<?> getFacultyById(@PathVariable Long id)
	{
		User u=adminService.getFacultyById(id);
		HashMap<String,Object> ht=new HashMap<>();
		if(u==null)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("faculty not found"));
		}
		ht.put("data", u);
		return ResponseEntity.ok(ht);
	}
	@PutMapping("/editfaculty/{id}")
	public ResponseEntity<?> editFacultyDetails(@RequestBody User u,@PathVariable Long id)
	{
		try {
		return ResponseEntity.status(HttpStatus.OK).body(adminService.editFacultyDetails(u,id));
		}
		catch (Exception e) {
		    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping("/editstudent/{id}")
	public ResponseEntity<?> getStudentById(@PathVariable Long id)
	{
		User u=adminService.getStudentById(id);
		HashMap<String,Object> ht=new HashMap<>();
		if(u==null)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("faculty not found"));
		}
		ht.put("data", u);
		return ResponseEntity.ok(ht);
	}
	@PutMapping("/editstudent/{id}")
	public ResponseEntity<?> editStudentDetails(@RequestBody User u,@PathVariable Long id)
	{
		try {
		return ResponseEntity.status(HttpStatus.OK).body(adminService.editStudentDetails(u,id));
		}
		catch (Exception e) {
		    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping("/viewstudent")
		public ResponseEntity<?> getAllStudents()
		{
			try {
				return ResponseEntity.status(HttpStatus.OK).body(adminService.getAllStudents());
			}
			catch (Exception e) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
			}
		}
	@GetMapping("/viewfaculty")
	public ResponseEntity<?> getAllFaculties()
	{
		try {
			return ResponseEntity.status(HttpStatus.OK).body(adminService.getAllFaculties());
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	@DeleteMapping("/viewstudent/delete/{id}")
	public ResponseEntity<?> deleteStudent(@PathVariable Long id)
	{
		try {
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(adminService.deleteStudentDetails(id)));
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	@DeleteMapping("/viewfaculty/delete/{id}")
	public ResponseEntity<?> deleteFaculty(@PathVariable Long id)
	{
		try {
			return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(adminService.deleteFacultyDetails(id)));
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
