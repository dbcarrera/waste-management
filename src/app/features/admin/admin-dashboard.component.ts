import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService } from '../../core/models/community.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  template: `
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section class="community">
        <h3>Create Community</h3>
        <label>Name: <input [(ngModel)]="form.name" placeholder="Community name"></label>
        <label>Location: <input [(ngModel)]="form.location" placeholder="Location"></label>
        <button (click)="create()">Create</button>
      </section>

      <section class="communities-list">
        <h3>Communities</h3>
        <ul>
          <li *ngFor="let c of communities">{{c.name}} — {{c.location}} (created {{c.created | date:'short'}})</li>
        </ul>
      </section>
    </div>
  `
})
export class AdminDashboardComponent {
  communities: any[] = [];
  form: any = { name: '', location: '' };
  private error: string | null = null;
  constructor(private community: CommunityService) {}
  ngOnInit() { this.load(); }
  load() {
    try {
      this.communities = this.community?.list() || [];
    } catch (e:any) {
      console.error('Community load error', e);
      this.error = e?.message || String(e);
      this.communities = [];
    }
  }
  create() {
    if (!this.form.name) return;
    try {
      this.community.create(this.form.name, this.form.location || '');
      this.form = { name: '', location: '' };
      this.load();
    } catch (e:any) {
      console.error('Community create error', e);
      this.error = e?.message || String(e);
    }
  }
}
