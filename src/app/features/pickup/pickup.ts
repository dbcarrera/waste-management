import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PickupApi } from '../../shared/services/pickup-api';
import { AuthApi } from '../../shared/services/auth-api';
import { CommonModule } from '@angular/common';
import {
  Trash2,
  MapPin,
  Recycle,
  Package,
  Wine,
  LeafyGreen,
  Calendar,
  LucideAngularModule,
} from 'lucide-angular';
import { ToastService } from '../../shared/services/toast';

@Component({
  selector: 'app-pickup',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './pickup.html',
  styleUrl: './pickup.css',
})
export class Pickup {
  readonly Trash2 = Trash2;
  readonly MapPin = MapPin;
  readonly Recycle = Recycle;
  readonly Package = Package;
  readonly Wine = Wine;
  readonly LeafyGreen = LeafyGreen;
  readonly CalendarIcon = Calendar;
  private pickupApi = inject(PickupApi);
  private router = inject(Router);
  private authApi = inject(AuthApi);
  private toastService = inject(ToastService);

  wasteType: 'paper' | 'glass' | 'organic' | 'plastic' = 'plastic';
  location: string = '';
  targetDate: string = '';
  isLoading: boolean = false;

  async onCreatePickup() {
    // Validation
    if (!this.location.trim()) {
      this.toastService.error('Please enter a pickup location');
      return;
    }

    const currentUser = this.authApi.currentUser();
    if (!currentUser) {
      this.toastService.error('You must be logged in to create a pickup');
      return;
    }

    this.isLoading = true;

    try {
      const success = this.pickupApi.createPickup(
        currentUser.id,
        this.wasteType,
        this.location,
        this.targetDate
      );

      if (success) {
        this.toastService.success(
          `Pickup request created successfully! We'll collect your ${this.wasteType} waste from ${this.location}.`
        );
        // Reset form
        this.location = '';
        this.targetDate = '';
        this.wasteType = 'plastic';
      } else {
        this.toastService.error('Failed to create pickup request. Please try again.');
      }
    } catch (error) {
      this.toastService.error('An error occurred while creating the pickup request.');
    } finally {
      this.isLoading = false;
    }
  }

  onViewHistory() {
    this.router.navigate(['/pickup-history']);
  }
}
