import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from './shared/services/auth';
import { Header } from './shared/components/header/header';
import { Navigation } from './shared/components/navigation/navigation';
import { Toast } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, Navigation, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private authService = inject(Auth);
  protected readonly title = signal('waste-management');

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
}
