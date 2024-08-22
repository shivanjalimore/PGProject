package com.app.controller;

import java.io.IOException;
import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.entities.Assignment;
import com.app.entities.AssignmentAnswer;
import com.app.entities.NoticeBoard;
import com.app.entities.TimeTable;
import com.app.filehandlingutils.FacultyAssignmentUploadResponse;
import com.app.filehandlingutils.FileDownloadUtil;
import com.app.filehandlingutils.FileUploadUtils;
import com.app.mail.MailService;
import com.app.service.FacultyService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/faculty")
public class FacultyController {
     @Autowired
     private FacultyService facultyService;
     @Autowired
     private MailService mailService;
     @PostMapping("/addassignment")
     public ResponseEntity<?> uploadAssignment(@RequestParam("file") MultipartFile multipartFile, @RequestParam Long facultyId,
 			@RequestParam String description, @RequestParam String facultyName, @RequestParam String moduleName) throws IOException
     {
    	 try {
    	 Assignment assignment=new Assignment();
    	 assignment.setDescription(description);
    	 assignment.setFacultyName(facultyName);
    	 assignment.setModuleName(moduleName);
    	 String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		long size = multipartFile.getSize();
		String filecode = FileUploadUtils.saveFile(fileName, multipartFile);
    	FacultyAssignmentUploadResponse respose=new FacultyAssignmentUploadResponse();
    	respose.setFileName(fileName);
    	respose.setSize(size);
    	respose.setDownloadUri("/downloadFile/" + filecode);
    	respose.setFilecode(filecode);
    	mailService.sendSimpleEmail(facultyId);
		return new ResponseEntity<>(facultyService.addAssignment(assignment, facultyId, filecode), HttpStatus.CREATED);
    	 }catch(RuntimeException e)
    	 {
    		 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
    	 }
    	 
     }
     @GetMapping("/downloadFile/{fileCode}")
     public ResponseEntity<?> downloadFile(@PathVariable("fileCode") String fileCode)
     {
    	 FileDownloadUtil downloadUtil=new FileDownloadUtil();
 		Resource resource = null;
 		try {
 			resource = downloadUtil.getFileAsResource(fileCode);
 		} catch (IOException e) {
 			return ResponseEntity.internalServerError().build();
 		}

 		if (resource == null) {
 			return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
 		}

 		String contentType = "application/octet-stream";
 		String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

 		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
 				.header(HttpHeaders.CONTENT_DISPOSITION, headerValue).body(resource);
     }
     @GetMapping("/viewassignment/{facultyId}")
     public ResponseEntity<?> viewAssignments(@PathVariable Long facultyId)
     {
    	 try {
    		 return ResponseEntity.ok(facultyService.viewAssignments(facultyId));
    	 }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @GetMapping("/viewassignmentanswer/{facultyId}")
     public ResponseEntity<?> getAssignmentAnswers(@PathVariable Long facultyId)
     {
    	 try {
    		 return ResponseEntity.ok(facultyService.viewAssignmentAnswers(facultyId));
    	 }catch (Exception e) {
    		 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @PostMapping("/addtimetable/{facultyId}")
     public ResponseEntity<?> addTimeTable(@RequestBody @Valid TimeTable timeTable,@PathVariable Long facultyId)
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.CREATED).body(facultyService.addTimeTable(timeTable,facultyId));
    	 }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @PostMapping("/addnoticeboard/{facultyId}")
     public ResponseEntity<?> addNoticeBoard(@RequestBody @Valid NoticeBoard noticeBoard,@PathVariable Long facultyId)
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.CREATED).body(facultyService.addNoticeBoard(noticeBoard,facultyId));
    	 }catch (Exception e) {
    		 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @GetMapping("/viewtimetable/{facultyId}")
     public ResponseEntity<?> viewAllTimeTables(@PathVariable @Valid Long facultyId)
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.OK).body(facultyService.getAllTimeTables(facultyId));
    	 }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
     }
     @GetMapping("/viewnoticeboard/{facultyId}")
     public ResponseEntity<?> viewAllNoticeBoards(@PathVariable @Valid Long facultyId)
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.OK).body(facultyService.getAllNoticeBoards(facultyId));
    	 }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
     }
     @DeleteMapping("/viewnoticeboard/delete/{id}")
 	public ResponseEntity<?> deleteFacultyDetails(@PathVariable Long id) {
 		System.out.println("in del Faculty" + id);
 		try {
 			return ResponseEntity.ok(new ApiResponse(facultyService.deleteNoticeBoardById(id)));
 		} catch (RuntimeException e) {
 			System.out.println("err in del  Faculty " + e);
 			return new ResponseEntity<>(new ApiResponse("Invalid NoticeBoard ID !!!!!!!!!!!!!!!!"),
 					HttpStatus.NOT_FOUND);
 		}
 	}

 	@GetMapping("/editnoticeboard/{id}")
 	public ResponseEntity<?> getNoticeBoardByNoticeBoardId(@PathVariable Long id) {
 		NoticeBoard u = facultyService.getNoticeBoardById(id);
 		HashMap<String, Object> ht = new HashMap<String, Object>();
 		if (u == null)
 			return new ResponseEntity<>(new ApiResponse("Invalid NoticeBoard ID !!!!!!!!!!!!!!!!"),
 					HttpStatus.NOT_FOUND);
 		ht.put("status", new String("success"));
 		ht.put("data", u);
 		return ResponseEntity.ok(ht);
 	}

 	@PutMapping("/editnoticeboard/{id}")
 	public ResponseEntity<?> updateStudentDetails(@RequestBody NoticeBoard detachedNoticeBoard, @PathVariable Long id) {

 		System.out.println("in update NoticeBoard" + detachedNoticeBoard.getId());
 		try {
 			return ResponseEntity.ok(facultyService.updateNoticeBoardDetails(detachedNoticeBoard, id));
 		} catch (RuntimeException e) {
 			System.out.println("err in update  NoticeBoard " + e);
 			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
 		}
 	}

 	@DeleteMapping("/viewtimetable/delete/{id}")
 	public ResponseEntity<?> deleteTimeTableDetails(@PathVariable Long id) {
 		System.out.println("in del TimeTable" + id);
 		try {
 			return ResponseEntity.ok(new ApiResponse(facultyService.deleteTimeTableById(id)));
 		} catch (RuntimeException e) {
 			System.out.println("err in del  Timetable " + e);
 			return new ResponseEntity<>(new ApiResponse("Invalid Timetable ID !!!!!!!!!!!!!!!!"), HttpStatus.NOT_FOUND);
 		}
 	}

 	@GetMapping("/edittimetable/{id}")
 	public ResponseEntity<?> getTimeTableByTimeTableId(@PathVariable Long id) {
 		TimeTable t = facultyService.getTimeTableById(id);
 		HashMap<String, Object> ht = new HashMap<String, Object>();
 		if (t == null)
 			return new ResponseEntity<>(new ApiResponse("Invalid TimeTable ID !!!!!!!!!!!!!!!!"), HttpStatus.NOT_FOUND);
 		ht.put("status", new String("success"));
 		ht.put("data", t);
 		return ResponseEntity.ok(ht);
 	}

 	@PutMapping("/edittimetable/{id}")
 	public ResponseEntity<?> updateTimeTableDetails(@RequestBody TimeTable detachedTimeTable, @PathVariable Long id) {

 		System.out.println("in update TimeTable" + detachedTimeTable.getId());
 		try {
 			return ResponseEntity.ok(facultyService.updateTimeTableDetails(detachedTimeTable, id));
 		} catch (RuntimeException e) {
 			System.out.println("err in update  TimeTable " + e);
 			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
 		}
 	}
	@GetMapping("/editassignment/{id}")
	public ResponseEntity<?> getAssignmentByAssignmentId(@PathVariable Long id) {
		Assignment a = facultyService.getAssignmentById(id);
		HashMap<String, Object> ht = new HashMap<String, Object>();
		if (a == null)
			return new ResponseEntity<>(new ApiResponse("Invalid Assignment ID !!!!!!!!!!!!!!!!"),
					HttpStatus.NOT_FOUND);
		ht.put("status", new String("success"));
		ht.put("data", a);
		return ResponseEntity.ok(ht);
	}

	@PutMapping("/editassignment/{id}")
	public ResponseEntity<?> updateAssignmentDetails(@RequestBody Assignment detachedAssignment,
			@PathVariable Long id) {

		System.out.println("in update TimeTable" + detachedAssignment.getId());
		try {
			return ResponseEntity.ok(facultyService.updateAssignmentDetails(detachedAssignment, id));
		} catch (RuntimeException e) {
			System.out.println("err in update  Assignment " + e);
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	@PatchMapping("/viewassignmentanswer/grade/{id}")
	public ResponseEntity<?> updateGradeOfStudent(@PathVariable Long id, @RequestBody AssignmentAnswer aas) {
		System.out.println("id =" + id);
		try {
			return ResponseEntity.ok(facultyService.updateStudentGradeByAssignmentAnswerId(aas.getGrade(), id));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	@PatchMapping("/viewassignmentanswer/remark/{id}")
	public ResponseEntity<?> updateRemarkOfStudent(@PathVariable Long id, @RequestBody AssignmentAnswer aas) {
		System.out.println("id =" + id);
		try {
			return ResponseEntity.ok(facultyService.updateStudentRemarkByAssignmentAnswerId(aas.getRemark(), id));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/viewassignment/delete/{id}")
	public ResponseEntity<?> deleteAssignmentDetails(@PathVariable Long id) {
		System.out.println("in del Assignment" + id);
		try {
			return ResponseEntity.ok(new ApiResponse(facultyService.deleteAssignmentById(id)));
		} catch (RuntimeException e) {
			System.out.println("err in del  Assignment " + e);
			return new ResponseEntity<>(new ApiResponse("Invalid Assignment ID !!!!!!!!!!!!!!!!"),
					HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping("/viewstudent")
	public ResponseEntity<?> viewStudentDetails()
	{
		try {
			return ResponseEntity.status(HttpStatus.OK).body(facultyService.getAllStudentByRoleStudent());
		}
		catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.NOT_FOUND);
		}
	}

}
