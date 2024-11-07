import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const checkPasswordRecoveryRequestGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const id = route.queryParams?.['id'];
  if (!id) return router.parseUrl('/login');

  return authService.checkPasswordRecoveryRequest(id).pipe(
    map(({ isAvailable }) => {
      if (!isAvailable) return router.parseUrl('/login');
      else return true;
    })
  );
};
