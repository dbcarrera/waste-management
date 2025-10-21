import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';
import { DatabaseApi } from './database-api';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private router = inject(Router);
  private databaseService = inject(DatabaseApi);

  // The current user state
  private currentUserSignal = signal<User | null>(null);

  // Public readonly user properties
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  isAdmin = computed(() => this.currentUserSignal()?.userType === 'admin');

  private readonly AUTH_STORAGE_KEY = 'AUTH_KEY';

  constructor() {
    // Load user from localStorage on initialization
    this.loadUserFromStorage();
  }

  // TODO: REMOVE once backend is implemented, as this is fake data
  // TODO: When MongoDB is used, do not access all users on the client.
  private fetchUsers(): User[] {
    return this.databaseService.read<User>('ewms_users');
  }

  // TODO: Not needed when users are stored on backend
  private addUser(user: User) {
    this.databaseService.write<User>('ewms_users', [...this.fetchUsers(), user]);
  }

  // TODO: User auth API keys may be stored on client, however it depends on MongoDB implementation
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
        const allUsers = this.fetchUsers();

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
        if (this.fetchUsers().find((u) => u.id === email)) {
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
   * Update user data
   */
  updateUser(user: User): void {
    this.currentUserSignal.set(user);
    this.saveUserToStorage(user);
  }
}
