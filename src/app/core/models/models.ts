export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  userType: 'user' | 'admin';
  communityId?: string | null;
  phone?: string;
  address?: string;
}

export type PickupType = 'paper' | 'glass' | 'organic' | 'plastic';

export interface Pickup {
  id: string;
  userId: string;
  type: PickupType;
  location: string;
  created: string;
  scheduledFor: string;
  completed: string | null;
}

export type IssueType = 'missed pickup' | 'overflowing bin' | 'illegal dumping' | 'other';

export interface Issue {
  id: string;
  userId: string;
  issueType: IssueType;
  issueMessage: string;
  date: string;
  photo?: string;
  status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
}

export interface AppNotification {
  id: string;
  date: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  communityId?: string | null;
  read?: boolean;
}

export interface Community {
  id: string;
  name: string;
  location: string;
  created: string;
}
