import { Injectable } from '@angular/core';
import { User } from '../../core/models/user';
import { Community } from '../../core/models/community';
import { Pickup } from '../../core/models/pickup';
import { Issue } from '../../core/models/issue';
import { AppNotification } from '../../core/models/app-notification';

const storageKeys = [
  'ewms_users',
  'ewms_communities',
  'ewms_pickups',
  'ewms_issues',
  'ewms_notifications',
] as const;

type StorageKey = (typeof storageKeys)[number];

@Injectable({
  providedIn: 'root',
})
export class DatabaseApi {
  constructor() {
    this.initDefaults();
  }

  private initDefaults() {
    storageKeys.forEach((key) => {
      const items = localStorage.getItem(key);

      if (JSON.parse(items || '[]').length < 1) {
        let data: any[] = [];

        switch (key) {
          case 'ewms_users':
            data = [
              // As this is temporary data, this is all we can store for the users.
              // We do not store passwords or sensitive info on the client for security reasons.
              // Passwords are to be salted and hashed and stored on the backend ONLY.
              {
                id: 'admin@gmail.com',
                userType: 'admin',
                communityId: '712b1a37-df5c-456c-865f-4654edd25684',
              },
              {
                id: 'user1@gmail.com',
                userType: 'user',
                communityId: 'f8ec3ad8-61e9-4fb8-aca8-cbd80f2a27ad',
              },
              {
                id: 'user2@gmail.com',
                userType: 'user',
                communityId: 'f8ec3ad8-61e9-4fb8-aca8-cbd80f2a27ad',
              },
            ] as User[];
            break;
          case 'ewms_communities':
            data = [
              {
                id: 'f8ec3ad8-61e9-4fb8-aca8-cbd80f2a27ad',
                name: 'Ferrous Collectors',
                created: new Date().toISOString(),
                location: 'Shah Alam, Selangor',
              },
              {
                id: '712b1a37-df5c-456c-865f-4654edd25684',
                name: 'HELP University S2 Community',
                created: new Date().toISOString(),
                location: '1, Persiaran Cakerawala, Subang Bestari, 40150 Shah Alam, Selangor',
              },
            ] as Community[];
            break;
          case 'ewms_pickups':
            data = [
              {
                id: '712b1a37-df5c-456c-865f-4654edd25684',
                userId: 'user1@gmail.com',
                type: 'plastic',
                location: '3, Jalan Jemuju Satu 16/13a, Seksyen 16, 40200 Shah Alam, Selangor',
                created: new Date().toISOString(),
                completed: null,
              },
              {
                id: '7310855e-0953-4c5f-acb6-d2de4f697712',
                userId: 'user2@gmail.com',
                type: 'glass',
                location:
                  '20, 28, Jalan Jemuju Empat 16/13d, Seksyen 16, 40200 Shah Alam, Selangor',
                created: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago,
                completed: new Date(Date.now() - 86400000).toISOString(),
              },
            ] as Pickup[];
            break;
          case 'ewms_issues':
            data = [
              {
                id: 'fa29d707-014d-409d-8a17-b39420084c18',
                userId: 'user1@gmail.com',
                issueType: 'missed pickup',
                issueMessage: 'Bin not emptied',
                date: new Date().toISOString(),
              },
            ] as Issue[];
            break;
          case 'ewms_notifications':
            data = [
              {
                id: '9bfe2dd8-e363-474f-915b-676fa052b0df',
                date: new Date().toISOString(),
                title: 'Pickup Scheduled',
                message: 'Your waste pickup has been scheduled for tomorrow',
                priority: 'high',
                communityId: '1',
                fromUserId: 'admin@gmail.com',
              },
              {
                id: '63f2918e-ecd1-4ad0-8efe-8039fe7fbe74',
                date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
                title: 'Community Update',
                message: 'New recycling guidelines have been posted',
                priority: 'medium',
                communityId: '1',
                fromUserId: 'admin@gmail.com',
              },
              {
                id: 'fa666eb6-38fa-4d86-a6c4-affb5402b4c7',
                date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
                title: 'We are up and running!',
                message: 'We have just launched our services.',
                priority: 'low',
                communityId: null,
                fromUserId: 'admin@gmail.com',
              },
            ] as AppNotification[];
            break;
        }

        localStorage.setItem(key, JSON.stringify(data));
      }
    });
  }

  read<T>(key: StorageKey): T[] {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  }

  write<T>(key: StorageKey, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
