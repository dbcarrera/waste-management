import { Injectable } from '@angular/core';
import { MockDbService } from './mock-db.service';
import { Pickup } from './models';

@Injectable({ providedIn: 'root' })
export class PickupService {
  constructor(private db: MockDbService) {}
  listAll(): Pickup[] { return this.db.read<Pickup>('cwms_pickups'); }
  listForUser(userId: string) { return this.listAll().filter(p => p.userId === userId); }
  schedule(p: Partial<Pickup>) {
    const all = this.listAll();
    const pickup: Pickup = {
      id: 'p-' + Date.now(),
      userId: p.userId!,
      type: p.type as any,
      location: p.location || 'Unknown',
      created: new Date().toISOString(),
      scheduledFor: p.scheduledFor || new Date().toISOString(),
      completed: null
    };
    all.push(pickup);
    this.db.write('cwms_pickups', all);
    return pickup;
  }
}
