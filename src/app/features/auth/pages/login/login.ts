import { Component, inject } from '@angular/core';
import { FrostedCard } from '../../../../shared/components/frosted-card/frosted-card';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../../shared/components/header/header';
import { Auth } from '../../../../shared/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FrostedCard],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const success = await this.authService.login(this.email, this.password);

      if (success) {
        this.router.navigate(['/pickup']);
      } else {
        this.errorMessage = 'Incorrect email and password combination';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred during login. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
