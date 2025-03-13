import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText } from 'lucide-react';
import { mockLeasingApplications, CURRENT_LEASING_AGENT } from '@/data/leasingMockData';
import { Application } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import StatusBadge from '@/components/shared/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const LeasingAgentApplications = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Filter applications for the current leasing agent
  const agentApplications = mockLeasingApplications.filter(
    app => app.assignedTo === CURRENT_LEASING_AGENT
  );
  
  // Filter applications by status
  const pendingApplications = agentApplications.filter(app => app.status === 'pending');
  const reviewingApplications = agentApplications.filter(app => app.status === 'reviewing');
  const approvedApplications = agentApplications.filter(app => app.status === 'approved');
  const deniedApplications = agentApplications.filter(app => app.status === 'denied');
  
  // Component to display application data
  const ApplicationTable = ({ applications }: { applications: Application[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Applicant</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Unit Type</TableHead>
          <TableHead>Date Submitted</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Background Check</TableHead>
          <TableHead>Credit Check</TableHead>
          <TableHead>Income Verification</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.length > 0 ? (
          applications.map(app => (
            <TableRow key={app.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{app.applicantName}</div>
                  <div className="text-sm text-gray-500">{app.email}</div>
                </div>
              </TableCell>
              <TableCell>{app.propertyInterest}</TableCell>
              <TableCell>{app.unitType}</TableCell>
              <TableCell>{format(new Date(app.dateSubmitted), 'MM/dd/yyyy')}</TableCell>
              <TableCell>
                <StatusBadge status={app.status} />
              </TableCell>
              <TableCell>
                <StatusBadge status={app.backgroundCheck?.status || 'pending'} />
              </TableCell>
              <TableCell>
                <StatusBadge status={app.creditCheck?.status || 'pending'} />
              </TableCell>
              <TableCell>
                <StatusBadge status={app.incomeVerification?.status || 'pending'} />
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  title="See in Yardi"
                  onClick={() => window.open('https://www.yardi.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-6">
              No applications found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>
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
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reviewing">Under Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="denied">Denied</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationTable applications={agentApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationTable applications={pendingApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviewing">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Applications Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationTable applications={reviewingApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Approved Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationTable applications={approvedApplications} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="denied">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Denied Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationTable applications={deniedApplications} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeasingAgentApplications;
