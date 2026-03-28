import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { AccountService } from '../../services/account';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    CurrencyPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  accounts: Account[] = [];
  showCreateForm = false;
  newAccountName = '';
  newAccountBalance = 0;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => this.accounts = accounts,
      error: (err) => this.snackBar.open('Failed to load accounts', 'Close', { duration: 3000 })
    });
  }

  createAccount() {
    if (!this.newAccountName.trim()) return;
    this.accountService.createAccount({
      accountHolderName: this.newAccountName,
      initialBalance: this.newAccountBalance
    }).subscribe({
      next: () => {
        this.snackBar.open('Account created successfully', 'Close', { duration: 3000 });
        this.showCreateForm = false;
        this.newAccountName = '';
        this.newAccountBalance = 0;
        this.loadAccounts();
      },
      error: (err) => this.snackBar.open('Failed to create account', 'Close', { duration: 3000 })
    });
  }

  viewAccount(id: number) {
    this.router.navigate(['/account', id]);
  }
}
