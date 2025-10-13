import { Component, OnInit } from '@angular/core';
import { FrostedCard } from '../../../../shared/components/frosted-card/frosted-card';
import { Button } from '../../../../shared/components/button/button';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../../shared/components/header/header';
import { Auth } from '../../../../shared/services/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FrostedCard, Button, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: Auth, private router: Router) {}

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
