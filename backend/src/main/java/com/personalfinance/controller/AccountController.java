package com.personalfinance.controller;

import com.personalfinance.dto.*;
import com.personalfinance.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody AccountRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.createAccount(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> getAccount(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.getAccount(id));
    }

    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @PostMapping("/{id}/credit")
    public ResponseEntity<TransactionResponse> credit(@PathVariable Long id,
                                                       @Valid @RequestBody TransactionRequest request) {
        return ResponseEntity.ok(accountService.credit(id, request));
    }

    @PostMapping("/{id}/debit")
    public ResponseEntity<TransactionResponse> debit(@PathVariable Long id,
                                                      @Valid @RequestBody TransactionRequest request) {
        return ResponseEntity.ok(accountService.debit(id, request));
    }

    @GetMapping("/{id}/transactions")
    public ResponseEntity<List<TransactionResponse>> getTransactions(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.getTransactions(id));
    }
}
