export interface MessageType {
  sender: 'tenant' | 'ai' | 'agent' | 'system';
  message: string;
  timestamp: string;
}

export interface ConversationFilterProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export interface ScenarioFilterProps {
  options: any[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  className?: string;
}

// export interface AIConversation {
//   id: string;
//   tenant: string;
//   unit: string;
//   dateTime: string;
//   topic: string;
//   status: string;
//   messages: {
//     sender: 'tenant' | 'ai';
//     message: string;
//     timestamp: string;
//   }[];
//   department: string;
//   community: string;
//   market: string;
//   resolution?: string;
//   contactName: string;
//   channel: string;
//   scenario?: string;
//   sentiment: string;
//   summary: string;
//   transcript: string;
//   actionItems: string[];
//   systemLinks: {
//     yardi: string;
//     calendar: string;
//     posting?: string;
//     maintenance?: string;
//     leases?: string;
//     moveout?: string;
//   };
// }

// export interface AIAgentConsoleProps {
//   conversations: AIConversation[];
//   activeDepartment: string;
//   activeView: string;
//   searchQuery: string;
//   marketFilters: string[];
//   communityFilters: string[];
//   statusFilters: string[];
//   className?: string;
// }

// export interface CommunicationsAnalyticsProps {
//   conversations: AIConversation[];
//   department?: string;
// }
