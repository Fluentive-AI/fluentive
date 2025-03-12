import React, { useState } from 'react';
import AIAgentConsole from '@/components/communications/AIAgentConsole';
import CommunicationsAnalytics from '@/components/communications/CommunicationsAnalytics';
import { mockAIConversations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Mail, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScenarioFilter from '@/components/communications/ScenarioFilter';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import CommunicationTypeFilter from '@/components/communications/CommunicationTypeFilter';

const SCENARIO_CATEGORIES = [
  {
    name: 'Leasing',
    options: [
      { value: 'leasing/lead', label: 'Lead Interaction' },
      { value: 'leasing/application', label: 'Application Support' },
      { value: 'leasing/signing', label: 'Lease Signing' },
      { value: 'leasing/premove', label: 'Pre-Move-in Prep' },
      { value: 'leasing/onboarding', label: 'Tenant Onboarding' },
    ]
  },
  {
    name: 'Operations',
    options: [
      { value: 'operations/rent', label: 'Rent Collection' },
      { value: 'operations/renewal', label: 'Lease Renewals' },
      { value: 'operations/moveout-notice', label: 'Move-Out Notices' },
      { value: 'operations/moveout-coordination', label: 'Move-Out Coordination' },
    ]
  },
  {
    name: 'Maintenance',
    options: [
      { value: 'maintenance/maintenance-requests', label: 'Maintenance Requests' },
      { value: 'maintenance/workorder', label: 'Work Order Triage' },
      { value: 'maintenance/scheduling', label: 'Maintenance Scheduling' },
      { value: 'maintenance/relationship', label: 'Tenant Relationship' }
    ]
  }
];

const COMMUNICATION_TYPES = [
  { value: 'all', label: 'All Communications' },
  { value: 'voice', label: 'Voice', icon: Phone },
  { value: 'sms', label: 'Text Message', icon: MessageSquare },
  { value: 'email', label: 'Email', icon: Mail }
];

const Communications = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [selectedCommTypes, setSelectedCommTypes] = useState<string[]>([]);
  
  console.log('Selected scenario value:', selectedScenarios[0]);
  console.log('All scenario options:', SCENARIO_CATEGORIES.map(cat => 
    cat.options.map(opt => opt.value)
  ).flat());

  // Filter conversations based on selected filters
  const filteredConversations = mockAIConversations.filter(conversation => {
    // Filter by scenario
    if (selectedScenarios.length > 0) {
      const matchesScenario = selectedScenarios.some(selectedScenario => 
        conversation.scenario?.toLowerCase().includes(selectedScenario.toLowerCase())
      );
      if (!matchesScenario) return false;
    }
    
    // Filter by communication type
    if (selectedCommTypes.length > 0 && !selectedCommTypes.includes(conversation.channel)) {
      return false;
    }
    
    return true;
  });

  console.log('Filtered conversations:', filteredConversations);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Agent Activity</h1>

      </div>
      
      <Card>
        <Tabs defaultValue="console" className="w-full">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <TabsList>
                <TabsTrigger value="console">Agent Console</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap gap-2 items-center">
                {/* Communication Type Filter */}
                <CommunicationTypeFilter 
                  selectedValues={selectedCommTypes}
                  onChange={setSelectedCommTypes}
                />
                
                {/* Scenario Filter */}
                <ScenarioFilter 
                  options={SCENARIO_CATEGORIES}
                  selectedValues={selectedScenarios}
                  onChange={setSelectedScenarios}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            <TabsContent value="console" className="overflow-hidden">
              <AIAgentConsole conversations={filteredConversations} />
            </TabsContent>
            
            <TabsContent value="analytics" className="overflow-hidden">
              <CommunicationsAnalytics conversations={filteredConversations} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Communications;
