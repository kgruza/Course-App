package com.kgruza.microservice_course_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class CourseAlreadyEnrolledException extends RuntimeException {

    public CourseAlreadyEnrolledException(String message) {
        super(message);
    }
}
