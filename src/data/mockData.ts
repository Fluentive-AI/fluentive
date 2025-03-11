import { 
  Lead, 
  Application, 
  Tenant, 
  MaintenanceRequest, 
  AIConversation,
  RentPayment,
  MetricData,
  ChartData
} from '@/types';

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    propertyInterest: 'Oakwood Apartments - 2BR',
    source: 'Website',
    status: 'pending',
    notes: 'Interested in touring this weekend',
    dateCreated: '2025-03-15',
    nextFollowUp: '2025-03-18',
    tourScheduled: '2025-03-20',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    propertyInterest: 'Riverfront Condos - 1BR',
    source: 'Zillow',
    status: 'active',
    notes: 'Very interested in the downtown location',
    dateCreated: '2025-03-10',
    nextFollowUp: '2025-03-17',
    tourScheduled: '2025-03-19',
    assignedTo: 'Mike Brown'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    propertyInterest: 'Sunset Apartments - 3BR',
    source: 'Referral',
    status: 'completed',
    notes: 'Completed tour, seems very interested',
    dateCreated: '2025-03-05',
    nextFollowUp: '2025-03-16',
    tourScheduled: null,
    assignedTo: 'Alex Rodriguez'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '(555) 234-5678',
    propertyInterest: 'Oakwood Apartments - 1BR',
    source: 'Facebook',
    status: 'pending',
    notes: 'Looking for immediate move-in',
    dateCreated: '2025-03-12',
    nextFollowUp: '2025-03-19',
    tourScheduled: '2025-03-21',
    assignedTo: 'Emily Wilson'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 345-6789',
    propertyInterest: 'Riverfront Condos - 2BR',
    source: 'Instagram',
    status: 'active',
    notes: 'Interested in amenities and pet policy',
    dateCreated: '2025-03-08',
    nextFollowUp: '2025-03-18',
    tourScheduled: '2025-03-22',
    assignedTo: 'James Taylor'
  },
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: '1',
    leadId: '3',
    name: 'Michael Brown',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    propertyInterest: 'Sunset Apartments - 3BR',
    status: 'reviewing',
    dateSubmitted: '2025-03-12',
    backgroundCheck: 'approved',
    creditCheck: 'pending',
    incomeVerification: 'approved',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '2',
    leadId: '5',
    name: 'David Wilson',
    email: 'dwilson@example.com',
    phone: '(555) 345-6789',
    propertyInterest: 'Riverfront Condos - 2BR',
    status: 'approved',
    dateSubmitted: '2025-03-10',
    backgroundCheck: 'approved',
    creditCheck: 'approved',
    incomeVerification: 'approved',
    assignedTo: 'Mike Brown'
  },
  {
    id: '3',
    leadId: '4',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '(555) 234-5678',
    propertyInterest: 'Oakwood Apartments - 1BR',
    status: 'pending',
    dateSubmitted: '2025-03-14',
    backgroundCheck: 'pending',
    creditCheck: 'pending',
    incomeVerification: 'pending',
    assignedTo: 'Emily Wilson'
  },
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Robert Garcia',
    email: 'robert.g@example.com',
    phone: '(555) 567-8901',
    unit: 'Oakwood 101',
    leaseStart: '2025-01-15',
    leaseEnd: '2026-01-14',
    rentAmount: 1450,
    status: 'active',
    rentStatus: 'paid',
    region: 'North'
  },
  {
    id: '2',
    name: 'Jennifer Lopez',
    email: 'jlopez@example.com',
    phone: '(555) 678-9012',
    unit: 'Riverfront 205',
    leaseStart: '2025-03-01',
    leaseEnd: '2026-02-28',
    rentAmount: 1700,
    status: 'active',
    rentStatus: 'pending',
    region: 'South'
  },
  {
    id: '3',
    name: 'Thomas White',
    email: 'twhite@example.com',
    phone: '(555) 789-0123',
    unit: 'Sunset 304',
    leaseStart: '2024-11-01',
    leaseEnd: '2025-10-31',
    rentAmount: 1950,
    status: 'active',
    rentStatus: 'overdue',
    region: 'East'
  },
  {
    id: '4',
    name: 'Patricia Martinez',
    email: 'pmartinez@example.com',
    phone: '(555) 890-1234',
    unit: 'Oakwood 205',
    leaseStart: '2025-02-15',
    leaseEnd: '2026-02-14',
    rentAmount: 1500,
    status: 'active',
    rentStatus: 'paid',
    region: 'West'
  },
  {
    id: '5',
    name: 'James Taylor',
    email: 'jtaylor@example.com',
    phone: '(555) 901-2345',
    unit: 'Riverfront 110',
    leaseStart: '2025-02-01',
    leaseEnd: '2026-01-31',
    rentAmount: 1650,
    status: 'active',
    rentStatus: 'paid',
    region: 'Central'
  },
];

// Mock Maintenance Requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'Robert Garcia',
    unit: 'Oakwood 101',
    issue: 'Leaking faucet',
    description: 'The kitchen sink faucet is dripping constantly.',
    dateSubmitted: '2025-03-10T09:00:00',
    status: 'pending',
    priority: 'normal',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2025-03-18T10:30:00',
    endDate: '2025-03-18T12:30:00',
    community: 'Avila Bay',
    type: 'maintenance'
  },
  {
    id: '2',
    tenantId: '3',
    tenantName: 'Thomas White',
    unit: 'Sunset 304',
    issue: 'HVAC not cooling',
    description: 'Air conditioner is running but not cooling the apartment.',
    dateSubmitted: '2025-03-12T11:15:00',
    status: 'scheduled',
    priority: 'urgent',
    assignedTo: 'Alex Rodriguez',
    scheduledDate: '2025-03-15T09:00:00',
    endDate: '2025-03-15T11:00:00',
    community: 'Belmont',
    type: 'maintenance',
  },
  {
    id: '3',
    tenantId: '2',
    tenantName: 'Jennifer Lopez',
    unit: 'Riverfront 205',
    issue: 'Broken garbage disposal',
    description: 'Garbage disposal makes loud noise but doesn\'t work.',
    dateSubmitted: '2025-03-08T14:20:00',
    status: 'completed',
    priority: 'urgent',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2025-03-11T13:00:00',
    endDate: '2025-03-11T15:00:00',
    community: 'Preserve at Pine Grove',
    type: 'maintenance',
  },
  {
    id: '4',
    tenantId: '5',
    tenantName: 'James Taylor',
    unit: 'Riverfront 110',
    issue: 'Clogged toilet',
    description: 'Toilet in the master bathroom is clogged and won\'t flush properly.',
    dateSubmitted: '2025-03-14T08:45:00',
    status: 'pending',
    priority: 'normal',
    assignedTo: 'Mike Johnson',
    scheduledDate: '2025-03-14T09:45:00',
    endDate: '2025-03-14T11:45:00', // 1 hour duration
    community: 'Crestview at Towne Lake',
    type: 'maintenance',
  },
  {
    id: '5',
    tenantId: '4',
    tenantName: 'Patricia Martinez',
    unit: 'Oakwood 205',
    issue: 'Smoke detector beeping',
    description: 'Smoke detector is beeping intermittently, likely needs battery replacement.',
    dateSubmitted: '2025-03-13T16:30:00',
    status: 'scheduled',
    priority: 'low',
    assignedTo: 'Alex Rodriguez',
    scheduledDate: '2025-03-19T15:00:00',
    endDate: '2025-03-19T16:00:00',
    community: 'Osborne Farms',
    type: 'maintenance',
  },
];

// Mock AI Conversations
export const mockAIConversations: AIConversation[] = [
  {
    id: '1',
    relatedTo: 'lead',
    relatedId: '1',
    contactName: 'John Smith',
    contactType: 'lead',
    channel: 'voice',
    dateTime: '2025-03-15T14:30:00',
    transcript: 'AI: Hello, this is PropertyAI assistant. How can I help you today?\nJohn: I\'m interested in touring the Oakwood Apartments.\nAI: Great! We have availability this weekend. Would Saturday at 2 PM work for you?\nJohn: Yes, that works perfectly.\nAI: Excellent! I\'ve scheduled your tour for Saturday at 2 PM. You\'ll receive a confirmation email shortly. Is there anything else I can help with?',
    summary: 'Scheduled a property tour for Oakwood Apartments on Saturday at 2 PM.',
    sentiment: 'positive',
    actionItems: ['Send tour confirmation email', 'Update CRM with tour details'],
  },
  {
    id: '2',
    relatedTo: 'tenant',
    relatedId: '3',
    contactName: 'Thomas White',
    contactType: 'tenant',
    channel: 'sms',
    dateTime: '2025-03-12T10:15:00',
    transcript: 'Thomas: My AC isn\'t cooling, can someone look at it?\nAI: I\'m sorry to hear that. I can help schedule a maintenance visit. Is this an urgent matter?\nThomas: Yes, it\'s very hot in the apartment.\nAI: I understand. I\'ve created an urgent maintenance request, and a technician will contact you within 4 hours. If you don\'t hear back by 2:15 PM, please let us know.',
    summary: 'Created urgent maintenance request for AC not cooling.',
    sentiment: 'negative',
    actionItems: ['Follow up on HVAC repair', 'Check if technician contacted tenant'],
  },
  {
    id: '3',
    relatedTo: 'maintenance',
    relatedId: '3',
    contactName: 'Jennifer Lopez',
    contactType: 'tenant',
    channel: 'email',
    dateTime: '2025-03-09T16:45:00',
    transcript: 'Jennifer: I wanted to report that my garbage disposal is broken.\nAI: Thank you for reporting this issue. Can you provide any additional details about the problem?\nJennifer: It makes a loud noise but doesn\'t seem to be working properly.\nAI: I understand. I\'ve created a maintenance request for your broken garbage disposal. A technician will be scheduled to visit your unit. You\'ll receive a notification once the appointment is confirmed.',
    summary: 'Created maintenance request for broken garbage disposal.',
    sentiment: 'neutral',
    actionItems: ['Schedule maintenance appointment', 'Send confirmation when scheduled'],
  },
];

// Mock Rent Payments
export const mockRentPayments: RentPayment[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'Robert Garcia',
    unit: 'Oakwood 101',
    amount: 1450,
    dueDate: '2025-03-01',
    datePaid: '2025-03-01',
    status: 'paid',
    paymentMethod: 'bank',
  },
  {
    id: '2',
    tenantId: '2',
    tenantName: 'Jennifer Lopez',
    unit: 'Riverfront 205',
    amount: 1700,
    dueDate: '2025-03-01',
    datePaid: null,
    status: 'pending',
    paymentMethod: null,
  },
  {
    id: '3',
    tenantId: '3',
    tenantName: 'Thomas White',
    unit: 'Sunset 304',
    amount: 1950,
    dueDate: '2025-03-01',
    datePaid: null,
    status: 'overdue',
    paymentMethod: null,
  },
  {
    id: '4',
    tenantId: '4',
    tenantName: 'Patricia Martinez',
    unit: 'Oakwood 205',
    amount: 1500,
    dueDate: '2025-03-01',
    datePaid: '2025-02-28',
    status: 'paid',
    paymentMethod: 'card',
  },
  {
    id: '5',
    tenantId: '5',
    tenantName: 'James Taylor',
    unit: 'Riverfront 110',
    amount: 1650,
    dueDate: '2025-03-01',
    datePaid: '2025-02-27',
    status: 'paid',
    paymentMethod: 'bank',
  },
];

// Mock Metrics Data
export const mockDashboardMetrics: MetricData[] = [
  {
    label: 'Number of Homes',
    value: 5121,
    change: 5.2,
    status: 'increase_good',  // Growth in portfolio is good
    markets: {
      Atlanta: { value: 1850, change: 6.1, status: 'increase_good' },
      Tampa: { value: 1425, change: 4.8, status: 'increase_good' },
      Jacksonville: { value: 1021, change: 3.9, status: 'increase_good' },
      Orlando: { value: 825, change: 5.5, status: 'increase_good' }
    }
  },
  {
    label: 'Average Rent (USD)',
    value: 1868,
    change: 3.8,
    status: 'increase_good',  // Increasing rent is good for revenue
    markets: {
      Atlanta: { value: 1950, change: 4.2, status: 'increase_good' },
      Tampa: { value: 1875, change: 3.9, status: 'increase_good' },
      Jacksonville: { value: 1725, change: 3.5, status: 'increase_good' },
      Orlando: { value: 1850, change: 3.6, status: 'increase_good' }
    }
  },
  {
    label: 'Monthly Occupancy',
    value: 93.0,
    change: 0.1,
    status: 'increase_good',  // Higher occupancy is good
    markets: {
      Atlanta: { value: 93.6, change: 1.2, status: 'increase_good' },
      Tampa: { value: 92.1, change: -0.8, status: 'decrease_bad' },
      Jacksonville: { value: 92.8, change: -0.9, status: 'decrease_bad' },
      Orlando: { value: 93.4, change: 0.9, status: 'increase_good' }
    }
  },
  {
    label: 'Delinqu. (% billed rent)',
    value: 3.2,
    change: 0.0,
    status: null,  // Decreasing delinquency is good
    markets: {
      Atlanta: { value: 2.8, change: -0.2, status: 'decrease_good' },
      Tampa: { value: 3.3, change: 0.5, status: 'increase_bad' },
      Jacksonville: { value: 3.6, change: 0.2, status: 'increase_bad' },
      Orlando: { value: 3.2, change: -0.5, status: 'decrease_good' }
    }
  },
  {
    label: 'Renewals (%)',
    value: 70.2,
    change: 0.6,
    status: 'increase_good',  // Decreasing renewals is bad
    markets: {
      Atlanta: { value: 71.9, change: 1.4, status: 'increase_good' },
      Tampa: { value: 70.2, change: -1.6, status: 'decrease_bad' },
      Jacksonville: { value: 67.5, change: -1.4, status: 'decrease_bad' },
      Orlando: { value: 69.8, change: 2.6, status: 'increase_good' }
    }
  },
  {
    label: 'Rent Increase (%)',
    value: 5.8,
    change: 0.7,
    status: 'increase_good',  // Too high rent increases might lead to more move-outs
    markets: {
      Atlanta: { value: 6.2, change: 0.9, status: 'increase_good' },
      Tampa: { value: 5.9, change: 0.8, status: 'increase_good' },
      Jacksonville: { value: 5.4, change: 0.5, status: 'increase_good' },
      Orlando: { value: 5.7, change: 0.6, status: 'increase_good' }
    }
  }
];

export const mockLeadMetrics: MetricData[] = [
  {
    label: '% Renewals trend',
    value: 68.5,
    change: 4.2,
    status: 'increase_good',
    markets: {
      Atlanta: { value: 68.5, change: 4.2, status: 'increase_good' },
      Tampa: { value: 68.5, change: 4.2, status: 'increase_good' },
      Jacksonville: { value: 68.5, change: 4.2, status: 'increase_good' },
      Orlando: { value: 68.5, change: 4.2, status: 'increase_good' }
    }
  }
];

export const mockOperationMetrics: MetricData[] = [];

// Monthly data for renewals trend (last 12 months)
export const mockRenewalsTrendData = [
  { month: 'Mar 24', Atlanta: 68.4, Tampa: 71.2, Jacksonville: 69.1, Orlando: 72.3, Average: 70.2 },
  { month: 'Apr 24', Atlanta: 69.8, Tampa: 70.5, Jacksonville: 67.2, Orlando: 71.9, Average: 69.9 },
  { month: 'May 24', Atlanta: 71.5, Tampa: 68.9, Jacksonville: 66.8, Orlando: 70.4, Average: 69.4 },
  { month: 'Jun 24', Atlanta: 70.2, Tampa: 67.3, Jacksonville: 69.5, Orlando: 68.8, Average: 69.0 },
  { month: 'Jul 24', Atlanta: 67.8, Tampa: 69.1, Jacksonville: 71.2, Orlando: 66.5, Average: 68.7 },
  { month: 'Aug 24', Atlanta: 69.3, Tampa: 71.4, Jacksonville: 70.8, Orlando: 67.9, Average: 69.9 },
  { month: 'Sep 24', Atlanta: 72.1, Tampa: 70.8, Jacksonville: 68.4, Orlando: 69.5, Average: 70.2 },
  { month: 'Oct 24', Atlanta: 71.6, Tampa: 68.5, Jacksonville: 69.7, Orlando: 71.2, Average: 70.3 },
  { month: 'Nov 24', Atlanta: 69.4, Tampa: 67.2, Jacksonville: 71.5, Orlando: 70.8, Average: 69.7 },
  { month: 'Dec 24', Atlanta: 67.8, Tampa: 69.4, Jacksonville: 70.2, Orlando: 68.5, Average: 69.0 },
  { month: 'Jan 25', Atlanta: 70.5, Tampa: 71.8, Jacksonville: 68.9, Orlando: 67.2, Average: 69.6 },
  { month: 'Feb 25', Atlanta: 71.9, Tampa: 70.2, Jacksonville: 67.5, Orlando: 69.8, Average: 70.2 }
];

// Monthly data for occupancy rate trend (last 12 months)
export const mockOccupancyTrendData = [
  { month: 'Mar 24', Atlanta: 94.2, Tampa: 91.5, Jacksonville: 93.1, Orlando: 92.4, Average: 92.8 },
  { month: 'Apr 24', Atlanta: 93.8, Tampa: 92.1, Jacksonville: 92.5, Orlando: 93.2, Average: 92.9 },
  { month: 'May 24', Atlanta: 92.9, Tampa: 93.4, Jacksonville: 91.8, Orlando: 93.8, Average: 93.0 },
  { month: 'Jun 24', Atlanta: 91.7, Tampa: 93.8, Jacksonville: 92.4, Orlando: 92.9, Average: 92.7 },
  { month: 'Jul 24', Atlanta: 90.9, Tampa: 92.7, Jacksonville: 93.5, Orlando: 91.8, Average: 92.2 },
  { month: 'Aug 24', Atlanta: 91.5, Tampa: 91.9, Jacksonville: 93.8, Orlando: 92.4, Average: 92.4 },
  { month: 'Sep 24', Atlanta: 92.8, Tampa: 91.2, Jacksonville: 92.9, Orlando: 93.5, Average: 92.6 },
  { month: 'Oct 24', Atlanta: 93.5, Tampa: 92.4, Jacksonville: 91.7, Orlando: 93.9, Average: 92.9 },
  { month: 'Nov 24', Atlanta: 94.1, Tampa: 93.2, Jacksonville: 92.3, Orlando: 92.8, Average: 93.1 },
  { month: 'Dec 24', Atlanta: 93.2, Tampa: 93.8, Jacksonville: 93.1, Orlando: 91.9, Average: 93.0 },
  { month: 'Jan 25', Atlanta: 92.4, Tampa: 92.9, Jacksonville: 93.7, Orlando: 92.5, Average: 92.9 },
  { month: 'Feb 25', Atlanta: 93.6, Tampa: 92.1, Jacksonville: 92.8, Orlando: 93.4, Average: 93.0 }
];

// Monthly data for delinquency rate trend (last 12 months)
export const mockDelinquencyTrendData = [
  { month: 'Mar 24', Atlanta: 2.8, Tampa: 3.9, Jacksonville: 3.2, Orlando: 2.7, Average: 3.2 },
  { month: 'Apr 24', Atlanta: 3.1, Tampa: 3.7, Jacksonville: 2.9, Orlando: 3.4, Average: 3.3 },
  { month: 'May 24', Atlanta: 2.9, Tampa: 3.5, Jacksonville: 3.8, Orlando: 3.1, Average: 3.3 },
  { month: 'Jun 24', Atlanta: 3.4, Tampa: 3.2, Jacksonville: 3.5, Orlando: 2.8, Average: 3.2 },
  { month: 'Jul 24', Atlanta: 3.7, Tampa: 2.9, Jacksonville: 3.1, Orlando: 3.3, Average: 3.3 },
  { month: 'Aug 24', Atlanta: 3.2, Tampa: 3.1, Jacksonville: 2.8, Orlando: 3.5, Average: 3.2 },
  { month: 'Sep 24', Atlanta: 2.7, Tampa: 3.4, Jacksonville: 3.3, Orlando: 3.8, Average: 3.3 },
  { month: 'Oct 24', Atlanta: 2.9, Tampa: 3.8, Jacksonville: 3.5, Orlando: 3.2, Average: 3.4 },
  { month: 'Nov 24', Atlanta: 3.3, Tampa: 3.5, Jacksonville: 3.0, Orlando: 2.9, Average: 3.2 },
  { month: 'Dec 24', Atlanta: 3.5, Tampa: 3.1, Jacksonville: 2.8, Orlando: 3.4, Average: 3.2 },
  { month: 'Jan 25', Atlanta: 3.0, Tampa: 2.8, Jacksonville: 3.4, Orlando: 3.7, Average: 3.2 },
  { month: 'Feb 25', Atlanta: 2.8, Tampa: 3.3, Jacksonville: 3.6, Orlando: 3.2, Average: 3.2 }
];

// Define technician locations
export const technicianLocations = {
  'John D.': 'Atlanta',
  'Maria L.': 'Atlanta',
  'Roberto S.': 'Atlanta',
  'Sarah K.': 'Tampa'
};

// Keep the original flat structure but we'll filter based on technicianLocations
export const mockBillHoursTrendData = [
  { month: 'Mar 24', 'John D.': 5.8, 'Maria L.': 6.5, 'Roberto S.': 5.2, 'Sarah K.': 6.1, Average: 5.9 },
  { month: 'Apr 24', 'John D.': 5.7, 'Maria L.': 6.6, 'Roberto S.': 5.4, 'Sarah K.': 6.2, Average: 6.0 },
  { month: 'May 24', 'John D.': 6.0, 'Maria L.': 6.4, 'Roberto S.': 5.6, 'Sarah K.': 6.0, Average: 6.0 },
  { month: 'Jun 24', 'John D.': 6.2, 'Maria L.': 6.3, 'Roberto S.': 5.8, 'Sarah K.': 6.3, Average: 6.2 },
  { month: 'Jul 24', 'John D.': 6.1, 'Maria L.': 6.7, 'Roberto S.': 5.7, 'Sarah K.': 6.5, Average: 6.3 },
  { month: 'Aug 24', 'John D.': 6.3, 'Maria L.': 6.8, 'Roberto S.': 5.9, 'Sarah K.': 6.4, Average: 6.4 },
  { month: 'Sep 24', 'John D.': 6.5, 'Maria L.': 6.6, 'Roberto S.': 6.2, 'Sarah K.': 6.6, Average: 6.5 },
  { month: 'Oct 24', 'John D.': 6.4, 'Maria L.': 6.9, 'Roberto S.': 6.1, 'Sarah K.': 6.8, Average: 6.6 },
  { month: 'Nov 24', 'John D.': 6.6, 'Maria L.': 7.0, 'Roberto S.': 6.3, 'Sarah K.': 6.7, Average: 6.7 },
  { month: 'Dec 24', 'John D.': 6.8, 'Maria L.': 6.9, 'Roberto S.': 6.5, 'Sarah K.': 6.9, Average: 6.8 },
  { month: 'Jan 25', 'John D.': 6.7, 'Maria L.': 7.1, 'Roberto S.': 6.6, 'Sarah K.': 7.0, Average: 6.9 },
  { month: 'Feb 25', 'John D.': 6.9, 'Maria L.': 7.2, 'Roberto S.': 6.7, 'Sarah K.': 7.1, Average: 7.0 }
];

export const mockWorkOrdersTrendData = [
  { month: 'Mar 24', 'John D.': 7.8, 'Maria L.': 6.5, 'Roberto S.': 7.4, 'Sarah K.': 6.3, Average: 7.0 },
  { month: 'Apr 24', 'John D.': 7.6, 'Maria L.': 6.8, 'Roberto S.': 7.2, 'Sarah K.': 6.7, Average: 7.1 },
  { month: 'May 24', 'John D.': 7.9, 'Maria L.': 6.7, 'Roberto S.': 7.5, 'Sarah K.': 6.6, Average: 7.2 },
  { month: 'Jun 24', 'John D.': 7.7, 'Maria L.': 7.0, 'Roberto S.': 7.3, 'Sarah K.': 6.9, Average: 7.2 },
  { month: 'Jul 24', 'John D.': 8.0, 'Maria L.': 6.9, 'Roberto S.': 7.6, 'Sarah K.': 7.0, Average: 7.4 },
  { month: 'Aug 24', 'John D.': 7.8, 'Maria L.': 7.2, 'Roberto S.': 7.8, 'Sarah K.': 6.8, Average: 7.4 },
  { month: 'Sep 24', 'John D.': 8.2, 'Maria L.': 7.1, 'Roberto S.': 7.7, 'Sarah K.': 7.2, Average: 7.6 },
  { month: 'Oct 24', 'John D.': 8.1, 'Maria L.': 7.4, 'Roberto S.': 7.9, 'Sarah K.': 7.1, Average: 7.6 },
  { month: 'Nov 24', 'John D.': 8.3, 'Maria L.': 7.3, 'Roberto S.': 8.0, 'Sarah K.': 7.4, Average: 7.8 },
  { month: 'Dec 24', 'John D.': 8.2, 'Maria L.': 7.6, 'Roberto S.': 8.1, 'Sarah K.': 7.3, Average: 7.8 },
  { month: 'Jan 25', 'John D.': 8.4, 'Maria L.': 7.5, 'Roberto S.': 8.2, 'Sarah K.': 7.5, Average: 7.9 },
  { month: 'Feb 25', 'John D.': 8.5, 'Maria L.': 7.7, 'Roberto S.': 8.3, 'Sarah K.': 7.6, Average: 8.0 }
];

// Monthly data for leasing timeline trend (last 12 months)
export const mockLeasingTimelineTrendData = [
  { 
    month: 'Mar 24',
    Atlanta: { 'Lead to Sign': 13.8, 'Sign to Move': 16.9 },
    Tampa: { 'Lead to Sign': 14.5, 'Sign to Move': 18.2 },
    Jacksonville: { 'Lead to Sign': 14.9, 'Sign to Move': 17.6 },
    Orlando: { 'Lead to Sign': 13.6, 'Sign to Move': 18.5 },
    Average: { 'Lead to Sign': 14.2, 'Sign to Move': 17.8 }
  },
  { 
    month: 'Apr 24',
    Atlanta: { 'Lead to Sign': 15.2, 'Sign to Move': 15.8 },
    Tampa: { 'Lead to Sign': 16.4, 'Sign to Move': 16.5 },
    Jacksonville: { 'Lead to Sign': 16.1, 'Sign to Move': 16.9 },
    Orlando: { 'Lead to Sign': 15.9, 'Sign to Move': 16.0 },
    Average: { 'Lead to Sign': 15.9, 'Sign to Move': 16.3 }
  },
  { 
    month: 'May 24',
    Atlanta: { 'Lead to Sign': 16.8, 'Sign to Move': 15.5 },
    Tampa: { 'Lead to Sign': 17.3, 'Sign to Move': 16.1 },
    Jacksonville: { 'Lead to Sign': 17.5, 'Sign to Move': 15.8 },
    Orlando: { 'Lead to Sign': 16.8, 'Sign to Move': 16.2 },
    Average: { 'Lead to Sign': 17.1, 'Sign to Move': 15.9 }
  },
  { 
    month: 'Jun 24',
    Atlanta: { 'Lead to Sign': 16.1, 'Sign to Move': 14.5 },
    Tampa: { 'Lead to Sign': 16.7, 'Sign to Move': 14.9 },
    Jacksonville: { 'Lead to Sign': 16.5, 'Sign to Move': 15.1 },
    Orlando: { 'Lead to Sign': 16.3, 'Sign to Move': 14.7 },
    Average: { 'Lead to Sign': 16.4, 'Sign to Move': 14.8 }
  },
  { 
    month: 'Jul 24',
    Atlanta: { 'Lead to Sign': 14.9, 'Sign to Move': 16.4 },
    Tampa: { 'Lead to Sign': 15.4, 'Sign to Move': 16.8 },
    Jacksonville: { 'Lead to Sign': 15.6, 'Sign to Move': 16.9 },
    Orlando: { 'Lead to Sign': 14.9, 'Sign to Move': 16.7 },
    Average: { 'Lead to Sign': 15.2, 'Sign to Move': 16.7 }
  },
  { 
    month: 'Aug 24',
    Atlanta: { 'Lead to Sign': 14.5, 'Sign to Move': 17.0 },
    Tampa: { 'Lead to Sign': 15.1, 'Sign to Move': 17.3 },
    Jacksonville: { 'Lead to Sign': 14.8, 'Sign to Move': 17.4 },
    Orlando: { 'Lead to Sign': 14.8, 'Sign to Move': 17.1 },
    Average: { 'Lead to Sign': 14.8, 'Sign to Move': 17.2 }
  },
  { 
    month: 'Sep 24',
    Atlanta: { 'Lead to Sign': 16.4, 'Sign to Move': 15.2 },
    Tampa: { 'Lead to Sign': 16.9, 'Sign to Move': 15.5 },
    Jacksonville: { 'Lead to Sign': 16.8, 'Sign to Move': 15.6 },
    Orlando: { 'Lead to Sign': 16.7, 'Sign to Move': 15.3 },
    Average: { 'Lead to Sign': 16.7, 'Sign to Move': 15.4 }
  },
  { 
    month: 'Oct 24',
    Atlanta: { 'Lead to Sign': 17.0, 'Sign to Move': 14.6 },
    Tampa: { 'Lead to Sign': 17.5, 'Sign to Move': 15.1 },
    Jacksonville: { 'Lead to Sign': 17.4, 'Sign to Move': 15.0 },
    Orlando: { 'Lead to Sign': 17.3, 'Sign to Move': 14.9 },
    Average: { 'Lead to Sign': 17.3, 'Sign to Move': 14.9 }
  },
  { 
    month: 'Nov 24',
    Atlanta: { 'Lead to Sign': 15.5, 'Sign to Move': 16.5 },
    Tampa: { 'Lead to Sign': 16.0, 'Sign to Move': 17.0 },
    Jacksonville: { 'Lead to Sign': 15.9, 'Sign to Move': 16.9 },
    Orlando: { 'Lead to Sign': 15.8, 'Sign to Move': 16.8 },
    Average: { 'Lead to Sign': 15.8, 'Sign to Move': 16.8 }
  },
  { 
    month: 'Dec 24',
    Atlanta: { 'Lead to Sign': 14.2, 'Sign to Move': 17.2 },
    Tampa: { 'Lead to Sign': 14.7, 'Sign to Move': 17.7 },
    Jacksonville: { 'Lead to Sign': 14.6, 'Sign to Move': 17.6 },
    Orlando: { 'Lead to Sign': 14.5, 'Sign to Move': 17.5 },
    Average: { 'Lead to Sign': 14.5, 'Sign to Move': 17.5 }
  },
  { 
    month: 'Jan 25',
    Atlanta: { 'Lead to Sign': 15.8, 'Sign to Move': 15.2 },
    Tampa: { 'Lead to Sign': 16.5, 'Sign to Move': 15.9 },
    Jacksonville: { 'Lead to Sign': 16.3, 'Sign to Move': 16.1 },
    Orlando: { 'Lead to Sign': 16.2, 'Sign to Move': 15.6 },
    Average: { 'Lead to Sign': 16.2, 'Sign to Move': 15.7 }
  },
  { 
    month: 'Feb 25',
    Atlanta: { 'Lead to Sign': 17.1, 'Sign to Move': 14.8 },
    Tampa: { 'Lead to Sign': 17.6, 'Sign to Move': 15.3 },
    Jacksonville: { 'Lead to Sign': 17.5, 'Sign to Move': 15.2 },
    Orlando: { 'Lead to Sign': 17.4, 'Sign to Move': 15.1 },
    Average: { 'Lead to Sign': 17.4, 'Sign to Move': 15.1 }
  }
];

export const mockOccupancyData: ChartData[] = [
  { name: 'Atlanta', value: 95.2 },
  { name: 'Tampa', value: 93.8 },
  { name: 'Jacksonville', value: 92.5 },
  { name: 'Orlando', value: 94.7 }
];

export const mockDelinquencyData: ChartData[] = [
  { name: 'Atlanta', value: 2.1 },
  { name: 'Tampa', value: 2.4 },
  { name: 'Jacksonville', value: 2.6 },
  { name: 'Orlando', value: 2.2 }
];

export const mockBillHoursData: ChartData[] = [
  { name: 'John D.', value: 6.8 },
  { name: 'Maria L.', value: 7.2 },
  { name: 'Roberto S.', value: 6.5 },
  { name: 'Sarah K.', value: 7.0 }
];

export const mockWorkOrdersData: ChartData[] = [
  { name: 'John D.', value: 8.5 },
  { name: 'Maria L.', value: 7.8 },
  { name: 'Roberto S.', value: 8.2 },
  { name: 'Sarah K.', value: 7.5 }
];
