import { TestBed } from '@angular/core/testing';

import { DatabaseApi } from './database-api';

describe('DatabaseApi', () => {
  let service: DatabaseApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
