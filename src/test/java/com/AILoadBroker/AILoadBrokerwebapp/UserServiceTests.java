package com.AILoadBroker.AILoadBrokerwebapp;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.AILoadBroker.AILoadBrokerwebapp.models.User;
import com.AILoadBroker.AILoadBrokerwebapp.services.UserService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class UserServiceTests {

    @Autowired
    private UserService userService;

    @Test
    public void testRegisterUser() {
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("testPassword");

        User registeredUser = userService.register(user);

        assertNotNull(registeredUser);
        assertEquals("testUser", registeredUser.getUsername());
    }

    // ... Add more tests as needed
}
