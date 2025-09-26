export interface Issue {
  userId: string;
  issueType: 'missed pickup' | 'bug' | 'other';
  issueMessage: string;
  date: Date;
}
