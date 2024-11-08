package com.kgruza.microservice_user_management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "customer")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String username;
    private String password;

    @Enumerated(value = EnumType.STRING)
    private Role role;
}
