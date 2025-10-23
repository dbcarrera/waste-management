import { Component, inject } from '@angular/core';
import { FrostedCard } from '../../../../shared/components/frosted-card/frosted-card';
import { FormsModule } from '@angular/forms';
import { AuthApi } from '../../../../shared/services/auth-api';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FrostedCard],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private toastService = inject(ToastService);

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      this.toastService.error(this.errorMessage);
      return;
    }

    this.isLoading = true;

    try {
      const success = await this.authApi.login(this.email, this.password);

      if (success) {
        this.router.navigate(['/pickup']);
      } else {
        this.errorMessage = 'Incorrect email and password combination';
        this.toastService.error(this.errorMessage);
      }
    } catch (error) {
      this.errorMessage = 'An error occurred during login. Please try again.';
      this.toastService.error(this.errorMessage);
    } finally {
      this.isLoading = false;
    }
  }
}
