import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav style="padding:12px; background:#f5f5f5; border-bottom:1px solid #ddd;">
      <a routerLink="/" style="margin-right:12px">Dashboard</a>
      <a routerLink="/admin/reports">Reports</a>
    </nav>
    <main style="padding:16px">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AdminShellComponent {}
