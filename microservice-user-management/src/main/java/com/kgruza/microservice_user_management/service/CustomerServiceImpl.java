package com.kgruza.microservice_user_management.service;

import com.kgruza.microservice_user_management.model.Customer;
import com.kgruza.microservice_user_management.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Customer save(Customer customer){
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }

    @Override
    public Customer findByUsername(String username){
        return customerRepository.findByUsername(username).orElse(null);
    }

    @Override
    public List<String> findCustomers(List<Long> idList){
        return customerRepository.findByIdList(idList);
    }
}
