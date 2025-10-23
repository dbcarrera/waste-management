import { TestBed } from '@angular/core/testing';

import { ReportIssueApi } from './report-issue-api';

describe('ReportIssue', () => {
  let service: ReportIssueApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportIssueApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
