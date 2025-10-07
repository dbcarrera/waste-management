import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-issues',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './report_issues.html',
  styleUrls: ['./report_issues.css']
})
export class ReportIssuesComponent {
  issue = {
    type: '',
    description: '',
    location: '',
    date: ''
  };

  message: string = '';

  submitIssue() {
    console.log('Issue submitted:', this.issue);
    this.message = 'Issue reported successfully! ✅';

    // 清空表单
    this.issue = { type: '', description: '', location: '', date: '' };
  }
}
