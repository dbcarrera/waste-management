import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrostedCard } from './frosted-card';

describe('FrostedCard', () => {
  let component: FrostedCard;
  let fixture: ComponentFixture<FrostedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrostedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrostedCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
