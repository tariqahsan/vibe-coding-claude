import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { AccountDetails } from './components/account-details/account-details';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'account/:id', component: AccountDetails }
];
