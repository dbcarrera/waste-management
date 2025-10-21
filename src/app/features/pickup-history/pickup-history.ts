import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pickups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pickup-history.html',
  styleUrls: ['./pickup-history.css']
})
export class Pickups {
  pickupHistory = [
    { date: '2025-10-01', location: 'Kuala Lumpur', status: 'Completed' },
    { date: '2025-10-03', location: 'Petaling Jaya', status: 'Pending' },
    { date: '2025-10-05', location: 'Subang Jaya', status: 'Cancelled' },
  ];
}
