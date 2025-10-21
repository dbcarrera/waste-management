import { effect, inject, Injectable, signal } from '@angular/core';
import { AppNotification } from '../../../core/models/app-notification';
import { DatabaseApi } from '../../../shared/services/database-api';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notifications = signal<AppNotification[]>([]);
  private databaseService = inject(DatabaseApi);

  // Public readonly signals
  allNotifications = this.notifications.asReadonly();

  constructor() {
    let initialRun = true;
    this.notifications.set(this.fetchNotifications());

    // Save notifications on changes
    effect(() => {
      // Add as effect dependency.
      this.notifications();

      if (!initialRun) {
        this.saveNotifications();
      }

      initialRun = false;
    });
  }

  // TODO: Fetch notifications from real API
  private fetchNotifications(): AppNotification[] {
    return this.databaseService.read<AppNotification>('ewms_notifications');
  }

  private saveNotifications() {
    this.databaseService.write<AppNotification>('ewms_notifications', this.notifications());
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
