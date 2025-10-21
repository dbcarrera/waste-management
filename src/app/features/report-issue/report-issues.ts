import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportIssue } from './services/report-issue';
import { Issue } from '../../core/models/issue';

@Component({
  selector: 'app-report-issues',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './report-issues.html',
  styleUrls: ['./report-issues.css'],
})
export class ReportIssues {
  private reportIssueService = inject(ReportIssue);

  // Form fields
  issueType: Issue['issueType'] | '' = '';
  issueMessage: string = '';

  // UI state
  submitted: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

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
