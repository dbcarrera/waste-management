import { TestBed } from '@angular/core/testing';
import { PickupApi } from './pickup-api';

describe('PickupApi', () => {
  let service: PickupApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickupApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
