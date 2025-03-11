export interface AIConversation {
  id: string;
  contactName: string;
  dateTime: string;
  channel: 'voice' | 'sms' | 'email';
  summary: string;
  transcript: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  actionItems: string[];
  scenario?: string;
}
