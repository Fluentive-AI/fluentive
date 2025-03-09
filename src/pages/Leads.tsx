
import React from 'react';
import LeadsTable from '@/components/leads/LeadsTable';
import { mockLeads } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Leads = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads & Tours</h1>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Current Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadsTable leads={mockLeads} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
