import { Routes } from '@angular/router';
import { Signup } from './features/auth/pages/signup/signup';
import { Login } from './features/auth/pages/login/login';
import { Notifications } from './features/notifications/notifications';
import { ReportIssuesComponent } from './features/Report_issues/report_issues';
import { Pickup } from './features/pickup/pickup';
import { authGuard } from './shared/guards/auth-guard';
import { noAuthGuard } from './shared/guards/no-auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: Signup, canActivate: [noAuthGuard] },
  { path: 'login', component: Login, canActivate: [noAuthGuard] },
  {
    path: 'notifications',
    component: Notifications,
    canActivate: [authGuard],
  },
  {
    path: 'report-issues',
    component: ReportIssuesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pickup',
    component: Pickup,
    canActivate: [authGuard],
  },
];
