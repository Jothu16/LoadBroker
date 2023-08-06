package com.AILoadBroker.AILoadBrokerwebapp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// This annotation indicates that the User class will be stored in MongoDB as a document.
@Document(collection = "users")
public class User {

    // The primary key for the User document in MongoDB.
    @Id
    private String id;
    private String username;
    private String password; // Consider using encryption for security.
    private String email;

    // Constructors, getters, setters, etc. can be added here.
}
