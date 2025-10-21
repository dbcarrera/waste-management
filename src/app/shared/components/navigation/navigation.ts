import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';
import {
  LucideAngularModule,
  Calendar,
  History,
  Bell,
  LayoutDashboard,
  LogOut,
  CircleAlert,
  LucideIconData,
} from 'lucide-angular';

interface NavItem {
  label: string;
  route: string;
  icon: LucideIconData;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private authService = inject(Auth);

  // Icons
  Calendar = Calendar;
  History = History;
  CircleAlert = CircleAlert;
  Bell = Bell;
  LayoutDashboard = LayoutDashboard;
  LogOut = LogOut;

  navItems: NavItem[] = [
    { label: 'Pickup', route: '/pickup', icon: Calendar },
    { label: 'History', route: '/pickup-history', icon: History },
    { label: 'Issues', route: '/report-issues', icon: CircleAlert },
    { label: 'Notifications', route: '/notifications', icon: Bell },
    { label: 'Admin', route: '/admin', icon: LayoutDashboard, adminOnly: true },
  ];

  visibleNavItems = computed(() => {
    const isAdmin = this.authService.isAdmin();
    return this.navItems.filter((item) => !item.adminOnly || isAdmin);
  });
}
