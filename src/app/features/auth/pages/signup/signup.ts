import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../../shared/components/header/header';
import { FrostedCard } from '../../../../shared/components/frosted-card/frosted-card';
import { Button } from '../../../../shared/components/button/button';
import { Card } from '../../../../shared/components/card/card';
import { Footer } from '../../../../shared/components/footer/footer';
import { CalendarCheck, ChartColumn, Bell, History, LucideAngularModule } from 'lucide-angular';

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

  onSignup() {
    console.log('Signup attempt with:', this.email);
    // Add signup logic here
  }

  onLogin() {
    console.log('Navigate to login');
    // Add navigation to login page
  }
}
