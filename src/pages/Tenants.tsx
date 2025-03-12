import React, { useState } from 'react';
import TenantsTable from '@/components/tenants/TenantsTable';
import { mockTenants } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import RentStatusFilter from '@/components/tenants/RentStatusFilter';

const Tenants = () => {
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [selectedRentStatuses, setSelectedRentStatuses] = useState<string[]>([]);

  // Filter tenants based on selected market/communities and rent statuses
  const filteredTenants = mockTenants.filter(tenant => {
    // Filter by market/community
    const passesMarketFilter = selectedMarketCommunities.length === 0 || 
      selectedMarketCommunities.some(mc => {
        const [market, community] = mc.split('/');
        return tenant.market === market && tenant.community === community;
      });
    
    // Filter by rent status
    const passesRentStatusFilter = selectedRentStatuses.length === 0 || 
      selectedRentStatuses.includes(tenant.rentStatus);
    
    return passesMarketFilter && passesRentStatusFilter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tenants</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3 flex flex-row justify-between items-center">
          <CardTitle>All Tenants</CardTitle>
          
          <div className="flex gap-4">
            <RentStatusFilter 
              selectedValues={selectedRentStatuses}
              onChange={setSelectedRentStatuses}
            />
            
            <MarketCommunityFilter 
              selectedValues={selectedMarketCommunities}
              onChange={setSelectedMarketCommunities}
            />
          </div>
        </CardHeader>
        <CardContent>
          <TenantsTable tenants={filteredTenants} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Tenants;
