package com.AILoadBroker.AILoadBrokerwebapp.services;

import com.AILoadBroker.AILoadBrokerwebapp.models.User;
import com.AILoadBroker.AILoadBrokerwebapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // Register a new user.
    public User register(User user) {
        // Check if a user with the same username already exists.
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            // Handle the case where a user with the same username already exists.
            // You can throw a custom exception or return null.
            throw new RuntimeException("User with username " + user.getUsername() + " already exists.");
        }

        // Save the new user to the database.
        return userRepository.save(user);
    }

    // Other CRUD operations can be added here.
}
