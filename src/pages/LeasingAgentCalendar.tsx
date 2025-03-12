
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLeads } from '@/data/mockData';
import { 
  Calendar as CalendarComponent, 
  CalendarProps 
} from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Clock, MapPin } from 'lucide-react';
import { format, addDays, isToday, isSameDay, parseISO, startOfToday } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Define the current leasing agent
const CURRENT_AGENT = "Emily Wilson";

const LeasingAgentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());

  // Filter leads that are assigned to the current agent and have tour dates
  const agentLeads = mockLeads.filter(lead => 
    lead.assignedTo === CURRENT_AGENT && lead.tourDate
  );
  
  // Convert string tour dates to Date objects for comparison
  const leadsByDate = agentLeads.reduce((acc, lead) => {
    if (lead.tourDate) {
      const tourDate = parseISO(lead.tourDate);
      const dateKey = format(tourDate, 'yyyy-MM-dd');
      
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      
      acc[dateKey].push({
        ...lead,
        tourDateTime: tourDate
      });
    }
    return acc;
  }, {} as Record<string, (typeof agentLeads[0] & { tourDateTime: Date })[]>);
  
  // Get today's tours
  const todayKey = format(new Date(), 'yyyy-MM-dd');
  const todaysTours = leadsByDate[todayKey] || [];
  
  // Get selected day's tours
  const selectedDayKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedDayTours = selectedDate ? (leadsByDate[selectedDayKey] || []) : [];
  
  // Count tours for each day to highlight in calendar
  const getDayClassNames: CalendarProps["modifiers"] = {
    hasAppointment: (date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      return !!leadsByDate[dateKey] && leadsByDate[dateKey].length > 0;
    }
  };
  
  const getDayClassNamesFn: CalendarProps["modifiersClassNames"] = {
    hasAppointment: "bg-blue-50 font-medium text-blue-600 relative",
  };
  
  // Sort tours by time for the selected day
  const sortedTours = [...selectedDayTours].sort((a, b) => {
    return a.tourDateTime.getTime() - b.tourDateTime.getTime();
  });
  
  // Go to next or previous day
  const goToNextDay = () => {
    if (selectedDate) {
      setSelectedDate(addDays(selectedDate, 1));
    }
  };
  
  const goToPreviousDay = () => {
    if (selectedDate) {
      setSelectedDate(addDays(selectedDate, -1));
    }
  };
  
  const goToToday = () => {
    setSelectedDate(startOfToday());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Manage your appointments and tours</p>
        </div>
        
        <Button variant="default" onClick={goToToday}>
          Today
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={getDayClassNames}
                modifiersClassNames={getDayClassNamesFn}
                className="rounded-md border shadow-sm"
                components={{
                  DayContent: ({ date }) => {
                    const dateKey = format(date, 'yyyy-MM-dd');
                    const tours = leadsByDate[dateKey] || [];
                    return (
                      <div className="relative">
                        <div>{date.getDate()}</div>
                        {tours.length > 0 && (
                          <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2">
                            <div className="h-1 w-1 rounded-full bg-blue-600" />
                          </div>
                        )}
                      </div>
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <div>
                <CardTitle>
                  {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Schedule'}
                </CardTitle>
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedDayTours.length} {selectedDayTours.length === 1 ? 'appointment' : 'appointments'}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={goToNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {sortedTours.length > 0 ? (
                <div className="space-y-4">
                  {sortedTours.map((tour) => (
                    <div 
                      key={tour.id}
                      className={cn(
                        "p-4 rounded-lg border",
                        isToday(tour.tourDateTime) ? "border-blue-200 bg-blue-50" : "border-gray-200"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-lg">{tour.name}</div>
                        <Badge variant="outline" className="ml-2">
                          {tour.status === 'tour_scheduled' ? 'Tour' : 'Call'}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{format(tour.tourDateTime, 'h:mm a')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{tour.propertyInterest}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Unit Type: {tour.unitInterest}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No appointments scheduled for this day.</p>
                  <Button variant="outline" className="mt-4">Add Appointment</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Tours</CardTitle>
        </CardHeader>
        <CardContent>
          {todaysTours.length > 0 ? (
            <div className="space-y-4">
              <div className="font-medium mb-2">Today, {format(new Date(), 'MMMM d')}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todaysTours.map((tour) => (
                  <div 
                    key={tour.id}
                    className="p-4 rounded-lg border border-blue-200 bg-blue-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{tour.name}</div>
                      <div className="text-sm font-semibold">
                        {format(tour.tourDateTime, 'h:mm a')}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">{tour.propertyInterest} - {tour.unitInterest}</div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">Call</Button>
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tours scheduled for today.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeasingAgentCalendar;
