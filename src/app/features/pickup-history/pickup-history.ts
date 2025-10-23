import { Component, inject, computed, signal } from '@angular/core';
import { PickupApi } from '../../shared/services/pickup-api';
import { AuthApi } from '../../shared/services/auth-api';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../shared/services/toast';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pickups',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './pickup-history.html',
  styleUrls: ['./pickup-history.css'],
})
export class Pickups {
  private pickupApi = inject(PickupApi);
  private authApi = inject(AuthApi);
  private toastService = inject(ToastService);

  startDate = signal<string>('');
  endDate = signal<string>('');

  pickupHistory = computed(() => {
    const pickups = this.authApi.isAdmin()
      ? this.pickupApi.allPickups()
      : this.pickupApi.userPickups();
    return this.pickupApi.filterPickupsByCustomDateRange(pickups, this.startDate(), this.endDate());
  });

  updateStartDate(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.startDate.set(value);
  }

  updateEndDate(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.endDate.set(value);
  }

  clearFilters(): void {
    this.startDate.set('');
    this.endDate.set('');
  }

  completePickup(pickupId: string): void {
    const success = this.pickupApi.completePickup(pickupId);
    if (success) {
      this.toastService.success('Pickup completed successfully');
    } else {
      this.toastService.error('Failed to complete pickup');
    }
  }
}
