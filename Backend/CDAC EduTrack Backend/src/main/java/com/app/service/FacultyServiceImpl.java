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
public class FacultyServiceImpl implements FacultyService {
    @Autowired
    private IUserRepository userRepo;
    @Autowired
    private AssignmentRepository assignRepo;
    @Autowired
    private AssignmentAnswerRepository assignAnsRepo;
    @Autowired
    private TimeTableRepository timetableRepo;
    @Autowired
    private NoticeBoardRepository noticeBoardRepo;
	@Override
	public Assignment addAssignment(Assignment assignment, Long facultyId, String filecode) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		assignment.setFaculty(u);
		assignment.setFileName(filecode);
		return assignRepo.save(assignment);
	}
	@Override
	public List<Assignment> viewAssignments(Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		return assignRepo.findByFaculty(u);
	}
	@Override
	public List<AssignmentAnswer> viewAssignmentAnswers(Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		return assignAnsRepo.findByFaculty(u);
	}
	@Override
	public TimeTable addTimeTable(TimeTable timetable, Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		timetable.setFaculty(u);
		return timetableRepo.save(timetable);
	}
	@Override
	public NoticeBoard addNoticeBoard(NoticeBoard noticeBoard, Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		noticeBoard.setFaculty(u);
		return noticeBoardRepo.save(noticeBoard);
	}
	@Override
	public List<TimeTable> getAllTimeTables(Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		return timetableRepo.findByFaculty(u);
	}
	@Override
	public List<NoticeBoard> getAllNoticeBoards(Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		return noticeBoardRepo.findByFaculty(u);
	}
	@Override
	public List<User> getAllStudentByRoleStudent() {
		return userRepo.findByRole(Role.ROLE_STUDENT);
	}
	@Override
	public String deleteNoticeBoardById(Long id) {
		NoticeBoard notice = noticeBoardRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid NoticeBoard ID !!!!!!!"));
		noticeBoardRepo.delete(notice);

		return "Noticeboard Deleted Succesfully ";
	}

	@Override
	public NoticeBoard getNoticeBoardById(Long id) {
		NoticeBoard notice = noticeBoardRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid NoticeBoard ID !!!!!!!"));
		return notice;
	}

	@Override
	public NoticeBoard updateNoticeBoardDetails(NoticeBoard detachedNoticeBoard, Long id) {
		NoticeBoard notice = noticeBoardRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid NoticeBoard ID !!!!!!!"));
		notice.setModuleName(detachedNoticeBoard.getModuleName());
		notice.setDate(detachedNoticeBoard.getDate());
		notice.setDescription(detachedNoticeBoard.getDescription());
		noticeBoardRepo.save(notice);
		return notice;
	}

	@Override
	public String deleteTimeTableById(Long id) {

		TimeTable timetable = timetableRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid TimeTable ID !!!!!!!"));
		timetableRepo.delete(timetable);
		return "TimeTable Deleted Succesfully ";
	}

	@Override
	public TimeTable getTimeTableById(Long id) {
		TimeTable timetable = timetableRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid TimeTable ID !!!!!!!"));
		return timetable;
	}

	@Override
	public TimeTable updateTimeTableDetails(TimeTable detachedTimeTable, Long id) {

		TimeTable timetable = timetableRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid TimeTable ID !!!!!!!"));

		timetable.setModuleName(detachedTimeTable.getModuleName());
		timetable.setDate(detachedTimeTable.getDate());
		timetable.setStartTime(detachedTimeTable.getStartTime());
		timetable.setEndTime(detachedTimeTable.getEndTime());
		timetable.setPlatform(detachedTimeTable.getPlatform());
		timetable.setLink(detachedTimeTable.getLink());
		timetableRepo.save(timetable);
		return timetable;

	}
	@Override
	public Assignment getAssignmentById(Long id) {

		Assignment assignment = assignRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Assignment ID !!!!!!!"));
		return assignment;
	}

	@Override
	public Assignment updateAssignmentDetails(Assignment detachedAssignment, Long id) {
		Assignment assignment = assignRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Assignment ID !!!!!!!"));
		assignment.setDescription(detachedAssignment.getDescription());
		assignment.setModuleName(detachedAssignment.getModuleName());
		assignRepo.save(assignment);
		return assignment;
	}

	@Override
	public AssignmentAnswer updateStudentGradeByAssignmentAnswerId(String grade, Long id) {
		AssignmentAnswer aa = assignAnsRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid AssignmentAnswer  ID !!!!!!!"));
		aa.setGrade(grade);
		assignAnsRepo.save(aa);
		return aa;
	}

	@Override
	public AssignmentAnswer updateStudentRemarkByAssignmentAnswerId(String remark, Long id) {
		AssignmentAnswer aa = assignAnsRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid AssignmentAnswer  ID !!!!!!!"));
		aa.setRemark(remark);
		assignAnsRepo.save(aa);
		return aa;
	}

	@Override
	public String deleteAssignmentById(Long id) {

		Assignment assignment = assignRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Assignment ID !!!!!!!"));
		assignRepo.delete(assignment);

		return "Assignment Deleted Succesfully ";
	}
}
	
