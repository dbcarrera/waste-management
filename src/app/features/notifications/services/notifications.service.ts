import { effect, Injectable, signal } from '@angular/core';
import { AppNotification } from '../../../core/models/app-notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notifications = signal<AppNotification[]>([]);

  // TODO: Fetch notifications from API
  private fetchNotifications(): AppNotification[] {
    return [
      {
        date: new Date().toISOString(),
        title: 'Pickup Scheduled',
        message: 'Your waste pickup has been scheduled for tomorrow',
        priority: 'high',
        communityId: '1',
        completed: null,
      },
      {
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        title: 'Community Update',
        message: 'New recycling guidelines have been posted',
        priority: 'medium',
        communityId: '1',
        completed: null,
      },
      {
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        title: 'We are up and running!',
        message: 'We have just launched our services.',
        priority: 'low',
        communityId: null,
        completed: null,
      },
    ];
  }

  constructor() {
    this.notifications.set(this.fetchNotifications());

    effect(() => {
      // TODO: Whenever notifications are updated, update database.
      console.log(`UPDATE NOTIFICATIONS WITH THESE VALUES: ${this.notifications}`);
    });
  }

  getNotifications() {
    return this.notifications;
  }

  markAsCompleted(notificationToUpdate: AppNotification) {
    this.notifications.update((notifications) =>
      notifications.map((notification) =>
        notification === notificationToUpdate
          ? { ...notification, completed: new Date().toISOString() }
          : notification
      )
    );
  }

  addNotification(notification: Omit<AppNotification, 'date'>) {
    this.notifications.update((notifications) => [
      {
        ...notification,
        date: new Date().toISOString(),
      },
      ...notifications,
    ]);
  }
}
