import { Injectable } from '@angular/core';
import { MockDbService } from './mock-db.service';
import { User } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentKey = 'cwms_current_user';
  constructor(private db: MockDbService) {}

  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.db.read<User>('cwms_users');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid credentials' };
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    return { success: true, message: 'Logged in' };
  }

  logout() { localStorage.removeItem(this.currentKey); }

  register(newUser: Partial<User>): { success: boolean; message: string } {
    const users = this.db.read<User>('cwms_users');
    if (users.some(u => u.email === newUser.email)) return { success: false, message: 'Email already registered' };
    const user: User = {
      id: 'u-' + Date.now(),
      userType: 'user',
      fullName: newUser.fullName || 'No name',
      email: newUser.email!,
      password: newUser.password || 'password',
      communityId: newUser.communityId || null,
      phone: newUser.phone,
      address: newUser.address
    };
    users.push(user);
    this.db.write('cwms_users', users);
    return { success: true, message: 'Registered' };
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.currentKey);
    return raw ? JSON.parse(raw) as User : null;
  }
}
