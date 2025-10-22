import { Component, inject } from '@angular/core';
import { PickupService } from '../../shared/services/pickup';
import { Auth } from '../../shared/services/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pickups',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './pickup-history.html',
  styleUrls: ['./pickup-history.css'],
})
export class Pickups {
  private pickupsService = inject(PickupService);
  private authService = inject(Auth);

  pickupHistory = this.authService.isAdmin()
    ? this.pickupsService.allPickups
    : this.pickupsService.userPickups;

  completePickup(pickupId: string): void {
    const success = this.pickupsService.completePickup(pickupId);
    if (success) {
      console.log('Pickup completed successfully');
    } else {
      console.error('Failed to complete pickup');
    }
  }
}
