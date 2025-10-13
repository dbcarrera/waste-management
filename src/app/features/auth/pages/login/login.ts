import { Component } from '@angular/core';
import { FrostedCard } from '../../../../shared/components/frosted-card/frosted-card';
import { Button } from '../../../../shared/components/button/button';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FrostedCard, Button, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';

  onLogin() {
    console.log('Login attempt with:', this.email);
    // TOOD: Add login logic here
  }
}
