import { Routes } from '@angular/router';
import { Signup } from './features/auth/pages/signup/signup';
import { Login } from './features/auth/pages/login/login';
import { Notifications } from './features/notifications/notifications';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'notifications', component: Notifications },
];
