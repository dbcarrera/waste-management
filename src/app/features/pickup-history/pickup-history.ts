import { Component, inject } from '@angular/core';
import { PickupApi } from '../../shared/services/pickup-api';
import { AuthApi } from '../../shared/services/auth-api';
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
  private pickupApi = inject(PickupApi);
  private authApi = inject(AuthApi);
  private toastService = inject(ToastService);

  pickupHistory = this.authApi.isAdmin() ? this.pickupApi.allPickups : this.pickupApi.userPickups;

  completePickup(pickupId: string): void {
    const success = this.pickupApi.completePickup(pickupId);
    if (success) {
      this.toastService.success('Pickup completed successfully');
    } else {
      this.toastService.error('Failed to complete pickup');
    }
  }
}
