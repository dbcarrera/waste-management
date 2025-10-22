import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from './services/notifications.service';
import { Auth } from '../../shared/services/auth';
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
  private notificationsService = inject(NotificationsService);
  private authService = inject(Auth);
  private databaseService = inject(DatabaseApi);

  isAdmin = this.authService.isAdmin;
  currentUser = this.authService.currentUser;
  notifications = this.isAdmin()
    ? this.notificationsService.allNotifications
    : this.notificationsService.userNotifications;

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
    this.communities.set(this.databaseService.read<Community>('ewms_communities'));
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

    this.notificationsService.addNotification({
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
    this.notificationsService.markAsCompleted(notification);
  }
}
