export interface AppNotification {
  date: Date;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  community: string | null;
  completed: Date | null;
}
