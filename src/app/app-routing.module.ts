
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Use dynamic `loadComponent` for standalone components to avoid static import issues
const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/reports',
    loadComponent: () => import('./features/admin/pages/reports/reports.component').then(m => m.ReportsComponent)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
