import { Lead, Application } from '@/types';

// Define Emily Wilson (corrected from Watson in the prompt) as the current leasing agent
export const CURRENT_LEASING_AGENT = "Emily Wilson";

// Helper to generate today's date string in ISO format
const todayISO = new Date().toISOString().split('T')[0];

// Generate a datetime string for today at a specified hour and minute
const getTodayAt = (hour: number, minute: number = 0): string => {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

// Mock data for leasing agent leads
export const mockLeasingAgentLeads: Lead[] = [
  // Emily Wilson's leads in Tampa
  {
    id: "lead-tampa-101",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(813) 555-1234",
    propertyInterest: "2 Bedroom Deluxe",
    unitInterest: "B204",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Avila Bay",
    assignedTo: "Emily Wilson",
    status: "new",
    source: "Website",
    lastContact: getTodayAt(9, 15)
  },
  {
    id: "lead-tampa-102",
    name: "Mark Davis",
    email: "mark.davis@example.com",
    phone: "(813) 555-2345",
    propertyInterest: "1 Bedroom Studio",
    unitInterest: "A105",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Belmont",
    assignedTo: "Emily Wilson",
    status: "contacted",
    lastContact: getTodayAt(10, 30)
  },
  {
    id: "lead-tampa-103",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@example.com",
    phone: "(813) 555-3456",
    propertyInterest: "3 Bedroom Penthouse",
    unitInterest: "P301",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Avila Bay",
    assignedTo: "Emily Wilson",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(13, 0), // 1:00 PM today
    notes: "Client is very interested in the bay view units."
  },
  {
    id: "lead-tampa-104",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "(813) 555-4567",
    propertyInterest: "2 Bedroom Standard",
    unitInterest: "B110",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Belmont",
    assignedTo: "Emily Wilson",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(15, 30), // 3:30 PM today
    notes: "Looking for pet-friendly options. Has a golden retriever."
  },
  {
    id: "lead-tampa-105",
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    phone: "(813) 555-5678",
    propertyInterest: "1 Bedroom Deluxe",
    unitInterest: "A210",
    dateCreated: todayISO,
    market: "Tampa",
    community: "Preserve at Pine Grove",
    assignedTo: "Emily Wilson",
    status: "application_sent",
    lastContact: getTodayAt(11, 15)
  },
  {
    id: "lead-tampa-106",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "(813) 555-6789",
    propertyInterest: "2 Bedroom Deluxe",
    unitInterest: "B205",
    dateCreated: "2023-06-08",
    market: "Tampa",
    community: "Avila Bay",
    assignedTo: "Emily Wilson",
    status: "application_received",
    lastContact: "2023-06-10T09:30:00Z"
  },
  // Other leasing agents' leads
  {
    id: "lead-atlanta-201",
    name: "Thomas Clark",
    email: "thomas.clark@example.com",
    phone: "(404) 555-1234",
    propertyInterest: "2 Bedroom Standard",
    unitInterest: "B102",
    dateCreated: todayISO,
    market: "Atlanta",
    community: "Osborne Farms",
    assignedTo: "John Smith",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(11, 0) // 11:00 AM today
  },
  {
    id: "lead-atlanta-202",
    name: "Patricia Lee",
    email: "patricia.lee@example.com",
    phone: "(404) 555-2345",
    propertyInterest: "3 Bedroom Standard",
    unitInterest: "C103",
    dateCreated: todayISO,
    market: "Atlanta",
    community: "Suwanee Square",
    assignedTo: "John Smith",
    status: "new",
    lastContact: getTodayAt(8, 45)
  },
  {
    id: "lead-jacksonville-301",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "(904) 555-1234",
    propertyInterest: "1 Bedroom Studio",
    unitInterest: "A101",
    dateCreated: todayISO,
    market: "Jacksonville",
    community: "Sawyer's Preserve",
    assignedTo: "Lisa Johnson",
    status: "tour_scheduled",
    tourScheduled: todayISO,
    tourDateTime: getTodayAt(14, 15) // 2:15 PM today
  }
];

// Mock data for applications
export const mockLeasingApplications: Application[] = [
  {
    id: "app-tampa-101",
    applicantName: "David Brown",
    email: "david.brown@example.com",
    phone: "(813) 555-6789",
    unitType: "2 Bedroom Deluxe",
    dateSubmitted: "2023-06-10",
    status: "pending",
    assignedTo: "Emily Wilson",
    propertyInterest: "Avila Bay",
    backgroundCheck: {
      status: "pending",
      score: undefined
    },
    creditCheck: {
      status: "pending",
      score: undefined
    },
    incomeVerification: {
      status: "pending",
      verified: false
    },
    leadId: "lead-tampa-106"
  },
  {
    id: "app-tampa-102",
    applicantName: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    phone: "(813) 555-7890",
    unitType: "1 Bedroom Standard",
    dateSubmitted: "2023-06-08",
    status: "reviewing",
    assignedTo: "Emily Wilson",
    propertyInterest: "Belmont",
    backgroundCheck: {
      status: "completed",
      score: 85
    },
    creditCheck: {
      status: "completed",
      score: 720
    },
    incomeVerification: {
      status: "pending",
      verified: false
    }
  },
  {
    id: "app-tampa-103",
    applicantName: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "(813) 555-8901",
    unitType: "3 Bedroom Standard",
    dateSubmitted: "2023-06-05",
    status: "approved",
    assignedTo: "Emily Wilson",
    propertyInterest: "Preserve at Pine Grove",
    backgroundCheck: {
      status: "completed",
      score: 90
    },
    creditCheck: {
      status: "completed",
      score: 780
    },
    incomeVerification: {
      status: "completed",
      verified: true
    }
  },
  {
    id: "app-tampa-104",
    applicantName: "Christopher Davis",
    email: "christopher.davis@example.com",
    phone: "(813) 555-9012",
    unitType: "2 Bedroom Standard",
    dateSubmitted: "2023-06-02",
    status: "denied",
    assignedTo: "Emily Wilson",
    propertyInterest: "Avila Bay",
    backgroundCheck: {
      status: "completed",
      score: 65
    },
    creditCheck: {
      status: "completed",
      score: 580
    },
    incomeVerification: {
      status: "completed",
      verified: false
    }
  }
];
