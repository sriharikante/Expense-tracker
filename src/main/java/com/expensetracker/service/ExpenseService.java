package com.expensetracker.service;

import org.springframework.stereotype.Service;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import java.util.List;

@Service
public class ExpenseService {
  private final ExpenseRepository expenseRepository;

  public ExpenseService(ExpenseRepository expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  public Expense addExpense(Expense expense) {
    return expenseRepository.save(expense);
  }

  public List<Expense> getExpenses(User user) {
    return expenseRepository.findByUser(user);
  }

  public void deleteExpense(Long id) {
    expenseRepository.deleteById(id);
  }

  public Expense updateExpense(Expense expense) {
    return expenseRepository.save(expense);
  }
}
