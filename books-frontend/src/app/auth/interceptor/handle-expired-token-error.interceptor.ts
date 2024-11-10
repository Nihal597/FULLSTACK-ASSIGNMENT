import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const handleExpiredTokenErrorInterceptor: HttpInterceptorFn = (req, next) => {
 const router = inject(Router);
 const authService = inject(AuthService);
  return next(req).pipe(catchError((error)=>{
    if(error instanceof HttpErrorResponse){
      if (error.status == 401) {
         authService.logout();
         router.navigate(["/login"]);
      }
    }
    return of(error);
  }));

};
