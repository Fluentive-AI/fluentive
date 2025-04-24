import { MessageType } from '@/types/communications';

export interface MetricData {
  label: string;
  value: number;
  change: number;
  status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
  markets?: {
    [key: string]: {
      value: number;
      change: number;
      status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
    };
  };
  communities?: {
    [key: string]: {
      value: number;
      change: number;
      status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
    };
  };
  kpi?: string;
  id?: string | number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  date: string;
  agent: string;
  notes: string;
  followUp: string;
  market: string;
  community: string;
  propertyInterest?: string;
  assignedTo?: string;
  tourScheduled?: string;
  dateCreated?: string;
  tourDateTime?: string;
  propertyAddress?: string;
  nextFollowUp?: string;
  lastContact?: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  date: string;
  agent: string;
  market: string;
  community: string;
  unit: string;
  moveInDate: string;
  creditScore: number;
  income: number;
  pets: boolean;
  documents: string[];
  assignedTo?: string;
  propertyInterest?: string;
  dateSubmitted?: string;
  backgroundCheck?: {
    status: string;
    completed: boolean;
  };
  creditCheck?: {
    status: string;
    completed: boolean;
  };
  incomeVerification?: {
    status: string;
    completed: boolean;
  };
  leadId?: string;
  propertyAddress?: string;
  notes?: string;
}

export interface Tenant {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  status: string;
  leaseStart: string;
  leaseEnd: string;
  unit: string;
  rent: number;
  balance: number;
  lastPayment: string;
  community: string;
  market: string;
  rentStatus?: string;
  rentAmount?: number;
  delinquentAmount?: number;
  propertyManager?: string;
  notes?: string;
  amountDQ?: number;
  region?: string;
}

export interface MaintenanceRequest {
  id: string;
  tenant: string;
  unit: string;
  category: string;
  description: string;
  status: string;
  priority: string;
  dateSubmitted: string;
  dateCompleted: string | null;
  assignedTo: string | null;
  notes: string[];
  community: string;
  market: string;
  tenantId?: string;
  tenantName?: string;
  issue?: string;
  scheduledDate?: string;
  endDate?: string;
  type?: string;
}

export interface RentPayment {
  id: string;
  tenant: string;
  unit: string;
  amount: number;
  date: string;
  status: string;
  method: string;
  community: string;
  market: string;
  tenantId?: string;
  tenantName?: string;
  dueDate?: string;
  datePaid?: string | null;
  paymentMethod?: string | null;
  propertyManager?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface RentCommunication {
  id: string;
  tenantName: string;
  unit: string;
  status: string;
  message: string;
  date: string;
  category: string;
  community: string;
  market: string;
  amount?: number;
  dueDate?: string;
  contactPhone?: string;
  contactEmail?: string;
  tenantId?: string;
  propertyManager?: string;
  property?: string;
  channel?: string;
  dateTime?: string;
  summary?: string;
  transcript?: string;
  rentStatus?: string;
  actionItems?: string[];
}

export interface SuperCommunication {
  id: string;
  tenantName: string;
  unit: string;
  community: string;
  superintendent: string;
  status: "scheduled" | "urgent" | "completed" | string;
  message: string;
  date: string;
  category: string;
}

export interface TenantLeasingProps {
  scenario?: string;
}

export interface MetricCardProps {
  metric: MetricData;
  selectedMarket?: string;
}

export interface DashboardMetric {
  id: string | number;
  title: string;
  value: number;
  change: number;
  status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
  label?: string;
  markets?: {
    [key: string]: {
      value: number;
      change: number;
      status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
    };
  };
  communities?: {
    [key: string]: {
      value: number;
      change: number;
      status: 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad' | null;
    };
  };
  kpi?: string;
  originalPosition?: number;
}

export interface AssistantTab {
  id: string;
  name: string;
  title: string;
  description: string;
  videoPath: string;
  audioPath: string;
  avatarPath?: string;
}

export interface TenantLeasingScenarioProps {
  scenario: string;
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
}

export interface ScenarioFilterProps {
  options: any[];
  selectedValues: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface CommunicationsAnalyticsProps {
  conversations: AIConversation[];
  department?: string;
}
