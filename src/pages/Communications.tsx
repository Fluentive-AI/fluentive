
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

const SCENARIO_CATEGORIES = [
  {
    name: 'Leasing',
    options: [
      { value: 'leasing/lead', label: 'Leasing/Lead Interaction' },
      { value: 'leasing/application', label: 'Leasing/Application Support' },
      { value: 'leasing/signing', label: 'Leasing/Lease Signing' },
      { value: 'leasing/premove', label: 'Leasing/Pre-Move-in Prep' },
      { value: 'leasing/onboarding', label: 'Leasing/Tenant Onboarding' },
    ]
  },
  {
    name: 'Operations',
    options: [
      { value: 'operations/rent', label: 'Operations/Rent Collection' },
      { value: 'operations/renewal', label: 'Operations/Lease Renewals' },
      { value: 'operations/moveout-notice', label: 'Operations/Move-Out Notices' },
      { value: 'operations/moveout-coordination', label: 'Operations/Move-Out Coordination' },
    ]
  },
  {
    name: 'Maintenance',
    options: [
      { value: 'maintenance/request', label: 'Maintenance/Maintenance Requests' },
      { value: 'maintenance/workorder', label: 'Maintenance/Work Order Triage' },
      { value: 'maintenance/scheduling', label: 'Maintenance/Maintenance Scheduling' },
      { value: 'maintenance/relationship', label: 'Maintenance/Tenant Relationship' }
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
  const [commTypeFilter, setCommTypeFilter] = useState('all');
  
  // Filter conversations based on selected filters
  const filteredConversations = mockAIConversations.filter(conversation => {
    // Filter by scenario
    if (selectedScenarios.length > 0 && (!conversation.scenario || !selectedScenarios.includes(conversation.scenario))) {
      return false;
    }
    
    // Filter by communication type
    if (commTypeFilter !== 'all' && conversation.channel !== commTypeFilter) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Communications</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Text
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between flex-wrap gap-3">
          <CardTitle>AI Agent Activity</CardTitle>
          
          <div className="flex gap-2 items-center flex-wrap">
            {/* Communication Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-2" />
                  {COMMUNICATION_TYPES.find(t => t.value === commTypeFilter)?.label || 'All Communications'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {COMMUNICATION_TYPES.map(type => (
                  <DropdownMenuItem key={type.value} onClick={() => setCommTypeFilter(type.value)}>
                    {type.icon && <type.icon className="h-4 w-4 mr-2" />}
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Scenario Filter */}
            <ScenarioFilter 
              options={SCENARIO_CATEGORIES}
              selectedValues={selectedScenarios}
              onChange={setSelectedScenarios}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="console">
            <TabsList className="mb-4">
              <TabsTrigger value="console">Agent Console</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="console">
              <AIAgentConsole conversations={filteredConversations} />
            </TabsContent>
            
            <TabsContent value="analytics">
              <CommunicationsAnalytics conversations={filteredConversations} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Communications;
