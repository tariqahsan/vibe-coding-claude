package com.personalfinance.dto;

import com.personalfinance.model.Transaction;
import com.personalfinance.model.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionResponse {

    private Long id;
    private TransactionType type;
    private BigDecimal amount;
    private String description;
    private BigDecimal balanceAfter;
    private LocalDateTime transactionDate;

    public TransactionResponse(Transaction transaction) {
        this.id = transaction.getId();
        this.type = transaction.getType();
        this.amount = transaction.getAmount();
        this.description = transaction.getDescription();
        this.balanceAfter = transaction.getBalanceAfter();
        this.transactionDate = transaction.getTransactionDate();
    }

    public Long getId() { return id; }
    public TransactionType getType() { return type; }
    public BigDecimal getAmount() { return amount; }
    public String getDescription() { return description; }
    public BigDecimal getBalanceAfter() { return balanceAfter; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
}
