
import React, { useState } from 'react';
import AIAgentConsole from '@/components/communications/AIAgentConsole';
import CommunicationsAnalytics from '@/components/communications/CommunicationsAnalytics';
import { mockAIConversations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Mail, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const SCENARIO_OPTIONS = [
  { value: 'all', label: 'All Scenarios' },
  { value: 'leasing', label: 'Leasing' },
  { value: 'lead', label: 'Leasing/Lead Interaction' },
  { value: 'application', label: 'Leasing/Application Support' },
  { value: 'signing', label: 'Leasing/Lease Signing' },
  { value: 'premove', label: 'Leasing/Pre-Move-in Prep' },
  { value: 'onboarding', label: 'Leasing/Tenant Onboarding' },
  { value: 'operations', label: 'Operations' },
  { value: 'rent', label: 'Operations/Rent Collection' },
  { value: 'renewal', label: 'Operations/Lease Renewals' },
  { value: 'moveout-notice', label: 'Operations/Move-Out Notices' },
  { value: 'moveout-coordination', label: 'Operations/Move-Out Coordination' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'request', label: 'Maintenance/Maintenance Requests' },
  { value: 'workorder', label: 'Maintenance/Work Order Triage' },
  { value: 'scheduling', label: 'Maintenance/Maintenance Scheduling' },
  { value: 'relationship', label: 'Maintenance/Tenant Relationship' }
];

const COMMUNICATION_TYPES = [
  { value: 'all', label: 'All Communications' },
  { value: 'voice', label: 'Voice', icon: Phone },
  { value: 'sms', label: 'Text Message', icon: MessageSquare },
  { value: 'email', label: 'Email', icon: Mail }
];

const Communications = () => {
  const [scenarioFilter, setScenarioFilter] = useState('all');
  const [commTypeFilter, setCommTypeFilter] = useState('all');
  
  // Filter conversations based on selected filters
  const filteredConversations = mockAIConversations.filter(conversation => {
    // Filter by scenario
    if (scenarioFilter !== 'all' && !conversation.scenario?.includes(scenarioFilter)) {
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
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>AI Agent Activity</CardTitle>
          
          <div className="flex gap-2 items-center">
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
            <Select value={scenarioFilter} onValueChange={setScenarioFilter}>
              <SelectTrigger className="w-[220px] h-8">
                <SelectValue placeholder="All Scenarios" />
              </SelectTrigger>
              <SelectContent>
                {SCENARIO_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
