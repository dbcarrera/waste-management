export interface Pickup {
  userId: string;
  type: 'paper' | 'glass' | 'organic' | 'plastic';
  location: string;
  created: string;
  completed: string | null;
}
