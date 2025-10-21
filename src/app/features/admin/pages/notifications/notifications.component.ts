import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NotificationService } from '../../../../core/models/notification.service';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, NgFor],
  template: `
  <h2>Notifications</h2>
  <div *ngFor="let n of notes" style="border:1px solid #ddd; padding:8px; margin-bottom:8px;">
    <strong>{{n.title}}</strong> <em>({{n.priority}})</em>
    <p>{{n.message}}</p>
    <small>{{n.date | date:'short'}}</small>
  </div>
  `
})
export class NotificationsComponent {
  notes: any[] = [];
  constructor(private ns: NotificationService) {
    this.notes = ns.list();
  }
}
