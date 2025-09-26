export interface User {
  id: string;
  email: string;
  userType: 'user' | 'admin';
  communityId: string;
}
