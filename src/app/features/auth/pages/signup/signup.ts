import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../../shared/components/header/header';
import { FrostedCard } from '../../../../shared/components/frosted-card/frosted-card';
import { Button } from '../../../../shared/components/button/button';
import { Card } from '../../../../shared/components/card/card';
import { Footer } from '../../../../shared/components/footer/footer';
import { CalendarCheck, ChartColumn, Bell, History, LucideAngularModule } from 'lucide-angular';
import { Auth } from '../../../../shared/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, Header, FrostedCard, Button, Card, Footer, LucideAngularModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  readonly CalendarCheck = CalendarCheck;
  readonly ChartColumn = ChartColumn;
  readonly Bell = Bell;
  readonly History = History;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: Auth, private router: Router) {}

  async onSignup() {
    // Validation
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.signup(this.email, this.password);

      if (success) {
        // Navigate to main app after successful signup
        this.router.navigate(['/pickup']);
      } else {
        this.errorMessage = 'Signup failed. Please try again.';
      }
    } catch (error) {
      console.error('Signup error:', error);
      this.errorMessage = 'An error occurred during signup. Please try again.';
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
