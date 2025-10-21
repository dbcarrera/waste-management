import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; //

@Component({
  selector: 'app-report-issues',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], //
  templateUrl: './report-issues.html',
  styleUrls: ['./report-issues.css'],
})
export class ReportIssues {
  issueDescription: string = '';
  submitted: boolean = false;

  submitIssue() {
    if (this.issueDescription.trim() !== '') {
      this.submitted = true;
      console.log('Reported issue:', this.issueDescription);
      this.issueDescription = '';
    }
  }
}
