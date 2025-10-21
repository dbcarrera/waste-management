export interface AppNotification {
  id: string;
  date: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  communityId: string | null;
  fromUserId: string;
}
