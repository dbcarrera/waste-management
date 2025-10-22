import { TestBed } from '@angular/core/testing';

import { CommunityApi } from './community-api';

describe('Community', () => {
  let service: CommunityApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
