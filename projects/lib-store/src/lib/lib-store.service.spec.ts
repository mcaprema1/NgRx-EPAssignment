import { TestBed } from '@angular/core/testing';

import { LibStoreService } from './lib-store.service';

describe('LibStoreService', () => {
  let service: LibStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
