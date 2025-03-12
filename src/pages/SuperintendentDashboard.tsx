import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Map, MapPin, ExternalLink } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { useNavigate } from 'react-router-dom';

// Changed superintendent name
const CURRENT_SUPER = "Mike Johnson";

const SuperintendentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('workorders');
  
  // Filter maintenance requests for Mike Johnson
  const superintendentRequests = mockMaintenanceRequests.filter(
    request => request.assignedTo === CURRENT_SUPER
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Work Orders</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            className="flex-1 md:flex-auto bg-white text-black border border-gray-200 hover:bg-gray-100" 
            onClick={() => navigate('/super/calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Open Calendar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://maps.google.com', '_blank')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            See Today's Route
          </Button>
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex justify-start mb-6">
          <TabsTrigger value="workorders">Work Orders</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workorders">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Assigned Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTable requests={superintendentRequests} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Scheduled Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTable 
                requests={superintendentRequests.filter(r => r.status !== 'completed')} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <MaintenanceTable 
                requests={superintendentRequests.filter(r => r.status === 'completed')} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperintendentDashboard;
