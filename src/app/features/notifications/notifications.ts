import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsApi } from './services/notifications-api';
import { AuthApi } from '../../shared/services/auth-api';
import { DatabaseApi } from '../../shared/services/database-api';
import { Community } from '../../core/models/community';
import { AppNotification } from '../../core/models/app-notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  private notificationsApi = inject(NotificationsApi);
  private authApi = inject(AuthApi);
  private databaseApi = inject(DatabaseApi);

  isAdmin = this.authApi.isAdmin;
  currentUser = this.authApi.currentUser;
  notifications = this.isAdmin()
    ? this.notificationsApi.allNotifications
    : this.notificationsApi.userNotifications;

  // Form state for creating notifications
  showCreateForm = signal(false);
  communities = signal<Community[]>([]);

  // Form fields
  newNotification: Omit<AppNotification, 'id' | 'date' | 'fromUserId'> = {
    title: '',
    message: '',
    priority: 'medium',
    communityId: '',
  };

  constructor() {
    // Load communities for admin dropdown
    this.communities.set(this.databaseApi.read<Community>('ewms_communities'));
  }

  toggleCreateForm() {
    this.showCreateForm.update((value) => !value);
  }

  createNotification() {
    const user = this.currentUser();
    if (!user) return;

    if (!this.newNotification.title.trim() || !this.newNotification.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    this.notificationsApi.addNotification({
      title: this.newNotification.title,
      message: this.newNotification.message,
      priority: this.newNotification.priority,
      communityId: this.newNotification.communityId || null,
      fromUserId: user.id,
    });

    // Reset form
    this.newNotification = {
      title: '',
      message: '',
      priority: 'medium',
      communityId: '',
    };

    this.showCreateForm.set(false);
  }

  markAsCompleted(notification: any) {
    this.notificationsApi.markAsCompleted(notification);
  }
}
