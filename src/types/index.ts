export interface MessageType {
  sender: 'tenant' | 'ai' | 'agent' | 'system';
  message: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  contactName: string;
  tenant?: string;
  unit?: string;
  dateTime: string;
  topic?: string;
  status?: string;
  messages?: MessageType[];
  department?: string;
  community?: string;
  market?: string;
  resolution?: string;
  channel: 'voice' | 'sms' | 'email' | string;
  summary: string;
  transcript: string;
  sentiment: 'positive' | 'neutral' | 'negative' | string;
  actionItems: string[];
  scenario?: string;
  contactPhone?: string;
  contactEmail?: string;
  systemLinks?: string[] | {
    yardi: string;
    calendar: string;
    posting?: string;
    maintenance?: string;
    leases?: string;
    moveout?: string;
  };
  relatedTo?: string;
}

export interface AIAgentConsoleProps {
  conversations: AIConversation[];
  activeDepartment: string;
  activeView: string;
  searchQuery: string;
  marketFilters: string[];
  communityFilters: string[];
  statusFilters: string[];
  className?: string;
}

export interface CommunicationsAnalyticsProps {
  conversations: AIConversation[];
  department?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'tour_scheduled' | 'application_sent' | 'application_received' | 'pending' | 'scheduled' | 'completed' | 'approved' | 'active';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  unitInterest?: string;
  dateCreated: string;
  market: string;
  community: string;
  assignedTo: string;
  status: LeadStatus;
  tourScheduled?: string;
  tourDateTime?: string;
  notes?: string;
  lastContact?: string;
  source?: string;
}

export type ApplicationStatus = 'pending' | 'approved' | 'denied' | 'reviewing';

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  dateSubmitted: string;
  status: ApplicationStatus;
  assignedTo?: string;
  propertyInterest: string;
  backgroundCheck: {
    status: 'completed' | 'approved' | 'pending' | 'failed';
    score?: number;
  };
  creditCheck: {
    status: 'completed' | 'approved' | 'pending' | 'failed';
    score?: number;
  };
  incomeVerification: {
    status: 'completed' | 'approved' | 'pending' | 'failed';
    verified: boolean;
  };
  market: string;
  community: string;
  unit: string;
  moveInDate: string;
  creditScore: number;
  income: number;
  pets: boolean;
  documents: string[];
  leadId?: string;
  agent: string;
}

export type TenantStatus = 'active' | 'inactive' | 'notice';
export type RentStatus = 'current' | 'delinquent' | 'paid' | 'pending';

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  unit: string;
  community: string;
  market: string;
  leaseEnd: string;
  leaseStart?: string;
  status: TenantStatus;
  rentStatus: RentStatus;
  propertyManager: string;
  rentAmount: number;
  notes?: string;
  moveInDate: string;
  delinquentAmount?: number;
}

export type MaintenanceStatus = 'new' | 'assigned' | 'in_progress' | 'completed' | 'pending' | 'scheduled';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent' | 'normal';

export interface MaintenanceRequest {
  id: string;
  tenantName: string;
  unit: string;
  issue: string;
  description: string;
  dateSubmitted: string;
  status: MaintenanceStatus;
  priority: PriorityLevel;
  assignedTo?: string;
  scheduledDate?: string;
  endDate?: string;
  community?: string;
  tenantId?: string;
}

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'delinquent';

export interface RentPayment {
  id: string;
  tenantName: string;
  unit: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: string;
  datePaid?: string;
  propertyManager?: string;
  tenantId?: string;
}

export type MetricChangeStatus = 'neutral' | 'up' | 'down' | 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad';

export interface MetricData {
  title: string;
  value: number | string;
  change: number;
  status: MetricChangeStatus;
  timeframe: string;
  format?: string;
  markets?: {
    name: string;
    value: number;
  }[];
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
export interface AIAgentConsoleProps {
  conversations: AIConversation[];
  activeDepartment: string;
  activeView: string;
  searchQuery: string;
  marketFilters: string[];
  communityFilters: string[];
  statusFilters: string[];
  className?: string;
}

export interface MockLeasingConversation {
  id: string;
  prospectName: string;
  propertyInterest: string;
  channel: string;
  community: string;
  market: string;
  leasingAgent: string;
  status: string;
  message: string;
  date: string;
  category: string;
  lead_score: number;
  transcript: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  urgency: 'high' | 'medium' | 'low';
  interestLevel: 'high' | 'medium' | 'low';
  scenario: string;
}

export interface CommunicationsAnalyticsProps {
  conversations: AIConversation[];
  department?: string;
}

export interface ConversationType {
  id: string;
  prospectName: string;
  dateTime: string;
  channel: 'chat' | 'email' | 'phone';
  market: string;
  status: 'active' | 'completed' | 'transferred';
  transcript: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high';
  interestLevel: 'low' | 'medium' | 'high';
  scenario: string;
  summary: string;
}


