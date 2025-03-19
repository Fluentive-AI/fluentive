
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

// Add missing interfaces to fix type errors
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
}

export interface Tenant {
  id: string;
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
  datePaid?: string;
  paymentMethod?: string;
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
  tenantId?: string;
  propertyManager?: string;
  property?: string;
}

export interface SuperCommunication {
  id: string;
  tenantName: string;
  unit: string;
  community: string;
  superintendent: string;
  status: "scheduled" | "urgent" | "completed";
  message: string;
  date: string;
  category: string;
}

// Add the scenario prop to TenantLeasing interface to fix the typescript errors in App.tsx
export interface TenantLeasingProps {
  scenario?: string;
}

export interface MetricCardProps {
  metric: MetricData;
  selectedMarket?: string;
}
