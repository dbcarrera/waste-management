import { Routes } from '@angular/router';
import { Signup } from './features/auth/pages/signup/signup';
import { Login } from './features/auth/pages/login/login';
import { Notifications } from './features/notifications/notifications';
import { ReportIssues } from './features/report-issue/report-issues';
import { Pickup } from './features/pickup/pickup';
import { Pickups } from './features/pickup-history/pickup-history';
import { authGuard } from './shared/guards/auth-guard';
import { noAuthGuard } from './shared/guards/no-auth-guard';
import { Account } from './features/account/account';

export const routes: Routes = [
  { path: '', redirectTo: 'pickup', pathMatch: 'full' },
  { path: 'signup', component: Signup, canActivate: [noAuthGuard] },
  { path: 'login', component: Login, canActivate: [noAuthGuard] },
  {
    path: 'notifications',
    component: Notifications,
    canActivate: [authGuard],
  },
  {
    path: 'report-issues',
    component: ReportIssues,
    canActivate: [authGuard],
  },
  {
    path: 'pickup',
    component: Pickup,
    canActivate: [authGuard],
  },
  {
    path: 'pickup-history',
    component: Pickups,
    canActivate: [authGuard],
  },
  {
    path: 'account',
    component: Account,
    canActivate: [authGuard],
  },
];
