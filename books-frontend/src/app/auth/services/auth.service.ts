import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';

export type User = {
  id: string;
  name: string;
  email: string;
  location: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  user$ = this.user.asObservable();

  private token: BehaviorSubject<string> = new BehaviorSubject('');
  token$ = this.token.asObservable();

  constructor(private http: HttpClient) {
    this.retrieveTokenAndUser();
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: User }>(
        'http://localhost:3000/api/v1/auth/login',
        {
          email,
          password,
        }
      )
      .pipe(
        map(({ user, token }) => {
          this.user.next(user);
          this.token.next(token);
          this.setTokenAndUser(token, user);
          return;
        }),
        catchError((error) => {
          console.log(error);
          return of({ message: 'unable_to_login' });
        })
      );
  }

  logout() {
    this.resetTokenAndUser();
  }

  register(user: {
    name: string;
    email: string;
    password: string;
    location: string;
  }) {
    return this.http.post('http://localhost:3000/api/v1/auth/register', user);
  }

  passwordRecovery(email: string) {
    return this.http.post(
      'http://localhost:3000/api/v1/auth/password-recovery',
      { email }
    );
  }

  passwordReset(id: string, code: string, password: string) {
    return this.http.post('http://localhost:3000/api/v1/auth/reset-password', {
      id,
      code,
      password,
    });
  }

  checkPasswordRecoveryRequest(id: string) {
    return this.http.post<{ isAvailable: boolean }>(
      'http://localhost:3000/api/v1/auth/check-password-recovery',
      { id }
    );
  }

  private setTokenAndUser(token: string, user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }
  private resetTokenAndUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user.next(null);
    this.token.next('');
  }

  private retrieveTokenAndUser() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user == null || token == null) return;

    this.user.next(JSON.parse(user) as User);
    this.token.next(token);
  }
}
