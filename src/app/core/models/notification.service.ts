import { Injectable } from '@angular/core';
import { MockDbService } from './mock-db.service';
import { AppNotification } from './models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private db: MockDbService) {}
  list() { return this.db.read<AppNotification>('cwms_notifications'); }
  push(note: Partial<AppNotification>) {
    const all = this.list();
    const n: AppNotification = {
      id: 'n-' + Date.now(),
      date: new Date().toISOString(),
      title: note.title || 'Notification',
      message: note.message || '',
      priority: note.priority || 'low',
      communityId: note.communityId || null,
      read: false
    };
    all.push(n);
    this.db.write('cwms_notifications', all);
    return n;
  }
}
