
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockApplications } from '@/data/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Property Interest</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Background Check</TableHead>
                  <TableHead>Credit Check</TableHead>
                  <TableHead>Income Verification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{application.name}</TableCell>
                    <TableCell>{application.propertyInterest}</TableCell>
                    <TableCell>{application.dateSubmitted}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.backgroundCheck)}>
                        {application.backgroundCheck.charAt(0).toUpperCase() + application.backgroundCheck.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.creditCheck)}>
                        {application.creditCheck.charAt(0).toUpperCase() + application.creditCheck.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.incomeVerification)}>
                        {application.incomeVerification.charAt(0).toUpperCase() + application.incomeVerification.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
