import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationsService } from './services/notifications.service';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [DatePipe, Button],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  private notificationsService = inject(NotificationsService);
  protected notifications = this.notificationsService.getNotifications();

  markAsCompleted(notification: any) {
    this.notificationsService.markAsCompleted(notification);
  }
}
