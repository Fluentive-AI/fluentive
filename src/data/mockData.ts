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
    contactName: 'John Smith',
    channel: 'voice' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-12T14:30:00',
    summary: 'Inquired about 2-bedroom apartment availability and pricing at Riverside Apartments.',
    transcript: `AI: Hello, thank you for calling PropertyAI. How can I assist you today?
John: Hi, I'm looking for information about the 2 bedroom apartments at Riverside.
AI: I'd be happy to help you with that. We do have 2-bedroom apartments available at Riverside Apartments. The units start at $1,850 per month for a standard 2-bedroom and go up to $2,200 for a deluxe unit with a view. Would you like to know more specific details about the layouts or amenities?
John: Yes, could you tell me about the amenities?
AI: Of course. Riverside Apartments offers a fitness center, swimming pool, covered parking, in-unit washer and dryer, pet-friendly units with a dog park, 24-hour maintenance, and a clubhouse with a business center. All units have updated kitchens with stainless steel appliances and quartz countertops. Would you be interested in scheduling a tour to see the property?
John: That sounds good. Do you have any availability next weekend?
AI: Let me check our calendar. Yes, we have tour slots available next Saturday at 10:00 AM, 1:00 PM, and 3:00 PM, or Sunday at 1:00 PM and 3:00 PM. Would any of those times work for you?
John: Saturday at 1 PM would be perfect.
AI: Great! I'll schedule you for a tour this Saturday at 1:00 PM. Could I get your full name, email, and phone number to confirm the appointment?
John: John Smith, john.smith@email.com, and my phone is 555-123-4567.
AI: Thank you, John. I've scheduled your tour for Saturday, March 15th at 1:00 PM at Riverside Apartments. You'll receive a confirmation email shortly with the details and directions to the property. Is there anything else I can help you with today?
John: No, that's all. Thank you!
AI: You're welcome, John. We look forward to seeing you on Saturday. Feel free to call back if you have any other questions. Have a great day!`,
    sentiment: 'positive',
    actionItems: [
      'Schedule tour for Saturday, March 15th at 1:00 PM',
      'Send confirmation email with property details',
      'Add to CRM for follow-up'
    ],
    scenario: 'leasing/lead'
  },
  {
    id: '2',
    contactName: 'Jennifer Lee',
    channel: 'email' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-11T09:15:00',
    summary: 'Requested information about application process and required documentation for Maple Ridge townhomes.',
    transcript: `AI: Hello Jennifer, thank you for your inquiry about the application process for Maple Ridge townhomes. I'm happy to provide you with the information you need.
Jennifer: Hi, I'm interested in applying for a townhome at Maple Ridge. What documents do I need to prepare and what is the application fee?
AI: For the Maple Ridge townhomes application, you'll need to provide the following documents: government-issued ID, proof of income (last 3 pay stubs or offer letter), last 2 months of bank statements, and contact information for previous landlords. The application fee is $50 per applicant, and there's a $150 administrative fee if approved. Would you like me to send you the online application link?
Jennifer: Yes, please send me the link. How long does the approval process take?
AI: I've sent the application link to your email. The approval process typically takes 2-3 business days from the time we receive your completed application and all required documents. We'll run a credit and background check, verify your employment and rental history. Is there a specific move-in date you're considering?
Jennifer: I'm hoping to move in by April 1st if possible.
AI: Thank you for sharing your preferred move-in date. Based on our current availability, we do have units that would be ready for an April 1st move-in. Once your application is approved, we can work to secure one of those units for you. Is there anything specific you're looking for in terms of floor plan or location within the community?
Jennifer: I'd prefer a 2-bedroom with a garage if available.
AI: We do have 2-bedroom townhomes with attached garages available for April 1st move-in. They're 1,250 square feet with 2.5 bathrooms and start at $2,100 per month. I've updated your profile with this preference. Is there anything else you'd like to know about the application process or the property?
Jennifer: That's all for now, thank you for your help!
AI: You're welcome, Jennifer! If you have any questions while completing your application, please don't hesitate to reach out. We look forward to receiving your application and hopefully welcoming you to Maple Ridge soon. Have a great day!`,
    sentiment: 'positive',
    actionItems: [
      'Send application link via email',
      'Update CRM with preference for 2-bedroom with garage',
      'Follow up in 2 days if application not received'
    ],
    scenario: 'operations/renewal'
  },
  {
    id: '3',
    contactName: 'Thomas Wilson',
    channel: 'sms' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-10T16:45:00',
    summary: 'Maintenance request for leaking faucet in master bathroom. Scheduled repair for tomorrow between 1-3 PM.',
    transcript: `AI: Hello! This is PropertyAI from Oakwood Apartments. How can I assist you today?
Thomas: Hi, the faucet in my master bathroom is leaking and getting worse.
AI: I'm sorry to hear about the leaking faucet. I'd be happy to help get that fixed for you. Could you please confirm your apartment number so I can create a maintenance request?
Thomas: It's apartment 304.
AI: Thank you for confirming, Mr. Wilson in apartment 304. I've created a maintenance request for the leaking faucet in your master bathroom. Our maintenance team has availability tomorrow between 9-11 AM or 1-3 PM. Would either of those time slots work for you?
Thomas: 1-3 PM works better for me.
AI: Perfect. I've scheduled the maintenance visit for tomorrow between 1-3 PM. Our technician will call about 15 minutes before arriving. Is there anything else about the issue that would be helpful for our maintenance team to know?
Thomas: No, it's just a constant drip that's getting faster.
AI: Thank you for that information. I've added those details to the work order. You'll receive a confirmation text with the scheduled time, and another notification when the work is complete. Is there anything else I can assist you with today?
Thomas: No that's it, thanks!
AI: You're welcome! If you need anything else, feel free to text us anytime. Have a great day!`,
    sentiment: 'neutral',
    actionItems: [
      'Create maintenance work order for leaking faucet',
      'Schedule repair for tomorrow 1-3 PM',
      'Send confirmation text with scheduled time'
    ],
    scenario: 'maintenance/maintenance-requests'
  },
  {
    id: '4',
    contactName: 'Sarah Johnson',
    channel: 'voice' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-09T13:20:00',
    summary: 'Discussed lease renewal options and negotiated a 14-month lease with $50 rent increase instead of the standard $100 increase.',
    transcript: `AI: Hello, thank you for calling PropertyAI. How can I assist you today?
Sarah: Hi, this is Sarah Johnson from apartment 512. I received a lease renewal notice and wanted to discuss the options.
AI: Hello Ms. Johnson, I'd be happy to discuss your lease renewal options. I see your current lease for apartment 512 at Parkview Apartments is set to expire on April 30th, 2025. We're offering a 12-month renewal with a $100 monthly increase, or a 6-month renewal with a $150 monthly increase. Which option were you considering?
Sarah: The $100 increase seems high. I've been a good tenant for two years now. Is there any way to reduce that?
AI: I understand your concern about the increase, Ms. Johnson. You're right that you've been a valued resident for two years with on-time payments and no issues. Based on your good standing, I could offer you a 14-month lease with only a $50 monthly increase. Would that be more agreeable?
Sarah: That sounds much better. I'd be interested in the 14-month option.
AI: Excellent. I'll prepare the 14-month lease renewal with the $50 monthly increase. Your new lease would run from May 1st, 2025 to June 30th, 2026, and your new monthly rent would be $1,750. I can send the renewal documents to your email for electronic signature. Is the email we have on file still current?
Sarah: Yes, my email is still the same.
AI: Perfect. I'll send the lease renewal documents to your email today. You'll have until March 25th to review and sign them. Is there anything else you'd like to discuss about your renewal or any questions about the process?
Sarah: No, that covers everything. Thank you for working with me on the price.
AI: You're very welcome, Ms. Johnson. We value you as a resident and appreciate your continued residency at Parkview Apartments. You should receive the renewal documents in your email within the next hour. Please don't hesitate to call if you have any questions after reviewing them. Have a wonderful day!`,
    sentiment: 'positive',
    actionItems: [
      'Prepare 14-month lease renewal with $50 increase',
      'Send renewal documents for electronic signature',
      'Update CRM with negotiated terms'
    ],
    scenario: 'operations/renewal'
  },
  {
    id: '5',
    contactName: 'Michael Chen',
    channel: 'voice' as 'voice' | 'sms' | 'email',
    dateTime: '2025-03-08T11:10:00',
    summary: 'Provided move-out instructions and scheduled final inspection for March 31st at 10:00 AM.',
    transcript: `AI: Hello, thank you for calling PropertyAI. How can I assist you today?
Michael: Hi, I need information about moving out. My lease ends next month.
AI: I'd be happy to help you with the move-out process. Could you please provide your name and apartment number so I can pull up your information?
Michael: Michael Chen, apartment 721.
AI: Thank you, Mr. Chen. I see that your lease for apartment 721 at Lakeside Apartments is set to end on March 31st, 2025. To ensure a smooth move-out process, I'd like to go over some important details with you. First, would you like to schedule your final inspection?
Michael: Yes, that would be helpful.
AI: We have availability on March 31st at 10:00 AM, 1:00 PM, or 4:00 PM for the final inspection. Would any of those times work for you?
Michael: 10:00 AM works best.
AI: Great, I've scheduled your final inspection for March 31st at 10:00 AM. Please ensure all your belongings are removed before this time. For a full refund of your security deposit, the apartment should be cleaned according to our move-out checklist, which I'll email to you. This includes cleaning appliances, floors, bathrooms, and walls. All keys, fobs, and parking permits must be returned at the final inspection. Do you have any questions about the cleaning requirements?
Michael: No, but when will I receive my security deposit back?
AI: Your security deposit will be processed within 30 days of your move-out date, assuming there are no damages beyond normal wear and tear. We'll mail the refund to your forwarding address. Could you please provide your forwarding address where we should send your security deposit?
Michael: Yes, it's 835 Pine Street, Apt 205, Westlake, CA 90210.
AI: Thank you. I've noted your forwarding address as 835 Pine Street, Apt 205, Westlake, CA 90210. I'll send you an email confirmation of your final inspection appointment and the move-out checklist. Is there anything else I can assist you with regarding your move-out?
Michael: That's all for now, thanks.
AI: You're welcome, Mr. Chen. If you have any other questions before your move-out date, please don't hesitate to contact us. We wish you all the best in your new home. Have a great day!`,
    sentiment: 'neutral',
    actionItems: [
      'Schedule final inspection for March 31st at 10:00 AM',
      'Send move-out checklist via email',
      'Update system with forwarding address'
    ],
    scenario: 'operations/moveout-notice'
  }
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
