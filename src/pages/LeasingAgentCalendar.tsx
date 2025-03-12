
import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockLeasingAgentLeads, CURRENT_LEASING_AGENT } from '@/data/leasingMockData';
import { Lead } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// Configure the localizer
const localizer = momentLocalizer(moment);

// Event type for calendar
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resourceId?: string;
  allDay?: boolean;
  resource?: any;
}

const LeasingAgentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<string>('day');
  const [selectedEvent, setSelectedEvent] = useState<(Lead & { tourDateTime: Date }) | null>(null);
  
  // Filter leads for the current leasing agent with scheduled tours
  const tourLeads = mockLeasingAgentLeads.filter(
    lead => lead.assignedTo === CURRENT_LEASING_AGENT && 
            lead.status === 'tour_scheduled' &&
            lead.tourDateTime
  );
  
  // Convert tours to calendar events
  const events: CalendarEvent[] = tourLeads.map(lead => {
    // Convert the ISO string to a Date object
    const startDate = new Date(lead.tourDateTime!);
    
    // Create an end date 1 hour after the start date
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    
    return {
      id: lead.id,
      title: `Tour: ${lead.name} - ${lead.propertyInterest}`,
      start: startDate,
      end: endDate,
      resourceId: lead.id,
      resource: lead,
    };
  });
  
  // Handle event selection
  const handleSelectEvent = (event: CalendarEvent) => {
    const lead = event.resource as Lead;
    setSelectedEvent({
      ...lead,
      tourDateTime: event.start
    });
  };
  
  // Handle event dialog close
  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };
  
  // Handle navigation
  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };
  
  // Handle view change
  const handleViewChange = (newView: string) => {
    setView(newView);
  };
  
  // Go to previous day/week/month
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  // Go to next day/week/month
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        
        <div className="flex gap-3">
          <Button 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => window.open('https://calendar.google.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Google Calendar
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="p-4 flex justify-between items-center border-b">
            <div>
              <h2 className="text-lg font-medium">
                {moment(currentDate).format(
                  view === 'day' ? 'dddd, MMMM D, YYYY' :
                  view === 'week' ? 'MMMM D - ' + moment(currentDate).add(6, 'days').format('D, YYYY') :
                  'MMMM YYYY'
                )}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-r-none"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-l-none"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={goToToday}
              >
                Today
              </Button>
              
              <div className="flex rounded-md overflow-hidden border">
                <Button 
                  variant={view === 'day' ? 'default' : 'ghost'} 
                  size="sm" 
                  className="rounded-none border-0"
                  onClick={() => handleViewChange('day')}
                >
                  Day
                </Button>
                <Button 
                  variant={view === 'week' ? 'default' : 'ghost'} 
                  size="sm" 
                  className="rounded-none border-0"
                  onClick={() => handleViewChange('week')}
                >
                  Week
                </Button>
                <Button 
                  variant={view === 'month' ? 'default' : 'ghost'} 
                  size="sm" 
                  className="rounded-none border-0"
                  onClick={() => handleViewChange('month')}
                >
                  Month
                </Button>
              </div>
            </div>
          </div>
          
          <div className="h-[calc(100vh-240px)] p-4">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleSelectEvent}
              date={currentDate}
              onNavigate={handleNavigate}
              view={view as any}
              onView={(newView) => handleViewChange(newView)}
              views={[Views.DAY, Views.WEEK, Views.MONTH]}
              popup
              eventPropGetter={() => ({
                style: {
                  backgroundColor: '#3b82f6',
                  borderRadius: '4px',
                  color: 'white',
                  border: 'none',
                },
              })}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Event details dialog */}
      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tour Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-medium">Client:</div>
                <div className="col-span-3">{selectedEvent.name}</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-medium">Contact:</div>
                <div className="col-span-3">
                  <div>{selectedEvent.email}</div>
                  <div>{selectedEvent.phone}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-medium">Property:</div>
                <div className="col-span-3">{selectedEvent.community} ({selectedEvent.market})</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-medium">Unit Type:</div>
                <div className="col-span-3">{selectedEvent.propertyInterest}</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-medium">Unit Interest:</div>
                <div className="col-span-3">{selectedEvent.unitInterest || 'Not specified'}</div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-sm font-medium">Tour Time:</div>
                <div className="col-span-3">{moment(selectedEvent.tourDateTime).format('h:mm A, MMMM D, YYYY')}</div>
              </div>
              
              {selectedEvent.notes && (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-sm font-medium">Notes:</div>
                  <div className="col-span-3">{selectedEvent.notes}</div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://www.yardi.com', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View in Yardi
              </Button>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LeasingAgentCalendar;
