package com.AILoadBroker.AILoadBrokerwebapp.services;

import com.AILoadBroker.AILoadBrokerwebapp.models.User;
import com.AILoadBroker.AILoadBrokerwebapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// This service class provides business logic related to users.
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Fetch all users from the database.
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch a user by their username.
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Other CRUD operations can be added here.
}
