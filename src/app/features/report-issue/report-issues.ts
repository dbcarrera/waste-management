import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReportIssueApi } from './services/report-issue-api';
import { Issue } from '../../core/models/issue';
import { AuthApi } from '../../shared/services/auth-api';
import { ToastService } from '../../shared/services/toast';

@Component({
  selector: 'app-report-issues',
  standalone: true,
  imports: [FormsModule, RouterModule, DatePipe],
  templateUrl: './report-issues.html',
  styleUrls: ['./report-issues.css'],
})
export class ReportIssues {
  private reportIssueApi = inject(ReportIssueApi);
  private authApi = inject(AuthApi);
  private toastService = inject(ToastService);

  // Form fields
  issueType: Issue['issueType'] | '' = '';
  issueMessage: string = '';

  // UI loading state
  isSubmitting: boolean = false;

  // Admin access
  isAdmin = this.authApi.isAdmin;
  allIssues = this.reportIssueApi.allIssues;

  completeIssue(issueId: string): void {
    const success = this.reportIssueApi.updateIssue(issueId, {
      completed: new Date().toISOString(),
    });
    if (success) {
      this.toastService.success('Issue marked as completed successfully');
    } else {
      this.toastService.error('Failed to mark issue as completed');
    }
  }

  async submitIssue() {
    if (this.issueType === '' || this.issueMessage.trim() === '') {
      this.toastService.error('Please fill in all required fields.');
      return;
    }

    this.isSubmitting = true;

    try {
      const success = await this.reportIssueApi.createIssue(
        this.issueType as Issue['issueType'],
        this.issueMessage
      );

      if (success) {
        this.toastService.success('Thank you for your report, we will look into it!');
        this.issueType = '';
        this.issueMessage = '';
      } else {
        this.toastService.error('Failed to submit the issue. Please make sure you are logged in.');
      }
    } catch (error) {
      this.toastService.error('An unexpected error occurred. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.issueType = '';
    this.issueMessage = '';
    this.isSubmitting = false;
  }
}
