package com.AILoadBroker.AILoadBrokerwebapp.controllers;

import com.AILoadBroker.AILoadBrokerwebapp.models.User;
import com.AILoadBroker.AILoadBrokerwebapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// This controller handles HTTP requests related to users.
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to fetch all users.
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Other endpoints can be added here.
}
