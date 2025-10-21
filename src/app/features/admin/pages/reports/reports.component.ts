import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PickupService } from '../../../../core/models/pickup.service';
import { IssueService } from '../../../../core/models/issue.service';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NgFor],
  template: `
  <div class="reports">
    <h2>Admin Reports</h2>
    <div class="summary">
      <div class="card">Pickups total: <strong>{{pickups.length}}</strong></div>
      <div class="card">Issues total: <strong>{{issues.length}}</strong></div>
    </div>

    <h3>Pickups by type</h3>
    <div class="chart" aria-hidden="false">
      <svg width="400" height="140">
        <g *ngFor="let t of types; let i = index">
          <rect [attr.x]="i*95 + 10" [attr.y]="120 - (values[t] || 0)*6" [attr.width]="60" [attr.height]="(values[t] || 0)*6" fill="#4CAF50"></rect>
          <text [attr.x]="i*95 + 40" y="135" font-size="12" text-anchor="middle">{{t}}</text>
          <text [attr.x]="i*95 + 40" [attr.y]="115 - (values[t] || 0)*6" font-size="12" text-anchor="middle">{{values[t] || 0}}</text>
        </g>
      </svg>
    </div>

    <h3>Pickups table</h3>
    <table class="table">
      <thead><tr><th>ID</th><th>Type</th><th>Location</th><th>Created</th></tr></thead>
      <tbody>
        <tr *ngFor="let p of pickups">
          <td>{{p.id}}</td>
          <td>{{p.type}}</td>
          <td>{{p.location}}</td>
          <td>{{p.created | date:'short'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class ReportsComponent {
  pickups: any[] = [];
  issues: any[] = [];
  types = ['paper','glass','organic','plastic'];
  counts: any = {};
  values: any = {};
  loading = true;
  error: string | null = null;

  constructor(private pickup: PickupService, private issue: IssueService) {}

  ngOnInit() {
    try {
      this.pickups = this.pickup?.listAll() || [];
      this.issues = this.issue?.listAll() || [];
      this.counts = {};
      (this.pickups || []).forEach((p: any) => { this.counts[p.type] = (this.counts[p.type] || 0) + 1; });
      this.types.forEach(t => this.values[t] = this.counts[t] || 0);
    } catch (e: any) {
      console.error('Reports init error', e);
      this.error = e?.message || String(e);
    } finally {
      this.loading = false;
    }
  }
}
