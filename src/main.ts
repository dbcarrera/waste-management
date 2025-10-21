// Zone.js is required by default by Angular's change detection runtime
import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AdminShellComponent } from './app/features/admin/admin-shell.component';

const routes = [
  { path: '', loadComponent: () => import('./app/features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'admin/reports', loadComponent: () => import('./app/features/admin/pages/reports/reports.component').then(m => m.ReportsComponent) }
];

bootstrapApplication(AdminShellComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch((err: any) => console.error(err));


function showErrorOverlay(message: string, stack?: string) {
  try {
    let overlay = document.getElementById('runtime-error-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'runtime-error-overlay';
      overlay.style.position = 'fixed';
      overlay.style.left = '12px';
      overlay.style.right = '12px';
      overlay.style.bottom = '12px';
      overlay.style.padding = '12px';
      overlay.style.background = 'rgba(200,40,40,0.95)';
      overlay.style.color = 'white';
      overlay.style.zIndex = '999999';
      overlay.style.borderRadius = '6px';
      overlay.style.fontFamily = 'system-ui, sans-serif';
      overlay.style.whiteSpace = 'pre-wrap';
      document.body.appendChild(overlay);
    }
    overlay.textContent = message + (stack ? '\n\n' + stack : '');
  } catch (e) {
    console.error('Could not show error overlay', e);
  }
}

window.addEventListener('error', (ev) => {
  showErrorOverlay('Uncaught error: ' + (ev.message || ev.error?.message || ev.toString()), ev.error?.stack);
});
window.addEventListener('unhandledrejection', (ev) => {
  const r = (ev as any).reason;
  showErrorOverlay('Unhandled promise rejection: ' + (r?.message || String(r)), r?.stack || '');
});

