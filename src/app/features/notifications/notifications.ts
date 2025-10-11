import { Component, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { NotificationsService } from '../../core/services/notifications.service';
import { Card } from '../../shared/components/card/card';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [DatePipe, NgClass, Card, Button],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  private notificationsService = inject(NotificationsService);
  protected notifications = this.notificationsService.getNotifications();

  getPriorityClass(priority: 'low' | 'medium' | 'high'): string {
    return {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high',
    }[priority];
  }

  markAsCompleted(notification: any) {
    this.notificationsService.markAsCompleted(notification);
  }
}
