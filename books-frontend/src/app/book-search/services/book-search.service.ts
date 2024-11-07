import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BookListing } from '../../book-listings/services/book-listings.service';
import { AuthService } from '../../auth/services/auth.service';
import { first, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookSearchService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private booklistingsSignal = signal<BookListing[]>([]);
  booklistings = this.booklistingsSignal.asReadonly();

  private offset = 0;
  private limit = 10;

  getBook(id: string) {
    return this.authService.token$.pipe(
      first(),
      switchMap((token) => {
        return this.http.get<BookListing & { location: string; name: string }>(
          `http://localhost:3000/api/v1/booklistings/${id}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  search(
    query: string,
    filters: {
      condition?: boolean;
      availability_status?: boolean;
      genre?: string;
      location?: boolean;
    }
  ) {
    this.authService.token$
      .pipe(
        first(),
        switchMap((token) => {
          return this.authService.user$.pipe(
            first(),
            switchMap((user) => {
              return this.http.get<{ books: BookListing[] }>(
                'http://localhost:3000/api/v1/books',
                {
                  params: {
                    query,
                    condition: filters.condition ? 'New' : '',
                    availability_status: filters.availability_status
                      ? 'Available'
                      : '',
                    location: filters.location ? user!.location : '',
                    genre: filters.genre ?? '',
                    offset: this.offset,
                    limit: this.limit,
                  },
                  headers: {
                    authorization: 'Bearer ' + token,
                  },
                }
              );
            })
          );
        })
      )
      .subscribe((data) => {
        this.booklistingsSignal.update((books) => [...books, ...data.books]);
        this.offset += this.limit;
      });
  }

  resetData() {
    this.booklistingsSignal.set([]);
    this.offset = 0;
  }
}
