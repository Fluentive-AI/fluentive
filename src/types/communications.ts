
export interface MessageType {
  sender: 'tenant' | 'ai' | 'agent' | 'system';
  message: string;
  timestamp: string;
}

export interface ConversationFilterProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}
