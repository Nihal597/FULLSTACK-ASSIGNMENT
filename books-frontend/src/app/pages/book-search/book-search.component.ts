import { Component, inject, OnInit } from '@angular/core';
import { BookSearchService } from '../../book-search/services/book-search.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss',
})
export class BookSearchComponent implements OnInit {
  private bookSearchService = inject(BookSearchService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  searchForm = this.fb.nonNullable.group({
    query: this.fb.nonNullable.control(''),
    availability_status: this.fb.nonNullable.control(false),
    condition: this.fb.nonNullable.control(false),
    genre: this.fb.nonNullable.control(''),
    location: this.fb.nonNullable.control(false),
  });

  booklistings = this.bookSearchService.booklistings;

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.bookSearchService.resetData();
      this.bookSearchService.search(queryParams['query'], {
        availability_status: queryParams['availability_status'] === 'true',
        condition: queryParams['condition'] === 'true',
        location: queryParams['location'] === 'true',
        genre: queryParams['genre'],
      });
      this.searchForm.controls.query.patchValue(queryParams['query']);
    });
  }

  search() {
    const { query, availability_status, condition, genre, location } =
      this.searchForm.getRawValue();
    this.router.navigate(['/book-search'], {
      queryParams: { query, availability_status, condition, genre, location },
    });
  }

  loadMore() {
    const { query, availability_status, condition, genre, location } =
      this.searchForm.getRawValue();
    this.bookSearchService.search(query, {
      availability_status,
      condition,
      genre,
      location
    })
  }
}
