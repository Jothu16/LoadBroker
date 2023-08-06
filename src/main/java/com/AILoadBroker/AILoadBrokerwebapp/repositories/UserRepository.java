package com.AILoadBroker.AILoadBrokerwebapp.repositories;

import com.AILoadBroker.AILoadBrokerwebapp.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

// This interface provides CRUD operations for the User model.
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
