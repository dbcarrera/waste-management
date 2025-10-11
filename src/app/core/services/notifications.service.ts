import { Injectable, signal } from '@angular/core';
import { AppNotification } from '../models/app-notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notifications = signal<AppNotification[]>([]);

  // Simulated notifications for now - in a real app, this would fetch from an API
  private mockNotifications: AppNotification[] = [
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
  ];

  constructor() {
    // Initialize with mock data
    this.notifications.set(this.mockNotifications);
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
