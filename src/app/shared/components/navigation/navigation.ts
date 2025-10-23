import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthApi } from '../../services/auth-api';
import {
  LucideAngularModule,
  Calendar,
  History,
  Bell,
  LayoutDashboard,
  LogOut,
  CircleAlert,
  CircleUser,
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
  private authApi = inject(AuthApi);

  // Icons
  Calendar = Calendar;
  History = History;
  CircleAlert = CircleAlert;
  Bell = Bell;
  LayoutDashboard = LayoutDashboard;
  LogOut = LogOut;
  CircleUser = CircleUser;

  navItems: NavItem[] = [
    { label: 'Pickup', route: '/pickup', icon: Calendar },
    { label: 'History', route: '/pickup-history', icon: History },
    { label: 'Issues', route: '/report-issues', icon: CircleAlert },
    { label: 'Notifications', route: '/notifications', icon: Bell },
    { label: 'Account', route: '/account', icon: CircleUser },
  ];

  visibleNavItems = computed(() => {
    const isAdmin = this.authApi.isAdmin();
    return this.navItems.filter((item) => !item.adminOnly || isAdmin);
  });
}
