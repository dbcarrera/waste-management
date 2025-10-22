import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReportIssue } from './services/report-issue';
import { Issue } from '../../core/models/issue';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-report-issues',
  standalone: true,
  imports: [FormsModule, RouterModule, DatePipe],
  templateUrl: './report-issues.html',
  styleUrls: ['./report-issues.css'],
})
export class ReportIssues {
  private reportIssueService = inject(ReportIssue);
  private authService = inject(Auth);

  // Form fields
  issueType: Issue['issueType'] | '' = '';
  issueMessage: string = '';

  // UI state
  submitted: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  // Admin access
  isAdmin = this.authService.isAdmin;
  allIssues = this.reportIssueService.allIssues;

  completeIssue(issueId: string): void {
    const success = this.reportIssueService.updateIssue(issueId, {
      completed: new Date().toISOString(),
    });
    if (success) {
      console.log('Issue marked as completed successfully');
    } else {
      console.error('Failed to mark issue as completed');
    }
  }

  async submitIssue() {
    if (this.issueType === '' || this.issueMessage.trim() === '') {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.submitted = false;

    try {
      const success = await this.reportIssueService.createIssue(
        this.issueType as Issue['issueType'],
        this.issueMessage
      );

      if (success) {
        this.submitted = true;
        this.issueType = '';
        this.issueMessage = '';
      } else {
        this.errorMessage = 'Failed to submit the issue. Please make sure you are logged in.';
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.issueType = '';
    this.issueMessage = '';
    this.submitted = false;
    this.errorMessage = '';
  }
}
