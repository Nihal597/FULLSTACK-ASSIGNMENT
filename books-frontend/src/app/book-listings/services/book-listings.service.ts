import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { first, switchMap } from 'rxjs';

export type BookListing = {
  id: string;
  title: string;
  condition: string;
  availability_status: string;
  genre: string;
  author: string;
};

@Injectable({
  providedIn: 'root',
})
export class BookListingsService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getBookListings() {
    return this.authService.token$.pipe(
      first(),
      switchMap((token) => {
        return this.http.get<{ booklistings: BookListing[] }>(
          'http://localhost:3000/api/v1/booklistings',
          { headers: { authorization: 'Bearer ' + token } }
        );
      })
    );
  }

  addBookListings(bookListing: Omit<BookListing, 'id'>) {
    return this.authService.token$.pipe(
      first(),
      switchMap((token) => {
        return this.http.post(
          'http://localhost:3000/api/v1/booklistings',
          bookListing,
          { headers: { authorization: 'Bearer ' + token } }
        );
      })
    );
  }

  delete(id: string) {
    return this.authService.token$.pipe(
      first(),
      switchMap((token) => {
        return this.http.delete(
          `http://localhost:3000/api/v1/booklistings/${id}`,
          { headers: { authorization: 'Bearer ' + token } }
        );
      })
    );
  }

  update(id: string, booklisting: Omit<BookListing, 'id'>) {
    return this.authService.token$.pipe(
      first(),
      switchMap((token) => {
        return this.http.put(
          `http://localhost:3000/api/v1/booklistings/${id}`,
          booklisting,
          { headers: { authorization: 'Bearer ' + token } }
        );
      })
    );
  }
  getBookListing(id: string) {
    return this.authService.token$.pipe(
      first(),
      switchMap((token) => {
        return this.http.get<BookListing>(
          `http://localhost:3000/api/v1/booklistings/${id}`,
          { headers: { authorization: 'Bearer ' + token } }
        );
      })
    );
  }
}
