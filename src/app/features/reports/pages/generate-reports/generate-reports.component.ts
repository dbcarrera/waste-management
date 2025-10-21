import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // 

@Component({
  selector: 'app-generate-reports',
  standalone: true,
  imports: [CommonModule], // 
  templateUrl: './generate-reports.component.html',
  styleUrls: ['./generate-reports.component.css']
})
export class GenerateReportsComponent {
  reports = [
    { id: 1, title: 'Monthly Report', createdAt: new Date() },
    { id: 2, title: 'Community Report', createdAt: new Date('2025-09-15') }
  ];
}

