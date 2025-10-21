import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockDbService {
  constructor() { this.initDefaults(); }

  private initDefaults() {
    if (!localStorage.getItem('cwms_users')) {
      const users = [
        { id: 'u-admin', fullName: 'Paveeter Admin', email: 'admin@cwms.test', password: 'admin123', userType: 'admin', communityId: 'c-1' },
        { id: 'u-1', fullName: 'Alice', email: 'alice@cwms.test', password: 'password', userType: 'user', communityId: 'c-1' }
      ];
      localStorage.setItem('cwms_users', JSON.stringify(users));
    }
    if (!localStorage.getItem('cwms_communities')) {
      const comms = [{ id: 'c-1', name: 'Taman Aman', location: 'Kuala Lumpur', created: new Date().toISOString() }];
      localStorage.setItem('cwms_communities', JSON.stringify(comms));
    }
    if (!localStorage.getItem('cwms_pickups')) {
      const pickups = [
        { id: 'p-1', userId: 'u-1', type: 'plastic', location: 'Block A, Lot 12', created: new Date().toISOString(), scheduledFor: new Date().toISOString(), completed: null }
      ];
      localStorage.setItem('cwms_pickups', JSON.stringify(pickups));
    }
    if (!localStorage.getItem('cwms_issues')) {
      const issues = [
        { id: 'i-1', userId: 'u-1', issueType: 'missed pickup', issueMessage: 'Bin not emptied', date: new Date().toISOString(), status: 'NEW' }
      ];
      localStorage.setItem('cwms_issues', JSON.stringify(issues));
    }
    if (!localStorage.getItem('cwms_notifications')) {
      const notes = [
        { id: 'n-1', date: new Date().toISOString(), title: 'Pickup reminder', message: 'Reminder: general pickup tomorrow 8am', priority: 'medium', communityId: 'c-1', read: false }
      ];
      localStorage.setItem('cwms_notifications', JSON.stringify(notes));
    }
  }

  read<T>(key: string): T[] {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T[] : [];
  }

  write<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
