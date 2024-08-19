package com.app.service;

import java.util.List;

import com.app.entities.Assignment;
import com.app.entities.AssignmentAnswer;
import com.app.entities.NoticeBoard;
import com.app.entities.Role;
import com.app.entities.TimeTable;
import com.app.entities.User;

public interface FacultyService {

	 public Assignment addAssignment(Assignment assignment, Long facultyId, String filecode);

	public List<Assignment> viewAssignments(Long facultyId);

	public List<AssignmentAnswer> viewAssignmentAnswers(Long facultyId);

	public TimeTable addTimeTable(TimeTable timetable, Long facultyId);

	public NoticeBoard addNoticeBoard(NoticeBoard noticeBoard, Long facultyId);

	public List<TimeTable> getAllTimeTables( Long facultyId);

	public List<NoticeBoard> getAllNoticeBoards(Long facultyId);

	public String deleteNoticeBoardById(Long id);

	public NoticeBoard getNoticeBoardById(Long id);

	public NoticeBoard updateNoticeBoardDetails(NoticeBoard detachedNoticeBoard, Long id);

	public String deleteTimeTableById(Long id);

	public TimeTable getTimeTableById(Long id);

	public TimeTable updateTimeTableDetails(TimeTable detachedTimeTable, Long id);

	List<User> getAllStudentByRoleStudent();

	Assignment getAssignmentById(Long id);

	Assignment updateAssignmentDetails(Assignment detachedAssignment, Long id);

	AssignmentAnswer updateStudentGradeByAssignmentAnswerId(String grade, Long id);

	AssignmentAnswer updateStudentRemarkByAssignmentAnswerId(String remark, Long id);

	String deleteAssignmentById(Long id);


}
