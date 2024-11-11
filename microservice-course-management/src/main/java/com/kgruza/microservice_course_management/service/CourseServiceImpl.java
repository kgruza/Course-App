package com.kgruza.microservice_course_management.service;

import com.kgruza.microservice_course_management.exceptions.CourseAlreadyEnrolledException;
import com.kgruza.microservice_course_management.model.Course;
import com.kgruza.microservice_course_management.model.Transaction;
import com.kgruza.microservice_course_management.repository.CourseRepository;
import com.kgruza.microservice_course_management.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<Course> allCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course findCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public List<Transaction> findTransactionsOfUser(Long userId) {
        return transactionRepository.findAllByUserId(userId);
    }

    @Override
    public List<Transaction> findTransactionsOfCourse(Long courseId) {
        return transactionRepository.findAllByCourseId(courseId);
    }

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        List<Transaction> transactions = findTransactionsOfUser(transaction.getUserId());
        if (transactions.stream().anyMatch(t -> t.getCourse().getId().equals(transaction.getCourse().getId())))
            throw new CourseAlreadyEnrolledException("This course was already enrolled.");
        return transactionRepository.save(transaction);
    }


}
