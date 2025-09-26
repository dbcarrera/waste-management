export interface AppNotification {
  date: Date;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  communityId: string | null;
  completed: Date | null;
}
