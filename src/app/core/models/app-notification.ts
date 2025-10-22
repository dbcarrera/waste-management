import { Priority } from '../../shared/types/priority';

export interface AppNotification {
  id: string;
  date: string;
  title: string;
  message: string;
  priority: Priority;
  communityId: string | null;
  fromUserId: string;
}
