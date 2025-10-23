import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrostedCard } from '../../../../shared/components/frosted-card/frosted-card';
import { Card } from '../../../../shared/components/card/card';
import { Footer } from '../../../../shared/components/footer/footer';
import { CalendarCheck, ChartColumn, Bell, History, LucideAngularModule } from 'lucide-angular';
import { Auth } from '../../../../shared/services/auth';
import { Router } from '@angular/router';
import { CommunityApi } from '../../../../shared/services/community-api';
import { ToastService } from '../../../../shared/services/toast';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, FrostedCard, Card, Footer, LucideAngularModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private authService = inject(Auth);
  private router = inject(Router);
  private communityService = inject(CommunityApi);
  private toastService = inject(ToastService);

  readonly CalendarCheck = CalendarCheck;
  readonly ChartColumn = ChartColumn;
  readonly Bell = Bell;
  readonly History = History;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  selectedCommunityId: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  // Communities for dropdown
  communities = this.communityService.allCommunities;

  async onSignup() {
    // Validation
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      this.toastService.error(this.errorMessage);
      return;
    }

    if (!this.selectedCommunityId) {
      this.errorMessage = 'Please select a community';
      this.toastService.error(this.errorMessage);
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.toastService.error(this.errorMessage);
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      this.toastService.error(this.errorMessage);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.signup(
        this.email,
        this.password,
        this.selectedCommunityId
      );

      if (success) {
        // Navigate to main app after successful signup
        this.router.navigate(['/pickup']);
      } else {
        this.errorMessage = 'Signup failed. Please try again.';
        this.toastService.error(this.errorMessage);
      }
    } catch (error) {
      console.error('Signup error:', error);
      this.errorMessage = 'An error occurred during signup. Please try again.';
      this.toastService.error(this.errorMessage);
    } finally {
      this.isLoading = false;
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
