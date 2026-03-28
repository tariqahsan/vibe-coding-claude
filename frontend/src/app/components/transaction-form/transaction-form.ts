import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account';

@Component({
  selector: 'app-transaction-form',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSnackBarModule
  ],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm {
  @Input() accountId!: number;
  @Output() transactionComplete = new EventEmitter<void>();

  transactionType: 'CREDIT' | 'DEBIT' = 'CREDIT';
  amount: number | null = null;
  description = '';

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  submitTransaction() {
    if (!this.amount || this.amount <= 0) {
      this.snackBar.open('Please enter a valid amount', 'Close', { duration: 3000 });
      return;
    }

    const request = { amount: this.amount, description: this.description };
    const action = this.transactionType === 'CREDIT'
      ? this.accountService.credit(this.accountId, request)
      : this.accountService.debit(this.accountId, request);

    action.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.transactionType} of $${this.amount?.toFixed(2)} successful`,
          'Close',
          { duration: 3000 }
        );
        this.amount = null;
        this.description = '';
        this.transactionComplete.emit();
      },
      error: (err) => {
        const message = err.error?.error || 'Transaction failed';
        this.snackBar.open(message, 'Close', { duration: 5000 });
      }
    });
  }
}
