package com.personalfinance.service;

import com.personalfinance.dto.*;
import com.personalfinance.model.Account;
import com.personalfinance.model.Transaction;
import com.personalfinance.model.TransactionType;
import com.personalfinance.repository.AccountRepository;
import com.personalfinance.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public AccountService(AccountRepository accountRepository, TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public AccountResponse createAccount(AccountRequest request) {
        Account account = new Account();
        account.setAccountNumber(UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        account.setAccountHolderName(request.getAccountHolderName());
        account.setBalance(request.getInitialBalance() != null ? request.getInitialBalance() : BigDecimal.ZERO);
        return new AccountResponse(accountRepository.save(account));
    }

    public AccountResponse getAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
        return new AccountResponse(account);
    }

    public List<AccountResponse> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(AccountResponse::new)
                .toList();
    }

    @Transactional
    public TransactionResponse credit(Long accountId, TransactionRequest request) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));

        account.setBalance(account.getBalance().add(request.getAmount()));
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setType(TransactionType.CREDIT);
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setBalanceAfter(account.getBalance());

        return new TransactionResponse(transactionRepository.save(transaction));
    }

    @Transactional
    public TransactionResponse debit(Long accountId, TransactionRequest request) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));

        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient balance. Current balance: " + account.getBalance());
        }

        account.setBalance(account.getBalance().subtract(request.getAmount()));
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setType(TransactionType.DEBIT);
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setBalanceAfter(account.getBalance());

        return new TransactionResponse(transactionRepository.save(transaction));
    }

    public List<TransactionResponse> getTransactions(Long accountId) {
        accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));
        return transactionRepository.findByAccountIdOrderByTransactionDateDesc(accountId).stream()
                .map(TransactionResponse::new)
                .toList();
    }
}
