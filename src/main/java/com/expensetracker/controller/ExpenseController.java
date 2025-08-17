package com.expensetracker.controller;

import org.springframework.web.bind.annotation.*;
import com.expensetracker.service.ExpenseService;
import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
  private final ExpenseService expenseService;

  public ExpenseController(ExpenseService expenseService) {
    this.expenseService = expenseService;
  }

  @PostMapping("/add")
  public Expense add(@RequestBody Expense expense) {
    return expenseService.addExpense(expense);
  }

  @GetMapping("/{userId}")
  public List<Expense> get(@PathVariable Long userId) {
    User u = new User();
    u.setId(userId);
    return expenseService.getExpenses(u);
  }

  @PutMapping("/update")
  public Expense update(@RequestBody Expense expense) {
    return expenseService.updateExpense(expense);
  }

  @DeleteMapping("/delete/{id}")
  public void delete(@PathVariable Long id) {
    expenseService.deleteExpense(id);
  }
}
