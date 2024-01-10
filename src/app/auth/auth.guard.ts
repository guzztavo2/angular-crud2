import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(authService);
  alert('a');
  if (authService.isLoggedIn || authService.getUser() !== false) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};
