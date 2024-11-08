package com.kgruza.microservice_course_management.service;

import com.kgruza.microservice_course_management.model.Course;
import com.kgruza.microservice_course_management.model.Transaction;

import java.util.List;

public interface CourseService {
    List<Course> allCourses();

    Course findCourseById(Long id);

    List<Transaction> findTransactionsOfUser(Long userId);

    List<Transaction> findTransactionsOfCourse(Long courseId);

    Transaction saveTransaction(Transaction transaction);
}
