import { Injectable, signal } from '@angular/core';
import { Pickup } from '../../../core/models/pickup';

@Injectable({
  providedIn: 'root',
})
export class PickupService {
  private readonly PICKUPS_STORAGE_KEY = 'waste_management_pickups';

  // Signal to track all pickups
  private pickupsSignal = signal<Pickup[]>([]);

  // Public readonly access to pickups
  pickups = this.pickupsSignal.asReadonly();

  constructor() {
    // Load pickups from localStorage on initialization
    this.loadPickupsFromStorage();
  }

  // TODO: REMOVE once backend is implemented, as this is fake data
  private initializePickups(): Pickup[] {
    const parsedPickups = JSON.parse(
      localStorage.getItem(this.PICKUPS_STORAGE_KEY) || '[]'
    ) as Pickup[];
    if (parsedPickups.length > 0) {
      // Already have pickups
      return parsedPickups;
    }

    const mockPickups: Pickup[] = [
      {
        userId: 'user1@gmail.com',
        type: 'plastic',
        location: '123 Main St, Apt 4B',
        created: new Date('2024-10-01T10:30:00').toISOString(),
        completed: new Date('2024-10-02T14:20:00').toISOString(),
      },
      {
        userId: 'user1@gmail.com',
        type: 'paper',
        location: '123 Main St, Apt 4B',
        created: new Date('2024-10-05T09:15:00').toISOString(),
        completed: new Date('2024-10-06T11:45:00').toISOString(),
      },
      {
        userId: 'admin@gmail.com',
        type: 'glass',
        location: '456 Oak Ave',
        created: new Date('2024-10-08T14:00:00').toISOString(),
        completed: null,
      },
      {
        userId: 'user3@gmail.com',
        type: 'organic',
        location: '789 Pine Rd',
        created: new Date('2024-10-10T08:30:00').toISOString(),
        completed: null,
      },
    ];

    localStorage.setItem(this.PICKUPS_STORAGE_KEY, JSON.stringify(mockPickups));
    return mockPickups;
  }

  /**
   * Load pickups from localStorage
   */
  private loadPickupsFromStorage(): void {
    try {
      const pickups = this.initializePickups();
      this.pickupsSignal.set(pickups);
    } catch (error) {
      console.error('Error loading pickups from storage:', error);
      this.pickupsSignal.set([]);
    }
  }

  /**
   * Save pickups to localStorage
   */
  private savePickupsToStorage(pickups: Pickup[]): void {
    try {
      localStorage.setItem(this.PICKUPS_STORAGE_KEY, JSON.stringify(pickups));
    } catch (error) {
      console.error('Error saving pickups to storage:', error);
    }
  }

  /**
   * Create a new pickup
   */
  createPickup(userId: string, type: Pickup['type'], location: string): boolean {
    try {
      const newPickup: Pickup = {
        userId,
        type,
        location,
        created: new Date().toISOString(),
        completed: null,
      };

      const currentPickups = this.pickupsSignal();
      const updatedPickups = [...currentPickups, newPickup];

      this.pickupsSignal.set(updatedPickups);
      this.savePickupsToStorage(updatedPickups);

      return true;
    } catch (error) {
      console.error('Error creating pickup:', error);
      return false;
    }
  }

  /**
   * Get all pickups
   */
  getAllPickups(): Pickup[] {
    return this.pickupsSignal();
  }

  /**
   * Get pickups for a specific user
   */
  getPickupsByUserId(userId: string): Pickup[] {
    return this.pickupsSignal().filter((pickup) => pickup.userId === userId);
  }

  /**
   * Get pending (not completed) pickups
   */
  getPendingPickups(userId?: string): Pickup[] {
    const allPickups = this.pickupsSignal();
    const pendingPickups = allPickups.filter((pickup) => pickup.completed === null);

    if (userId) {
      return pendingPickups.filter((pickup) => pickup.userId === userId);
    }

    return pendingPickups;
  }

  /**
   * Get completed pickups
   */
  getCompletedPickups(userId?: string): Pickup[] {
    const allPickups = this.pickupsSignal();
    const completedPickups = allPickups.filter((pickup) => pickup.completed !== null);

    if (userId) {
      return completedPickups.filter((pickup) => pickup.userId === userId);
    }

    return completedPickups;
  }

  /**
   * Mark a pickup as completed
   */
  completePickup(pickupToComplete: Pickup): boolean {
    try {
      const currentPickups = this.pickupsSignal();
      const updatedPickups = currentPickups.map((pickup) => {
        if (
          pickup.userId === pickupToComplete.userId &&
          pickup.created === pickupToComplete.created &&
          pickup.type === pickupToComplete.type
        ) {
          return { ...pickup, completed: new Date().toISOString() };
        }
        return pickup;
      });

      this.pickupsSignal.set(updatedPickups);
      this.savePickupsToStorage(updatedPickups);

      return true;
    } catch (error) {
      console.error('Error completing pickup:', error);
      return false;
    }
  }
}
