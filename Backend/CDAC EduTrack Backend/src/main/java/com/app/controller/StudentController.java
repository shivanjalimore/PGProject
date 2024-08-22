package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.filehandlingutils.FileDownloadUtil;
import com.app.filehandlingutils.FileUploadResponse;
import com.app.filehandlingutils.FileUploadUtils;
import com.app.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
     @Autowired
     private StudentService studService;
     @GetMapping("/faculty")
     public ResponseEntity<?> getAllFaculty()
     {
    	 try {
    	 return ResponseEntity.status(HttpStatus.OK).body(studService.getAllFaculties());
    	 }
    	 catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @GetMapping("/assignment")
     public ResponseEntity<?> getAllAssignments()
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.OK).body(studService.getAllAssigments());
    	 }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @GetMapping("/timetable")
     public ResponseEntity<?> getAllTimeTables()
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.OK).body(studService.getAllTimeTables());
    	 }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @GetMapping("/noticeboard")
     public ResponseEntity<?> getAllNoticeBoards()
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.OK).body(studService.getAllNoticeBoards());
    	 }catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
     @GetMapping("/result/{id}")
     public ResponseEntity<?> getAllAssignmentsWithId(@PathVariable Long id)
     {
    	 try {
    		 return ResponseEntity.status(HttpStatus.OK).body(studService.getAllAssignmenAnswers(id));
    	 }catch (Exception e) {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
     }
 	@GetMapping("/downloadFile/{fileCode}")
 	public ResponseEntity<?> downloadFile(@PathVariable("fileCode") String fileCode) throws IOException {
 		FileDownloadUtil downloadUtil = new FileDownloadUtil();

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
 	
 	@PostMapping("/uploadAssignment/{assignId}")
	public ResponseEntity<FileUploadResponse> uploadAssignmentAnswer(@PathVariable Long assignId,
			@RequestParam Long studentId, @RequestParam("file") MultipartFile multipartFile) throws IOException {
		try {
			String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
			long size = multipartFile.getSize();
			String filecode = FileUploadUtils.saveFile(fileName, multipartFile);
			FileUploadResponse response = new FileUploadResponse();
			response.setFileName(fileName);
			response.setSize(size);
			response.setDownloadUri("/downloadFile/" + filecode);
			studService.saveAssignmentAnswerFile(assignId, studentId, filecode);
			response.setAssignmentId(assignId);
			response.setStudentId(studentId);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (RuntimeException e) {
			throw new RuntimeException("Something went wrong");
		}
	}
}
