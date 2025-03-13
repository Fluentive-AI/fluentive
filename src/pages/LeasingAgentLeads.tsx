import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, ExternalLink } from 'lucide-react';
import LeadsTable from '@/components/leads/LeadsTable';
import { mockLeasingAgentLeads, CURRENT_LEASING_AGENT } from '@/data/leasingMockData';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import StatusFilter from '@/components/leads/StatusFilter';

const LeasingAgentLeads = () => {
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Filter leads for the current leasing agent
  const agentLeads = mockLeasingAgentLeads.filter(
    lead => lead.assignedTo === CURRENT_LEASING_AGENT
  );
  
  // Apply additional filters based on selected options
  const filteredLeads = agentLeads.filter(lead => {
    // Filter by status if statuses are selected
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(lead.status)) {
      return false;
    }
    
    // Filter by market/community if selected
    if (selectedMarketCommunities.length > 0) {
      const marketCommunityValue = `${lead.market}/${lead.community}`;
      if (!selectedMarketCommunities.includes(marketCommunityValue)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Filter for new leads (not yet contacted)
  const newLeads = filteredLeads.filter(lead => lead.status === 'new');
  
  // Filter for contacted leads
  const contactedLeads = filteredLeads.filter(lead => lead.status === 'contacted');
  
  // Filter for leads with scheduled tours
  const tourLeads = filteredLeads.filter(lead => lead.status === 'tour_scheduled');
  
  // Filter for leads with sent applications
  const applicationLeads = filteredLeads.filter(
    lead => lead.status === 'application_sent' || lead.status === 'application_received'
  );
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Leads & Tours</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_LEASING_AGENT}</p>
        </div>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New Leads</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="tours">Scheduled Tours</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        
        <div className="mb-4 flex justify-end gap-4">
          <MarketCommunityFilter 
            selectedValues={selectedMarketCommunities}
            onChange={setSelectedMarketCommunities}
          />
          
          <StatusFilter
            selectedValues={selectedStatuses}
            onChange={setSelectedStatuses}
          />
        </div>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All My Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={filteredLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>New Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={newLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacted">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Contacted Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={contactedLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tours">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Scheduled Tours</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={tourLeads} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Application Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={applicationLeads} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeasingAgentLeads;
