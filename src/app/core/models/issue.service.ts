import { Injectable } from '@angular/core';
import { MockDbService } from './mock-db.service';
import { Issue } from './models';

@Injectable({ providedIn: 'root' })
export class IssueService {
  constructor(private db: MockDbService) {}
  listAll(): Issue[] { return this.db.read<Issue>('cwms_issues'); }
  report(issue: Partial<Issue>) {
    const all = this.listAll();
    const i: Issue = {
      id: 'i-' + Date.now(),
      userId: issue.userId!,
      issueType: issue.issueType as any,
      issueMessage: issue.issueMessage || '',
      date: new Date().toISOString(),
      photo: issue.photo,
      status: 'NEW'
    };
    all.push(i);
    this.db.write('cwms_issues', all);
    return i;
  }
}
