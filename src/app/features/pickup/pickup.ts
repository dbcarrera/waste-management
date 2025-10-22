import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PickupService } from '../../shared/services/pickup';
import { Auth } from '../../shared/services/auth';
import { CommonModule } from '@angular/common';
import {
  Trash2,
  MapPin,
  Recycle,
  Package,
  Wine,
  LeafyGreen,
  LucideAngularModule,
} from 'lucide-angular';

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
  private pickupService = inject(PickupService);
  private router = inject(Router);
  private authService = inject(Auth);

  wasteType: 'paper' | 'glass' | 'organic' | 'plastic' = 'plastic';
  location: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  async onCreatePickup() {
    // Validation
    if (!this.location.trim()) {
      this.errorMessage = 'Please enter a pickup location';
      this.successMessage = '';
      return;
    }

    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.errorMessage = 'You must be logged in to create a pickup';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const success = this.pickupService.createPickup(
        currentUser.id,
        this.wasteType,
        this.location
      );

      if (success) {
        this.successMessage = `Pickup request created successfully! We'll collect your ${this.wasteType} waste from ${this.location}.`;
        // Reset form
        this.location = '';
        this.wasteType = 'plastic';
      } else {
        this.errorMessage = 'Failed to create pickup request. Please try again.';
      }
    } catch (error) {
      console.error('Pickup creation error:', error);
      this.errorMessage = 'An error occurred while creating the pickup request.';
    } finally {
      this.isLoading = false;
    }
  }

  onViewHistory() {
    this.router.navigate(['/pickup-history']);
  }
}
