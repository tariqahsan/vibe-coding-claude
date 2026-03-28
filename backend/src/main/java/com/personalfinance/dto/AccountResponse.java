package com.personalfinance.dto;

import com.personalfinance.model.Account;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AccountResponse {

    private Long id;
    private String accountNumber;
    private String accountHolderName;
    private BigDecimal balance;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AccountResponse(Account account) {
        this.id = account.getId();
        this.accountNumber = account.getAccountNumber();
        this.accountHolderName = account.getAccountHolderName();
        this.balance = account.getBalance();
        this.createdAt = account.getCreatedAt();
        this.updatedAt = account.getUpdatedAt();
    }

    public Long getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolderName() { return accountHolderName; }
    public BigDecimal getBalance() { return balance; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
