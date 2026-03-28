import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AccountService } from '../../services/account';
import { Account, Transaction } from '../../models/account.model';
import { TransactionForm } from '../transaction-form/transaction-form';

@Component({
  selector: 'app-account-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule,
    CurrencyPipe,
    DatePipe,
    TransactionForm
  ],
  templateUrl: './account-details.html',
  styleUrl: './account-details.css',
})
export class AccountDetails implements OnInit {
  account: Account | null = null;
  transactions: Transaction[] = [];
  displayedColumns = ['date', 'type', 'description', 'amount', 'balance'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAccount(id);
    this.loadTransactions(id);
  }

  loadAccount(id: number) {
    this.accountService.getAccount(id).subscribe({
      next: (account) => this.account = account,
      error: () => {
        this.snackBar.open('Account not found', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

  loadTransactions(id: number) {
    this.accountService.getTransactions(id).subscribe({
      next: (transactions) => this.transactions = transactions,
      error: () => this.snackBar.open('Failed to load transactions', 'Close', { duration: 3000 })
    });
  }

  onTransactionComplete() {
    if (this.account) {
      this.loadAccount(this.account.id);
      this.loadTransactions(this.account.id);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
