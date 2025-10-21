import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  private notificationsService = inject(NotificationsService);
  protected notifications = this.notificationsService.allNotifications();

  markAsCompleted(notification: any) {
    this.notificationsService.markAsCompleted(notification);
  }
}
