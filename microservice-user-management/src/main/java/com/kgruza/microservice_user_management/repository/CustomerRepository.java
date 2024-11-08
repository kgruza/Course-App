package com.kgruza.microservice_user_management.repository;

import com.kgruza.microservice_user_management.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUsername(String username);

    @Query("select c.name from Customer c where c.id in (:pIdList)")
    List<String> findByIdList(@Param("pIdList") List<Long> idList);
}
