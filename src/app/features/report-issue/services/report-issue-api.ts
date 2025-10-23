import { Injectable, inject, signal, computed } from '@angular/core';
import { Issue } from '../../../core/models/issue';
import { DatabaseApi } from '../../../shared/services/database-api';
import { AuthApi } from '../../../shared/services/auth-api';

@Injectable({
  providedIn: 'root',
})
export class ReportIssueApi {
  private databaseApi = inject(DatabaseApi);
  private authApi = inject(AuthApi);

  // Signal for issues list
  private issuesSignal = signal<Issue[]>([]);

  // Public readonly issues
  allIssues = this.issuesSignal.asReadonly();

  // Computed property for current user's issues
  userIssues = computed(() => {
    const currentUser = this.authApi.currentUser();
    if (!currentUser) return [];
    return this.issuesSignal().filter((issue) => issue.userId === currentUser.id);
  });

  constructor() {
    this.loadIssues();
  }

  /**
   * Load all issues from the database
   */
  private loadIssues(): void {
    try {
      const issues = this.databaseApi.read<Issue>('ewms_issues');
      this.issuesSignal.set(issues);
    } catch (error) {
      console.error('Error loading issues:', error);
      this.issuesSignal.set([]);
    }
  }

  /**
   * Get issues by user ID
   */
  getIssuesByUserId(userId: string): Issue[] {
    return this.issuesSignal().filter((issue) => issue.userId === userId);
  }

  /**
   * Get issue by ID
   */
  getIssueById(id: string): Issue | undefined {
    return this.issuesSignal().find((issue) => issue.id === id);
  }

  /**
   * Create a new issue
   * @param issueType Type of the issue
   * @param issueMessage Message describing the issue
   * @returns Promise<boolean> indicating success
   */
  async createIssue(
    issueType: 'missed pickup' | 'bug' | 'other',
    issueMessage: string
  ): Promise<boolean> {
    try {
      const currentUser = this.authApi.currentUser();
      if (!currentUser) {
        console.error('No authenticated user found');
        return false;
      }

      if (!issueMessage.trim()) {
        console.error('Issue message cannot be empty');
        return false;
      }

      const newIssue: Issue = {
        id: this.generateUUID(),
        userId: currentUser.id,
        issueType,
        issueMessage: issueMessage.trim(),
        date: new Date().toISOString(),
        completed: null,
      };

      const updatedIssues = [...this.issuesSignal(), newIssue];
      this.databaseApi.write<Issue>('ewms_issues', updatedIssues);
      this.issuesSignal.set(updatedIssues);

      return true;
    } catch (error) {
      console.error('Error creating issue:', error);
      return false;
    }
  }

  /**
   * Update an existing issue
   * @param id Issue ID
   * @param updates Partial issue updates
   * @returns boolean indicating success
   */
  updateIssue(id: string, updates: Partial<Omit<Issue, 'id' | 'userId' | 'date'>>): boolean {
    try {
      const issues = this.issuesSignal();
      const issueIndex = issues.findIndex((issue) => issue.id === id);

      if (issueIndex === -1) {
        console.error('Issue not found');
        return false;
      }

      const updatedIssues = [...issues];
      updatedIssues[issueIndex] = {
        ...updatedIssues[issueIndex],
        ...updates,
      };

      this.databaseApi.write<Issue>('ewms_issues', updatedIssues);
      this.issuesSignal.set(updatedIssues);

      return true;
    } catch (error) {
      console.error('Error updating issue:', error);
      return false;
    }
  }

  /**
   * Delete an issue
   * @param id Issue ID
   * @returns boolean indicating success
   */
  deleteIssue(id: string): boolean {
    try {
      const updatedIssues = this.issuesSignal().filter((issue) => issue.id !== id);
      this.databaseApi.write<Issue>('ewms_issues', updatedIssues);
      this.issuesSignal.set(updatedIssues);

      return true;
    } catch (error) {
      console.error('Error deleting issue:', error);
      return false;
    }
  }

  /**
   * Generate a UUID for new issues
   */
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
