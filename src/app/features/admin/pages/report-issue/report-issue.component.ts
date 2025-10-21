import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../../../../core/models/issue.service';
import { AuthService } from '../../../../core/models/auth.service';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <h2>Report Issue</h2>
  <form (ngSubmit)="submit()">
    <label>Type</label>
    <select [(ngModel)]="issueType" name="issueType" required>
      <option value="missed pickup">Missed pickup</option>
      <option value="overflowing bin">Overflowing bin</option>
      <option value="illegal dumping">Illegal dumping</option>
      <option value="other">Other</option>
    </select>
    <textarea [(ngModel)]="issueMessage" name="issueMessage" rows="4" placeholder="Describe the issue" required></textarea>
    <!-- simulated file upload -->
    <input type="file" (change)="onFile($event)" />
    <button type="submit">Report</button>
  </form>
  <p style="color:green">{{msg}}</p>
  `
})
export class ReportIssueComponent {
  issueType='missed pickup'; issueMessage=''; photoBase64: string|undefined; msg='';
  constructor(private issueSvc: IssueService, private auth: AuthService) {}

  onFile(e:any) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.photoBase64 = reader.result as string;
    reader.readAsDataURL(file);
  }

  submit() {
    const user = this.auth.getCurrentUser();
    if (!user) { this.msg = 'Please login'; return; }
    this.issueSvc.report({ userId: user.id, issueType: this.issueType as any, issueMessage: this.issueMessage, photo: this.photoBase64 });
    this.msg = 'Issue reported';
  }
}
