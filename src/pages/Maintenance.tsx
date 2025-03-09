
import React from 'react';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import { mockMaintenanceRequests } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Maintenance = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Requests</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Request
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Active Maintenance Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <MaintenanceTable requests={mockMaintenanceRequests} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Maintenance;
