import { TestBed } from '@angular/core/testing';

import { ReportIssue } from './report-issue';

describe('ReportIssue', () => {
  let service: ReportIssue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportIssue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
