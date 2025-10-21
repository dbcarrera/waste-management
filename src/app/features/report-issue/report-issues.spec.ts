import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportIssues } from './report-issues';

describe('ReportIssues', () => {
  let component: ReportIssues;
  let fixture: ComponentFixture<ReportIssues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportIssues],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportIssues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
