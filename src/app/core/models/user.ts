export interface User {
  id: string;
  userType: 'user' | 'admin';
  communityId: string;
}
