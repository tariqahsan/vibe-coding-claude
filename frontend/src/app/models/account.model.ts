export interface Account {
  id: number;
  accountNumber: string;
  accountHolderName: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  balanceAfter: number;
  transactionDate: string;
}

export interface TransactionRequest {
  amount: number;
  description: string;
}

export interface AccountRequest {
  accountHolderName: string;
  initialBalance: number;
}
