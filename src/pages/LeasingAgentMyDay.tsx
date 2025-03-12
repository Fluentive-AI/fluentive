
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockLeads } from '@/data/mockData';
import LeadsTable from '@/components/leads/LeadsTable';

const CURRENT_AGENT = "Sarah Parker";

const LeasingAgentMyDay = () => {
  const navigate = useNavigate();
  
  // Filter leads for today's appointments for the current agent
  const todaysLeads = mockLeads.filter(
    lead => lead.assignedTo === CURRENT_AGENT && 
    lead.status === 'tour_scheduled'
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Day</h1>
          <p className="text-muted-foreground">Your scheduled appointments for today</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/agent/calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Open Calendar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto" 
            onClick={() => navigate('/agent/leads')}
          >
            <Users className="h-4 w-4 mr-2" />
            All Leads
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Today's Tours</CardTitle>
          </CardHeader>
          <CardContent>
            {todaysLeads.length > 0 ? (
              <LeadsTable leads={todaysLeads} />
            ) : (
              <div className="text-center py-6">
                <p>No tours scheduled for today.</p>
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
                <span>Total tours</span>
                <span className="font-medium">{todaysLeads.length}</span>
              </div>
              <div className="flex justify-between">
                <span>First appointment</span>
                <span className="font-medium">
                  {todaysLeads.length > 0 ? '10:00 AM' : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last appointment</span>
                <span className="font-medium">
                  {todaysLeads.length > 0 ? '4:00 PM' : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Applications pending review</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeasingAgentMyDay;
