import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PickupService } from '../../../../core/models/pickup.service';
import { AuthService } from '../../../../core/models/auth.service';

@Component({
  selector: 'app-pickup-history',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  template: `
    <h2>Pickup History</h2>
    <div *ngIf="!user">Please login to see your history.</div>
    <table *ngIf="user" border="1" cellpadding="6">
      <thead><tr><th>ID</th><th>Type</th><th>When</th><th>Scheduled</th></tr></thead>
      <tbody>
        <tr *ngFor="let p of pickups">
          <td>{{p.id}}</td>
          <td>{{p.type}}</td>
          <td>{{p.created | date:'medium'}}</td>
          <td>{{p.scheduledFor | date:'short'}}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class PickupHistoryComponent {
  user: any = null;
  pickups: any[] = [];
  constructor(private pickup: PickupService, private auth: AuthService) {
    this.user = this.auth.getCurrentUser();
    if (this.user) this.pickups = this.pickup.listForUser(this.user.id);
  }
}
