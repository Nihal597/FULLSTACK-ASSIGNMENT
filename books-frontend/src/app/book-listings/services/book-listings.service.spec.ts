import { TestBed } from '@angular/core/testing';

import { BookListingsService } from './book-listings.service';

describe('BookListingsService', () => {
  let service: BookListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
