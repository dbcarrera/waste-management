import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pickup } from './pickup';

describe('Pickup', () => {
  let component: Pickup;
  let fixture: ComponentFixture<Pickup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pickup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pickup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
