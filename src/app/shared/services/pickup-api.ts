import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Pickup } from '../../core/models/pickup';
import { DatabaseApi } from './database-api';
import { v4 as uuidv4 } from 'uuid';
import { AuthApi } from './auth-api';

@Injectable({
  providedIn: 'root',
})
export class PickupApi {
  // Signal to track all pickups
  private pickups = signal<Pickup[]>([]);
  private databaseApi = inject(DatabaseApi);
  private authApi = inject(AuthApi);

  // Public readonly signals
  allPickups = this.pickups.asReadonly();
  userPickups = computed(() =>
    this.pickups().filter((pickup) => pickup.userId === (this.authApi.currentUser()?.id ?? ''))
  );

  /**
   * Filter pickups by custom date range
   */
  filterPickupsByCustomDateRange(pickups: Pickup[], startDate: string, endDate: string): Pickup[] {
    let filtered = pickups;

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter((pickup) => new Date(pickup.created) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((pickup) => new Date(pickup.created) <= end);
    }

    return filtered;
  }

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
    return this.databaseApi.read<Pickup>('ewms_pickups');
  }

  private savePickups() {
    this.databaseApi.write<Pickup>('ewms_pickups', this.pickups());
  }

  /**
   * Create a new pickup
   */
  createPickup(
    userId: string,
    type: Pickup['type'],
    location: string,
    targetDate: string
  ): boolean {
    try {
      const newPickup: Pickup = {
        id: uuidv4(),
        userId: userId,
        type: type,
        location: location,
        created: new Date().toISOString(),
        completed: null,
        targetDate: targetDate,
      };

      const currentPickups = this.pickups();
      const updatedPickups = [...currentPickups, newPickup];

      this.pickups.set(updatedPickups);

      return true;
    } catch (error) {
      console.error('Error creating pickup:', error);
      return false;
    }
  }

  /**
   * Mark a pickup as completed
   */
  completePickup(pickupId: string): boolean {
    try {
      const currentPickups = this.pickups();
      const updatedPickups = currentPickups.map((pickup) => {
        if (pickup.id === pickupId) {
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
