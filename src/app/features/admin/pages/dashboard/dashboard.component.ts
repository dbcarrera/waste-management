import { Component } from '@angular/core';
import { AuthService } from '../../../../core/models/auth.service';
@Component({
  selector: 'app-dashboard',
  template: `
  <h1>Dashboard</h1>
  <p>Welcome {{ user?.fullName || 'Guest' }}</p>
  <div>
    <h3>Quick actions</h3>
    <button routerLink="/schedule">Schedule a pickup</button>
    <button routerLink="/report">Report an issue</button>
    <button routerLink="/history">View pickup history</button>
  </div>
  `
})
export class DashboardComponent {
  user: any = null;
  constructor(private auth: AuthService){
    this.user = this.auth.getCurrentUser();
  }
}
