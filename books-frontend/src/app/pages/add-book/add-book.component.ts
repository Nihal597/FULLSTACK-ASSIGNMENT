import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookListingsService } from '../../book-listings/services/book-listings.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  private fb = inject(FormBuilder);
  private bookListingsService = inject(BookListingsService);
  private router = inject(Router);

  addBookForm = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control('', [Validators.required]),
    author: this.fb.nonNullable.control('', [Validators.required]),
    genre: this.fb.nonNullable.control('', [Validators.required]),
    condition: this.fb.nonNullable.control('', [Validators.required]),
    availability_status: this.fb.nonNullable.control('', [Validators.required]),
  });

  get titleControl() {
    return this.addBookForm.controls.title;
  }
  get authorControl() {
    return this.addBookForm.controls.author;
  }
  get genreControl() {
    return this.addBookForm.controls.genre;
  }
  get conditionControl() {
    return this.addBookForm.controls.condition;
  }
  get availabilityStatusControl() {
    return this.addBookForm.controls.availability_status;
  }

  submit() {
    if (this.addBookForm.valid) {
      const booklisting = this.addBookForm.getRawValue();
      this.bookListingsService.addBookListings(booklisting).subscribe(() => {
        this.router.navigate(['/book-listings']);
      });
    }
  }
}
