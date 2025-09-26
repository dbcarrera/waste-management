export interface AppNotification {
  date: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  communityId: string | null;
  completed: string | null;
}
