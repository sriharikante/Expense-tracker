package com.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findByUser(User user);
}
