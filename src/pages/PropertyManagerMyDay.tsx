
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, HandCoins, CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockTenants } from '@/data/mockData';
import TenantsTable from '@/components/tenants/TenantsTable';

const CURRENT_MANAGER = "John Davis";

const PropertyManagerMyDay = () => {
  const navigate = useNavigate();
  
  // Filter tenants with attention required for the property manager
  const attentionRequiredTenants = mockTenants.filter(
    tenant => tenant.rentStatus === 'delinquent' || tenant.status === 'attention_required'
  ).slice(0, 5);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Day</h1>
          <p className="text-muted-foreground">Property management tasks requiring your attention</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/manager/tenants')}
          >
            <Users className="h-4 w-4 mr-2" />
            All Tenants
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/manager/rent')}
          >
            <HandCoins className="h-4 w-4 mr-2" />
            Rent Collection
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Tenants Requiring Attention</CardTitle>
          </CardHeader>
          <CardContent>
            {attentionRequiredTenants.length > 0 ? (
              <TenantsTable tenants={attentionRequiredTenants} />
            ) : (
              <div className="text-center py-6">
                <p>No tenants require immediate attention.</p>
              </div>
            )}
            {attentionRequiredTenants.length > 0 && (
              <div className="mt-4">
                <Button variant="outline" onClick={() => navigate('/manager/tenants')}>
                  View All Tenants
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total units</span>
                <span className="font-medium">148</span>
              </div>
              <div className="flex justify-between">
                <span>Occupancy rate</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between">
                <span>Delinquent accounts</span>
                <span className="font-medium text-destructive">12</span>
              </div>
              <div className="flex justify-between">
                <span>Expiring leases (30 days)</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>Scheduled tours today</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span>Pending maintenance</span>
                <span className="font-medium">14</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full" onClick={() => navigate('/calendar')}>
                <CalendarClock className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyManagerMyDay;
