import { Routes } from '@angular/router';
import { Signup } from './features/auth/pages/signup/signup';
import { Login } from './features/auth/pages/login/login';
import { ReportIssuesComponent } from './features/Report_issues/report_issues';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'report-issues', component: ReportIssuesComponent },
];
