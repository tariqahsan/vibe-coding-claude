import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, Transaction, TransactionRequest, AccountRequest } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(request: AccountRequest): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, request);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  credit(accountId: number, request: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${accountId}/credit`, request);
  }

  debit(accountId: number, request: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/${accountId}/debit`, request);
  }

  getTransactions(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}/transactions`);
  }
}
