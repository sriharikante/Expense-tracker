package com.expensetracker.controller;

import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8091") // Allow frontend requests
public class UserController {

  @Autowired
  private UserRepository userRepository;

  // 🔐 Register user
  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User user) {
    Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
    if (existingUser.isPresent()) {
      // Duplicate email
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body("Email already registered. Please login.");
    }

    // Optional: Add basic validation here (e.g., email format, password length)

    User savedUser = userRepository.save(user);
    return ResponseEntity.ok(savedUser);
  }

  // 🔓 Login user
  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody User user) {
    Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
    if (existingUser.isPresent()) {
      User u = existingUser.get();

      // ⚠️ Plaintext password comparison — consider hashing in future
      if (u.getPassword().equals(user.getPassword())) {
        return ResponseEntity.ok(u); // Successful login
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body("Incorrect password.");
      }
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body("Email not registered.");
    }
  }
}
