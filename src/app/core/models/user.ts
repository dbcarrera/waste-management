export interface User {
  id: string;
  name: string;
  pictureUrl: string;
  userType: 'user' | 'admin';
  communityId: string;
}
