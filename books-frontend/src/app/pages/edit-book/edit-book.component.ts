import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookListingsService } from '../../book-listings/services/book-listings.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss',
})
export class EditBookComponent implements OnInit {
  private fb = inject(FormBuilder);
  private bookListingsService = inject(BookListingsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editBookForm = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control('', [Validators.required]),
    author: this.fb.nonNullable.control('', [Validators.required]),
    genre: this.fb.nonNullable.control('', [Validators.required]),
    condition: this.fb.nonNullable.control('', [Validators.required]),
    availability_status: this.fb.nonNullable.control('', [Validators.required]),
  });

  ngOnInit(): void {
    this.bookListingsService
      .getBookListing(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.editBookForm.patchValue(data);
      });
  }

  get titleControl() {
    return this.editBookForm.controls.title;
  }
  get authorControl() {
    return this.editBookForm.controls.author;
  }
  get genreControl() {
    return this.editBookForm.controls.genre;
  }
  get conditionControl() {
    return this.editBookForm.controls.condition;
  }
  get availabilityStatusControl() {
    return this.editBookForm.controls.availability_status;
  }

  submit() {
    if (this.editBookForm.valid) {
      const booklisting = this.editBookForm.getRawValue();
      this.bookListingsService.update(this.route.snapshot.params['id'], booklisting).subscribe(() => {
        this.router.navigate(['/book-listings']);
      });
    }
  }
}
