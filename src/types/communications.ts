
import { AIConversation } from '../types';

export { AIConversation };

export interface ConversationFilterProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export interface ScenarioFilterProps {
  options: Array<{label: string, value: string}>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export interface AIAgentConsoleProps {
  conversations: AIConversation[];
  activeDepartment?: string;
  activeView?: string;
  searchQuery?: string;
  marketFilters?: string[];
  communityFilters?: string[];
  scenarioFilters?: string[];
  className?: string;
}

export interface CommunicationsAnalyticsProps {
  conversations: AIConversation[];
  department?: string;
}
