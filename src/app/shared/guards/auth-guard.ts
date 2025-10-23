import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApi } from '../services/auth-api';

export const authGuard: CanActivateFn = () => {
  const authApi = inject(AuthApi);
  const router = inject(Router);

  if (authApi.isAuthenticated()) {
    return true;
  }

  // Redirect to signup if not authenticated
  router.navigate(['/signup']);
  return false;
};
