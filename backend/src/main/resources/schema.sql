-- Personal Finance Database Schema for MySQL

CREATE DATABASE IF NOT EXISTS personal_finance_db;
USE personal_finance_db;

CREATE TABLE IF NOT EXISTS accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(255) NOT NULL UNIQUE,
    account_holder_name VARCHAR(255) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at DATETIME NOT NULL,
    updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT NOT NULL,
    type VARCHAR(10) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    description VARCHAR(500),
    balance_after DECIMAL(15, 2) NOT NULL,
    transaction_date DATETIME NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);
