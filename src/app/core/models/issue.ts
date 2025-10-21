export interface Issue {
  id: string;
  userId: string;
  issueType: 'missed pickup' | 'bug' | 'other';
  issueMessage: string;
  date: string;
}
