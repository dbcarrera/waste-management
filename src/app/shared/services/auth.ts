import { Injectable, signal, computed } from '@angular/core';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // The current user state
  private currentUserSignal = signal<User | null>(null);

  // Public readonly user properties
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  isAdmin = computed(() => this.currentUserSignal()?.userType === 'admin');

  private readonly AUTH_STORAGE_KEY = 'waste_management_user';
  private readonly USERS_STORAGE_KEY = 'waste_management_users';

  constructor(private router: Router) {
    // Load user from localStorage on initialization
    this.loadUserFromStorage();
  }

  // TODO: REMOVE once backend is implemented, as this is fake data
  private initializeUsers(): User[] {
    const parsedUsers = JSON.parse(localStorage.getItem(this.USERS_STORAGE_KEY) || '[]') as User[];
    if (parsedUsers.length > 0) {
      // Already have users
      return parsedUsers;
    }

    const users: User[] = [
      { id: 'admin@gmail.com', userType: 'admin', communityId: 'community-1' },
      { id: 'user1@gmail.com', userType: 'user', communityId: 'community-1' },
      { id: 'user3@gmail.com', userType: 'user', communityId: 'community-2' },
    ];
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));

    return users;
  }

  private addUser(user: User) {
    const users = JSON.parse(localStorage.getItem(this.USERS_STORAGE_KEY) || '[]') as User[];
    users.push(user);
    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
  }

  // TODO: Update/remove once backend is implemented
  /**
   * Load user data from localStorage
   */
  private loadUserFromStorage(): void {
    try {
      const storedUser = localStorage.getItem(this.AUTH_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        this.currentUserSignal.set(user);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      localStorage.removeItem(this.AUTH_STORAGE_KEY);
    }
  }

  // TODO: Update/remove once backend is implemented
  /**
   * Save user data to localStorage
   */
  private saveUserToStorage(user: User): void {
    try {
      localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  /**
   * Login user
   * @param email User email
   * @param password User password
   * @returns Promise<boolean> indicating success
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      // TODO: Replace with actual API

      if (email && password) {
        const allUsers = this.initializeUsers();

        // TODO: For now, ID is email. In real app, email/password will only be on the backend for security reasons.
        const foundUser = allUsers.find((u) => u.id === email);
        if (!foundUser) {
          return false; // User not found
        }

        this.currentUserSignal.set(foundUser);
        this.saveUserToStorage(foundUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  /**
   * Sign up new user
   * @param email User email
   * @param password User password
   * @param communityId Optional community ID
   * @returns Promise<boolean> indicating success
   */
  async signup(email: string, password: string, communityId?: string): Promise<boolean> {
    try {
      // TODO: Replace with actual API
      if (email && password) {
        if (this.initializeUsers().find((u) => u.id === email)) {
          return false; // User already exists
        }

        const user: User = {
          id: email,
          userType: 'user',
          communityId: communityId || 'no-community',
        };

        this.currentUserSignal.set(user);
        this.saveUserToStorage(user);
        this.addUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(this.AUTH_STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Get current user data
   */
  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  /**
   * Update user data
   */
  updateUser(user: User): void {
    this.currentUserSignal.set(user);
    this.saveUserToStorage(user);
  }
}
