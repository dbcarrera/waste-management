import { Component, inject } from '@angular/core';
import { PickupService } from '../../shared/services/pickup';
import { Auth } from '../../shared/services/auth';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../shared/services/toast';

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
  private toastService = inject(ToastService);

  pickupHistory = this.authService.isAdmin()
    ? this.pickupsService.allPickups
    : this.pickupsService.userPickups;

  completePickup(pickupId: string): void {
    const success = this.pickupsService.completePickup(pickupId);
    if (success) {
      this.toastService.success('Pickup completed successfully');
    } else {
      this.toastService.error('Failed to complete pickup');
    }
  }
}
