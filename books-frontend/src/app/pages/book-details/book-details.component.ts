import { Component, inject } from '@angular/core';
import { BookSearchService } from '../../book-search/services/book-search.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, JsonPipe, Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  book$ = inject(BookSearchService).getBook(this.route.snapshot.params['id']);
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
