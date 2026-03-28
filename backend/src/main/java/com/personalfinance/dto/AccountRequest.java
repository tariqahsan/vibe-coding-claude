package com.personalfinance.dto;

import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class AccountRequest {

    @NotBlank(message = "Account holder name is required")
    private String accountHolderName;

    private BigDecimal initialBalance;

    public String getAccountHolderName() { return accountHolderName; }
    public void setAccountHolderName(String accountHolderName) { this.accountHolderName = accountHolderName; }

    public BigDecimal getInitialBalance() { return initialBalance; }
    public void setInitialBalance(BigDecimal initialBalance) { this.initialBalance = initialBalance; }
}
