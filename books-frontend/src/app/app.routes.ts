import { Routes } from '@angular/router';
import { loggedInUserGuard } from './auth/guards/logged-in-user.guard';
import { checkPasswordRecoveryRequestGuard } from './auth/guards/check-password-recovery-request.guard';
import { loggedOutUserGuard } from './auth/guards/logged-out-user.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loggedOutUserGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [loggedOutUserGuard],
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'password-recovery',
    canActivate: [loggedOutUserGuard],
    loadComponent: () =>
      import('./pages/password-recovery/password-recovery.component').then(
        (c) => c.PasswordRecoveryComponent
      ),
  },
  {
    path: 'reset-password',
    canActivate: [checkPasswordRecoveryRequestGuard, loggedOutUserGuard],
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(
        (c) => c.ResetPasswordComponent
      ),
  },
  {
    path: 'book-listings',
    pathMatch: 'full',
    canActivate: [loggedInUserGuard],
    loadComponent: () =>
      import('./pages/book-listings/book-listings.component').then(
        (c) => c.BookListingsComponent
      ),
  },
  {
    path: 'book-search',
    pathMatch: 'full',
    canActivate: [loggedInUserGuard],
    loadComponent: () =>
      import('./pages/book-search/book-search.component').then(
        (c) => c.BookSearchComponent
      ),
  },
  {
    path: 'book-listings/add',
    canActivate: [loggedInUserGuard],
    loadComponent: () =>
      import('./pages/add-book/add-book.component').then(
        (c) => c.AddBookComponent
      ),
  },
  {
    path: 'book-listings/:id/edit',
    canActivate: [loggedInUserGuard],
    loadComponent: () =>
      import('./pages/edit-book/edit-book.component').then(
        (c) => c.EditBookComponent
      ),
  },
  {
    path: 'book/:id',
    canActivate: [loggedInUserGuard],
    loadComponent: () =>
      import('./pages/book-details/book-details.component').then(
        (c) => c.BookDetailsComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
