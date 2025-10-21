// shared model interfaces used across the app
export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  userType: 'user' | 'admin';
  communityId?: string;
  phone?: string;
  address?: string;
}

export type PickupType = 'paper' | 'glass' | 'organic' | 'plastic';

export interface Pickup {
  id: string;
  userId: string;
  type: PickupType;
  location: string;
  created: string; // ISO
  scheduledFor: string; // ISO
  completed: string | null;
}

export type IssueType = 'missed pickup' | 'overflowing bin' | 'illegal dumping' | 'other';

export interface Issue {
  id: string;
  userId: string;
  issueType: IssueType;
  issueMessage: string;
  date: string;
  photo?: string; // base64 or simulated path
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

export interface StatisticsReport {
  created: string;
  pickupsByType: { paper: number; glass: number; organic: number; plastic: number };
  issuesByType: { 'missed pickup': number; 'overflowing bin': number; 'illegal dumping': number; other: number };
}
