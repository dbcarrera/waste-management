import { Injectable } from '@angular/core';
import { Community } from '../../../core/models/community.model';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private communities: Community[] = [];

  getCommunities() {
    return this.communities;
  }

  addCommunity(community: Partial<Community>) {
    const newCommunity: Community = {
      id: crypto.randomUUID(),
      created: new Date(),
      name: community.name || '',
      location: community.location || ''
    };
    this.communities.push(newCommunity);
  }
}
