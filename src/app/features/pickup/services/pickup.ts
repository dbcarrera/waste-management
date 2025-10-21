import { effect, inject, Injectable, signal } from '@angular/core';
import { Pickup } from '../../../core/models/pickup';
import { DatabaseApi } from '../../../shared/services/database-api';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class PickupService {
  // Signal to track all pickups
  private pickups = signal<Pickup[]>([]);
  private databaseService = inject(DatabaseApi);

  // Public readonly signals
  allPickups = this.pickups.asReadonly();

  constructor() {
    let initialRun = true;

    this.pickups.set(this.fetchPickups());

    effect(() => {
      // Add as effect dependency.
      this.pickups();

      if (!initialRun) {
        this.savePickups();
      }

      initialRun = false;
    });
  }

  // TODO: Fetch from real API
  private fetchPickups(): Pickup[] {
    return this.databaseService.read<Pickup>('ewms_pickups');
  }

  private savePickups() {
    this.databaseService.write<Pickup>('ewms_pickups', this.pickups());
  }

  /**
   * Create a new pickup
   */
  createPickup(userId: string, type: Pickup['type'], location: string): boolean {
    try {
      const newPickup: Pickup = {
        id: uuidv4(),
        userId: userId,
        type: type,
        location: location,
        created: new Date().toISOString(),
        completed: null,
      };

      const currentPickups = this.pickups();
      const updatedPickups = [...currentPickups, newPickup];

      console.log('Creating pickup:', updatedPickups);

      this.pickups.set(updatedPickups);

      return true;
    } catch (error) {
      console.error('Error creating pickup:', error);
      return false;
    }
  }

  /**
   * Get pickups for a specific user
   */
  getPickupsByUserId(userId: string): Pickup[] {
    return this.pickups().filter((pickup) => pickup.userId === userId);
  }

  /**
   * Get pending (not completed) pickups
   */
  getPendingPickups(userId?: string): Pickup[] {
    const allPickups = this.pickups();
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
    const allPickups = this.pickups();
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
      const currentPickups = this.pickups();
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

      this.pickups.set(updatedPickups);

      return true;
    } catch (error) {
      console.error('Error completing pickup:', error);
      return false;
    }
  }
}
