import { Injectable } from '@angular/core';
import { MockDbService } from './mock-db.service';
import { Community } from './models';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  constructor(private db: MockDbService) {}
  list(): Community[] { return this.db.read<Community>('cwms_communities'); }
  create(name: string, location: string) {
    const all = this.list();
    const c: Community = { id: 'c-' + Date.now(), name, location, created: new Date().toISOString() };
    all.push(c);
    this.db.write('cwms_communities', all);
    return c;
  }
}
