import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookListingsService } from '../../book-listings/services/book-listings.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-listings',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ReactiveFormsModule],
  templateUrl: './book-listings.component.html',
  styleUrl: './book-listings.component.scss',
})
export class BookListingsComponent {
  private booklistingsService = inject(BookListingsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  searchForm = this.fb.nonNullable.group({
    query: this.fb.nonNullable.control(''),
  });

  name = toSignal(inject(AuthService).user$.pipe(map((user) => user?.name)));

  booklistings = this.booklistingsService.getBookListings();

  delete(id: string) {
    this.booklistingsService.delete(id).subscribe(() => {
      this.booklistings = this.booklistingsService.getBookListings();
    });
  }

  search() {
    this.router.navigate(['/book-search'], {
      queryParams: { query: this.searchForm.getRawValue().query },
    });
  }
}
