package com.kgruza.microservice_user_management.service;

import com.kgruza.microservice_user_management.model.Customer;

import java.util.List;

public interface CustomerService {
    Customer    save(Customer customer);

    Customer findByUsername(String username);

    List<String> findCustomers(List<Long> idList);
}
