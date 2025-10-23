import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DatabaseApi } from './database-api';
import { AuthApi } from './auth-api';
import { Community } from '../../core/models/community';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CommunityApi {
  // Signal to track all communities
  private communities = signal<Community[]>([]);
  private databaseApi = inject(DatabaseApi);
  private authApi = inject(AuthApi);

  // Public readonly signals
  allCommunities = this.communities.asReadonly();
  userCommunities = computed(() =>
    this.communities().find(
      (community) => community.id === (this.authApi.currentUser()?.communityId ?? '')
    )
  );

  constructor() {
    let initialRun = true;

    this.communities.set(this.fetchCommunities());

    effect(() => {
      // Add as effect dependency.
      this.communities();

      if (!initialRun) {
        this.saveCommunities();
      }

      initialRun = false;
    });
  }

  // TODO: Fetch from real API
  private fetchCommunities(): Community[] {
    return this.databaseApi.read<Community>('ewms_communities');
  }

  private saveCommunities() {
    this.databaseApi.write<Community>('ewms_communities', this.communities());
  }

  /**
   * Create a new community
   */
  createCommunity(name: string, location: string): boolean {
    try {
      const newCommunity: Community = {
        id: uuidv4(),
        name: name,
        created: new Date().toISOString(),
        location: location,
      };

      const currentCommunities = this.communities();
      const updatedCommunities = [...currentCommunities, newCommunity];

      this.communities.set(updatedCommunities);

      return true;
    } catch (error) {
      console.error('Error creating community:', error);
      return false;
    }
  }
}
