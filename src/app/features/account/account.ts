import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../shared/services/auth';
import { DatabaseApi } from '../../shared/services/database-api';
import { ToastService } from '../../shared/services/toast';
import { StatisticsReport } from '../../core/models/statistics-report';
import { Pickup } from '../../core/models/pickup';
import { Issue } from '../../core/models/issue';
import { LucideAngularModule, Upload } from 'lucide-angular';
import { CommunityApi } from '../../shared/services/community-api';
import { Charts } from './components/charts/charts';

@Component({
  selector: 'app-account',
  imports: [FormsModule, CommonModule, LucideAngularModule, Charts],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  private authService = inject(Auth);
  private databaseService = inject(DatabaseApi);
  private communityService = inject(CommunityApi);
  private toastService = inject(ToastService);
  readonly Upload = Upload;

  currentUser = this.authService.currentUser;
  isAdmin = this.authService.isAdmin;

  // User profile fields
  username = signal('');
  profilePictureUrl = signal('');
  selectedCommunityId = signal('');

  // Communities for selector
  communities = this.communityService.allCommunities;

  // Admin community creation
  newCommunityName = signal('');
  newCommunityLocation = signal('');

  // Chart overlay state
  showChartOverlay = signal(false);
  currentReport = signal<StatisticsReport | null>(null);

  constructor() {
    const user = this.currentUser();
    if (user) {
      this.username.set(user.name || '');
      this.profilePictureUrl.set(user.pictureUrl || '');
      this.selectedCommunityId.set(user.communityId || '');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      // TODO: For now, just set to a predetermined URL since database is not added yet
      this.profilePictureUrl.set(
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
      );
      this.toastService.success('Profile picture successfully uploaded!');
    }
  }

  onReportFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (file.type !== 'application/json') {
        this.toastService.error('Please upload a valid JSON file');
        input.value = '';
        return;
      }

      // Read the file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const report = JSON.parse(content) as StatisticsReport;

          // Validate the report structure
          if (!report.created || !report.pickupsByType || !report.issuesByType) {
            this.toastService.error('Invalid report format');
            return;
          }

          this.toastService.success('Report uploaded successfully!');

          // Display the report in the chart overlay
          this.currentReport.set(report);
          this.showChartOverlay.set(true);
        } catch (error) {
          this.toastService.error('Failed to parse JSON file');
        }
      };

      reader.onerror = () => {
        this.toastService.error('Failed to read file');
      };

      reader.readAsText(file);
      input.value = '';
    }
  }

  saveProfile() {
    const user = this.currentUser();
    if (!user) {
      this.toastService.error('No user logged in');
      return;
    }

    if (!this.username().trim()) {
      this.toastService.error('Username cannot be empty');
      return;
    }

    // Update user with new data
    const updatedUser = {
      ...user,
      name: this.username(),
      pictureUrl: this.profilePictureUrl(),
      communityId: this.selectedCommunityId(),
    };

    this.authService.updateUser(updatedUser);

    // Also update in the database
    const allUsers = this.databaseService.read('ewms_users');
    const updatedUsers = allUsers.map((u: any) => (u.id === user.id ? updatedUser : u));
    this.databaseService.write('ewms_users', updatedUsers);

    this.toastService.success('Profile updated successfully!');
  }

  createCommunity() {
    if (!this.isAdmin()) {
      this.toastService.error('Only admins can create communities');
      return;
    }

    if (!this.newCommunityName().trim() || !this.newCommunityLocation().trim()) {
      this.toastService.error('Please fill in all community fields');
      return;
    }

    if (this.communities().find((community) => community.name === this.newCommunityName())) {
      this.toastService.error('Community with this name already exists');
      return;
    }

    const success = this.communityService.createCommunity(
      this.newCommunityName(),
      this.newCommunityLocation()
    );

    if (success) {
      this.toastService.success('Community created successfully!');
      this.newCommunityName.set('');
      this.newCommunityLocation.set('');
    } else {
      this.toastService.error('Failed to create community');
    }
  }

  generateReport() {
    const allPickups = this.databaseService.read<Pickup>('ewms_pickups');
    const allIssues = this.databaseService.read<Issue>('ewms_issues');

    const report: StatisticsReport = {
      created: new Date().toISOString(),
      pickupsByType: {
        paper: allPickups.filter((p) => p.type === 'paper').length,
        glass: allPickups.filter((p) => p.type === 'glass').length,
        organic: allPickups.filter((p) => p.type === 'organic').length,
        plastic: allPickups.filter((p) => p.type === 'plastic').length,
      },
      issuesByType: {
        'missed pickup': allIssues.filter((i) => i.issueType === 'missed pickup').length,
        bug: allIssues.filter((i) => i.issueType === 'bug').length,
        other: allIssues.filter((i) => i.issueType === 'other').length,
      },
    };

    // Show the chart overlay
    this.currentReport.set(report);
    this.showChartOverlay.set(true);

    // Also download as JSON
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `waste-management-report-${
      new Date().toISOString().split('T')[0]
    }.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    this.toastService.success('Report generated and downloaded!');
  }

  closeChartOverlay() {
    this.showChartOverlay.set(false);
  }

  signOut() {
    this.authService.logout();
  }
}
