import { TestBed } from '@angular/core/testing';
import { Pickup } from '../../features/pickup/pickup';

describe('Pickup', () => {
  let service: Pickup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pickup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
