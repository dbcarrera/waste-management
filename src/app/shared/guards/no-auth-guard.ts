import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApi } from '../services/auth-api';

export const noAuthGuard: CanActivateFn = () => {
  const authApi = inject(AuthApi);
  const router = inject(Router);

  if (!authApi.isAuthenticated()) {
    return true;
  }

  // Redirect to default authenticated page if not authenticated
  router.navigate(['/pickup']);
  return false;
};
