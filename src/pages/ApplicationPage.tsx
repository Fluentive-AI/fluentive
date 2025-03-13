import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockApplications } from '@/data/mockData';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';
import ApplicationsTable from '@/components/applications/ApplicationsTable';

// Define the current leasing agent name
const CURRENT_AGENT = "Emily Wilson";

const ApplicationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  
  // Check if we're in the agent view
  const isAgentView = location.pathname.startsWith('/agent');
  
  // Filter applications based on the current view
  const applicationsData = isAgentView 
    ? mockApplications.filter(app => app.assignedTo === CURRENT_AGENT)
    : mockApplications;
  
  const filteredApplications = applicationsData.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.propertyInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {isAgentView ? 'My Applications' : 'All Tenant Applications'}
        </h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {isAgentView ? 'Applications Assigned to Me' : 'Active Applications'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredApplications.length > 0 ? (
            <ApplicationsTable applications={filteredApplications} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No applications found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationPage;
