import { Component } from '@angular/core';
import { PickupService } from '../../../../core/models/pickup.service';
import { AuthService } from '../../../../core/models/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-schedule-pickup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Schedule Pickup</h2>
    <form (ngSubmit)="schedule()" #f="ngForm">
      <label>Type:
        <select [(ngModel)]="type" name="type" required>
          <option value="paper">paper</option>
          <option value="glass">glass</option>
          <option value="organic">organic</option>
          <option value="plastic">plastic</option>
        </select>
      </label>
      <label>Location: <input [(ngModel)]="location" name="location" placeholder="Pickup location" required /></label>
      <label>When: <input [(ngModel)]="scheduledFor" name="scheduledFor" type="datetime-local" required /></label>
      <button type="submit">Schedule</button>
    </form>
  `
})
export class SchedulePickupComponent {
  type: string = 'paper';
  location = '';
  scheduledFor = new Date().toISOString().slice(0,16);
  message = '';
  constructor(private pickup: PickupService, private auth: AuthService){}
  schedule() {
    const user = this.auth.getCurrentUser();
    if (!user) { this.message = 'Please login'; return; }
    this.pickup.schedule({ userId: user.id, type: this.type as any, location: this.location, scheduledFor: new Date(this.scheduledFor).toISOString() });
    alert('Scheduled');
  }
}
