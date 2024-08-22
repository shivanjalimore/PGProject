package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Assignment;
import com.app.entities.AssignmentAnswer;
import com.app.entities.NoticeBoard;
import com.app.entities.Role;
import com.app.entities.TimeTable;
import com.app.entities.User;
import com.app.repository.AssignmentAnswerRepository;
import com.app.repository.AssignmentRepository;
import com.app.repository.IUserRepository;
import com.app.repository.NoticeBoardRepository;
import com.app.repository.TimeTableRepository;

@Service
@Transactional

public class StudentServiceImpl implements StudentService {
	
	@Autowired
	private IUserRepository userRepo;
    @Autowired
    private AssignmentRepository assignRepo;
    @Autowired
    private TimeTableRepository timeRepo;
    @Autowired
    private NoticeBoardRepository noticeRepo;
    @Autowired
    private AssignmentAnswerRepository ansRepo;
	@Override
	public List<User> getAllFaculties() {
		// TODO Auto-generated method stub
		return userRepo.findByRole(Role.ROLE_FACULTY);
	}

	@Override
	public List<Assignment> getAllAssigments() {
		// TODO Auto-generated method stub
		return assignRepo.findAll();
	}

	@Override
	public List<TimeTable> getAllTimeTables() {
		// TODO Auto-generated method stub
		return timeRepo.findAll();
	}

	@Override
	public List<NoticeBoard> getAllNoticeBoards() {
		// TODO Auto-generated method stub
		return noticeRepo.findAll();
	}

	@Override
	public List<AssignmentAnswer> getAllAssignmenAnswers(Long id) {
		User u=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid student id"));
	    return ansRepo.findByStudent(u);
	}

	@Override
	public AssignmentAnswer saveAssignmentAnswerFile(Long assignId, Long studentId, String fileName) {

		User student = userRepo.findById(studentId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Student ID : Can't save file!!!!!!!"));

		Assignment assignment = assignRepo.findById(assignId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Assignment ID : Can't save file!!!!!!!"));

		User faculty = userRepo.findById(assignment.getFaculty())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID : Can't save file!!!!!!!"));

		AssignmentAnswer aa = new AssignmentAnswer();
		aa.setAssignmentId(assignment);
		aa.setStudent(student);
		aa.setFileName(fileName);
		aa.setFaculty(faculty);
		aa.setModuleName(assignment.getModuleName());
		aa.setStudentName(student.getName());
		return ansRepo.save(aa);
	}
    
}
