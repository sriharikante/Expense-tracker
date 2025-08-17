package com.expensetracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.expensetracker.repository.UserRepository;
import com.expensetracker.model.User;
import java.util.Optional;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User register(User user) {
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
      throw new RuntimeException("User with this email already exists!");
    }
    return userRepository.save(user);
  }

  public User login(String email, String password) {
    return userRepository.findByEmail(email)
        .filter(u -> u.getPassword().equals(password))
        .orElseThrow(() -> new RuntimeException("Invalid credentials"));
  }

  public Optional<User> findByEmail(String email) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findByEmail'");
  }

  public User save(User user) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'save'");
  }
}
