import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first, map } from 'rxjs';

export const loggedInUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService).user$.pipe(
    first(),
    map((user) => {
      if (!!user) return true;
      return router.parseUrl('/login');
    })
  );
};
