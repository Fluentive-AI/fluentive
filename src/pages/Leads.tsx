import React, { useState } from 'react';
import LeadsTable from '@/components/leads/LeadsTable';
import { mockLeads } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText, BarChart, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import StatusFilter from '@/components/leads/StatusFilter';
import AgentFilter from '@/components/leads/AgentFilter';

const Leads = () => {
  // State for All Leads tab
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // State for Initial Contact tab
  const [initialAgents, setInitialAgents] = useState<string[]>([]);
  const [initialMarketCommunities, setInitialMarketCommunities] = useState<string[]>([]);
  
  // State for Tour Scheduled tab
  const [scheduledAgents, setScheduledAgents] = useState<string[]>([]);
  const [scheduledMarketCommunities, setScheduledMarketCommunities] = useState<string[]>([]);
  
  // State for Completed Application tab
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [completedMarketCommunities, setCompletedMarketCommunities] = useState<string[]>([]);
  
  // State for Lease Signed tab
  const [signedAgents, setSignedAgents] = useState<string[]>([]);
  const [signedMarketCommunities, setSignedMarketCommunities] = useState<string[]>([]);
  
  // State for Onboarded tab
  const [onboardedAgents, setOnboardedAgents] = useState<string[]>([]);
  const [onboardedMarketCommunities, setOnboardedMarketCommunities] = useState<string[]>([]);

  const leasingAgents = [...new Set(mockLeads.map(lead => lead.assignedTo))];

  // Filter functions for each tab
  const filteredLeads = mockLeads.filter(lead => {
    if (selectedAgents.length > 0 && !selectedAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(lead.status)) {
      return false;
    }
    if (selectedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!selectedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  });

  const initialLeads = mockLeads.filter(lead => {
    if (lead.status !== 'pending') return false;
    if (initialAgents.length > 0 && !initialAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (initialMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!initialMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  });

  const scheduledLeads = mockLeads.filter(lead => {
    if (lead.status !== 'scheduled') return false;
    if (scheduledAgents.length > 0 && !scheduledAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (scheduledMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!scheduledMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  });

  const completedLeads = mockLeads.filter(lead => {
    if (lead.status !== 'completed') return false;
    if (completedAgents.length > 0 && !completedAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (completedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!completedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  });

  const signedLeads = mockLeads.filter(lead => {
    if (lead.status !== 'approved') return false;
    if (signedAgents.length > 0 && !signedAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (signedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!signedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  });

  const onboardedLeads = mockLeads.filter(lead => {
    if (lead.status !== 'active') return false;
    if (onboardedAgents.length > 0 && !onboardedAgents.includes(lead.assignedTo)) {
      return false;
    }
    if (onboardedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!onboardedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads & Tours</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="leads">
        <TabsList className="mb-6">
          <TabsTrigger value="leads">All Leads</TabsTrigger>
          <TabsTrigger value="initial">Initial Contact</TabsTrigger>
          <TabsTrigger value="scheduled">Tour Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed Application</TabsTrigger>
          <TabsTrigger value="signed">Lease Signed</TabsTrigger>
          <TabsTrigger value="onboarded">Onboarded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle>Current Leads</CardTitle>
              
              <div className="flex gap-4">
                <AgentFilter 
                  agents={leasingAgents}
                  selectedValues={selectedAgents}
                  onChange={setSelectedAgents}
                />
                
                <MarketCommunityFilter 
                  selectedValues={selectedMarketCommunities}
                  onChange={setSelectedMarketCommunities}
                />
                
                <StatusFilter
                  selectedValues={selectedStatuses}
                  onChange={setSelectedStatuses}
                />
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={filteredLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="initial">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle>Initial Contact Leads</CardTitle>
              
              <div className="flex gap-4">
                <AgentFilter 
                  agents={leasingAgents}
                  selectedValues={initialAgents}
                  onChange={setInitialAgents}
                />
                
                <MarketCommunityFilter 
                  selectedValues={initialMarketCommunities}
                  onChange={setInitialMarketCommunities}
                />
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={initialLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle>Tour Scheduled Leads</CardTitle>
              
              <div className="flex gap-4">
                <AgentFilter 
                  agents={leasingAgents}
                  selectedValues={scheduledAgents}
                  onChange={setScheduledAgents}
                />
                
                <MarketCommunityFilter 
                  selectedValues={scheduledMarketCommunities}
                  onChange={setScheduledMarketCommunities}
                />
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={scheduledLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle>Completed Application Leads</CardTitle>
              
              <div className="flex gap-4">
                <AgentFilter 
                  agents={leasingAgents}
                  selectedValues={completedAgents}
                  onChange={setCompletedAgents}
                />
                
                <MarketCommunityFilter 
                  selectedValues={completedMarketCommunities}
                  onChange={setCompletedMarketCommunities}
                />
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={completedLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="signed">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle>Lease Signed Leads</CardTitle>
              
              <div className="flex gap-4">
                <AgentFilter 
                  agents={leasingAgents}
                  selectedValues={signedAgents}
                  onChange={setSignedAgents}
                />
                
                <MarketCommunityFilter 
                  selectedValues={signedMarketCommunities}
                  onChange={setSignedMarketCommunities}
                />
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={signedLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="onboarded">
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <CardTitle>Onboarded Leads</CardTitle>
              
              <div className="flex gap-4">
                <AgentFilter 
                  agents={leasingAgents}
                  selectedValues={onboardedAgents}
                  onChange={setOnboardedAgents}
                />
                
                <MarketCommunityFilter 
                  selectedValues={onboardedMarketCommunities}
                  onChange={setOnboardedMarketCommunities}
                />
              </div>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={onboardedLeads} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leads;
