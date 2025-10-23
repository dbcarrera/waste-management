import { effect, inject, Injectable, signal, computed } from '@angular/core';
import { AppNotification } from '../../../core/models/app-notification';
import { DatabaseApi } from '../../../shared/services/database-api';
import { AuthApi } from '../../../shared/services/auth-api';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApi {
  private notifications = signal<AppNotification[]>([]);
  private databaseApi = inject(DatabaseApi);
  private authApi = inject(AuthApi);

  // Public readonly signals
  allNotifications = this.notifications.asReadonly();
  userNotifications = computed(() => {
    const user = this.authApi.currentUser();

    if (!user) return [];

    // See notifications in their community or global
    return this.allNotifications().filter(
      (notif) => notif.communityId === null || notif.communityId === user.communityId
    );
  });

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
    return this.databaseApi.read<AppNotification>('ewms_notifications');
  }

  private saveNotifications() {
    this.databaseApi.write<AppNotification>('ewms_notifications', this.notifications());
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

  addNotification(notification: Omit<AppNotification, 'id' | 'date'>) {
    this.notifications.update((notifications) => [
      {
        ...notification,
        id: uuidv4(),
        date: new Date().toISOString(),
      },
      ...notifications,
    ]);
  }
}
