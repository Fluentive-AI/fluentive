import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  ExternalLink, 
  List,
  CalendarClock,
  User,
  Info
} from 'lucide-react';
import { 
  format, 
  startOfToday, 
  startOfDay, 
  eachDayOfInterval, 
  add, 
  sub, 
  isSameDay, 
  isSameMonth, 
  getDay,
  isWithinInterval,
  parseISO
} from 'date-fns';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Lead } from '@/types';
import { mockLeads, CURRENT_LEASING_AGENT } from '@/data/mockData';
import { Badge } from "@/components/ui/badge";
import CalendarTemplate from '@/components/CalendarTemplate';

const viewOptions = {
  day: { label: "Day", days: 1 },
  '3day': { label: "Three Day", days: 3 },
  '5day': { label: "Working Week", days: 5 },
  week: { label: "Week", days: 7 },
  month: { label: "Month", days: 31 }
};

const BUSINESS_HOURS_START = 8; // 8 AM
const BUSINESS_HOURS_END = 18; // 6 PM

interface EventType {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Lead;
}

const LeasingAgentCalendar = () => {
  const [calendarView, setCalendarView] = useState<string>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [displayMode, setDisplayMode] = useState<string>('list'); // 'list' or 'hourly'
  const [selectedEvent, setSelectedEvent] = useState<Lead | null>(null);
  
  // Filter leads for the current leasing agent with scheduled tours
  const tourLeads = useMemo(() => {
    return mockLeads.filter(
      lead => lead.assignedTo === CURRENT_LEASING_AGENT && 
              lead.status === 'tour_scheduled' &&
              lead.tourDateTime
    );
  }, []);
  
  // Calculate date range for the current view
  const dateRange = useMemo(() => {
    const today = selectedDate;
    
    if (calendarView === 'month') {
      // For month view, we start on the first day of the month
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return eachDayOfInterval({ start: startDate, end: endDate });
    } else if (calendarView === '3day') {
      // For 3-day view, we show the selected date and the next 2 days
      return eachDayOfInterval({
        start: today,
        end: add(today, { days: 2 })
      });
    } else {
      // For other views, we show the selected number of days
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      
      let startDate = today;
      if (calendarView === '5day') {
        // Working Week starts on Monday
        const dayOfWeek = getDay(today);
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate = sub(today, { days: daysToSubtract });
      } else if (calendarView === 'week') {
        // Regular week starts on Sunday
        const dayOfWeek = getDay(today);
        startDate = sub(today, { days: dayOfWeek });
      }
      
      return eachDayOfInterval({
        start: startDate,
        end: add(startDate, { days: days - 1 })
      });
    }
  }, [selectedDate, calendarView]);

  // Format the date range header
  const formatDateRangeHeader = () => {
    if (calendarView === 'day') {
      return format(selectedDate, 'MMMM d, yyyy');
    } else if (calendarView === 'month') {
      return format(selectedDate, 'MMMM yyyy');
    } else {
      const firstDay = dateRange[0];
      const lastDay = dateRange[dateRange.length - 1];
      
      if (isSameMonth(firstDay, lastDay)) {
        return `${format(firstDay, 'MMMM d')} - ${format(lastDay, 'd, yyyy')}`;
      } else {
        return `${format(firstDay, 'MMM d')} - ${format(lastDay, 'MMM d, yyyy')}`;
      }
    }
  };

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return tourLeads.filter(lead => {
      const tourDate = new Date(lead.tourDateTime!);
      return isSameDay(tourDate, day);
    });
  };

  // Get events for a specific hour
  const getEventsForHour = (day: Date, hour: number) => {
    const hourStart = add(startOfDay(day), { hours: hour });
    const hourEnd = add(hourStart, { hours: 1 });
    
    return tourLeads.filter(lead => {
      if (!lead.tourDateTime) return false;
      
      const tourStartTime = new Date(lead.tourDateTime);
      // Tours typically last 1 hour
      const tourEndTime = add(tourStartTime, { hours: 1 });
      
      return isWithinInterval(hourStart, { start: tourStartTime, end: tourEndTime }) ||
             isWithinInterval(hourEnd, { start: tourStartTime, end: tourEndTime }) ||
             isWithinInterval(tourStartTime, { start: hourStart, end: hourEnd });
    });
  };

  // Open event dialog
  const openEventDialog = (lead: Lead) => {
    setSelectedEvent(lead);
  };

  // Close event dialog
  const closeEventDialog = () => {
    setSelectedEvent(null);
  };

  // Render month view
  const renderMonthView = () => {
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const dayOfWeek = getDay(firstDayOfMonth);
    const daysInPreviousMonth = dayOfWeek;
    
    return (
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className="py-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7">
            {/* Empty cells for days from previous month */}
            {Array.from({ length: daysInPreviousMonth }).map((_, index) => (
              <div key={`prev-${index}`} className="min-h-[100px] p-2 border-b border-r text-muted-foreground"></div>
            ))}
            
            {/* Days in current month */}
            {dateRange.map((day, index) => {
              const events = getEventsForDay(day);
              const isToday = isSameDay(day, new Date());
              
              return (
                <div 
                  key={day.toString()} 
                  className={cn(
                    "min-h-[100px] p-2 border-b border-r relative",
                    !isSameMonth(day, selectedDate) && "text-muted-foreground",
                    isToday && "bg-muted/50"
                  )}
                  onClick={() => {
                    setSelectedDate(day);
                    setCalendarView('day');
                  }}
                >
                  <div className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center text-sm",
                    isToday && "bg-primary text-primary-foreground font-medium"
                  )}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                    {events.map(event => (
                      <div 
                        key={event.id} 
                        className="text-xs bg-primary/10 text-primary rounded px-1 py-0.5 truncate cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEventDialog(event);
                        }}
                      >
                        {format(new Date(event.tourDateTime!), 'h:mm a')} - {event.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render day/week view
  const renderDayView = () => {
    if (displayMode === 'list') {
      return renderListView();
    } else {
      return renderHourlyView();
    }
  };

  // Render list view
  const renderListView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dateRange.map(day => {
          const events = getEventsForDay(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <Card key={day.toString()} className={cn(isToday && "border-primary")}>
              <CardHeader className={cn("pb-2", isToday && "bg-primary/5")}>
                <CardTitle className="text-base">
                  {format(day, 'EEEE, MMMM d')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {events.length > 0 ? (
                  <div className="divide-y">
                    {events.map(event => (
                      <div 
                        key={event.id} 
                        className="p-3 hover:bg-muted/50 cursor-pointer"
                        onClick={() => openEventDialog(event)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {format(new Date(event.tourDateTime!), 'h:mm a')}
                          </span>
                        </div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {event.propertyInterest}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    No tours scheduled
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // Render hourly view
  const renderHourlyView = () => {
    const hours = Array.from({ length: BUSINESS_HOURS_END - BUSINESS_HOURS_START }, (_, i) => i + BUSINESS_HOURS_START);
    
    return (
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-[auto,1fr] md:grid-cols-[auto,repeat(auto-fill,minmax(0,1fr))]">
            {/* Time column */}
            <div className="border-r">
              <div className="h-12 border-b"></div> {/* Empty cell for header */}
              {hours.map(hour => (
                <div key={hour} className="h-20 border-b px-2 py-1 text-xs text-muted-foreground">
                  {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                </div>
              ))}
            </div>
            
            {/* Day columns */}
            {dateRange.map(day => {
              const isToday = isSameDay(day, new Date());
              
              return (
                <div key={day.toString()} className="min-w-[120px]">
                  {/* Day header */}
                  <div className={cn(
                    "h-12 border-b px-2 py-1 text-center font-medium",
                    isToday && "bg-primary/5"
                  )}>
                    <div>{format(day, 'EEE')}</div>
                    <div className={cn(
                      "text-sm",
                      isToday && "text-primary font-bold"
                    )}>
                      {format(day, 'MMM d')}
                    </div>
                  </div>
                  
                  {/* Hour cells */}
                  {hours.map(hour => {
                    const events = getEventsForHour(day, hour);
                    
                    return (
                      <div key={hour} className="h-20 border-b border-r relative group">
                        {events.map(event => {
                          const eventTime = new Date(event.tourDateTime!);
                          const eventHour = eventTime.getHours();
                          const eventMinute = eventTime.getMinutes();
                          const topOffset = eventHour === hour ? (eventMinute / 60) * 100 : 0;
                          
                          return (
                            <div 
                              key={event.id}
                              className="absolute left-0 right-0 mx-1 p-1 bg-primary/10 text-primary rounded text-xs cursor-pointer"
                              style={{ top: `${topOffset}%` }}
                              onClick={() => openEventDialog(event)}
                            >
                              <div className="font-medium truncate">
                                {format(eventTime, 'h:mm a')} - {event.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render calendar content based on display mode
  const renderCalendarContent = () => {
    return displayMode === 'list' ? renderListView() : renderHourlyView();
  };

  // Render event dialog
  const renderEventDialog = () => {
    if (!selectedEvent) return null;
    
    const tourTime = selectedEvent.tourDateTime ? new Date(selectedEvent.tourDateTime) : null;
    
    return (
      <Dialog open={!!selectedEvent} onOpenChange={closeEventDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedEvent.name}</span>
              <Badge variant="outline">
                {selectedEvent.source}
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-lg">
              Tour Details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                <p>{tourTime ? format(tourTime, 'MMM d, yyyy h:mm a') : 'Date not set'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p>{selectedEvent.propertyInterest} ({selectedEvent.community})</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contact</p>
                <p>{selectedEvent.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{selectedEvent.email}</p>
              </div>
            </div>
            
            {selectedEvent.notes && (
              <div className="border rounded-md p-3 text-sm">
                <div className="font-medium mb-1">Notes</div>
                <div>{selectedEvent.notes}</div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Lead Source:</div>
              <Badge variant="outline">{selectedEvent.source}</Badge>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeEventDialog}>Close</Button>
            <Button 
              onClick={() => window.open('https://www.yardi.com', '_blank')}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Yardi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_LEASING_AGENT}</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={calendarView} onValueChange={setCalendarView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Calendar View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="3day">Three Day</SelectItem>
              <SelectItem value="5day">Working Week</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Yardi
          </Button>
        </div>
      </div>
      
      <CalendarTemplate
        title="Tour Schedule"
        renderMonthView={renderMonthView}
        renderCalendarContent={renderCalendarContent}
        onViewChange={setCalendarView}
        onDateChange={setSelectedDate}
        onDisplayModeChange={setDisplayMode}
        calendarView={calendarView}
        selectedDate={selectedDate}
        displayMode={displayMode}
        formatDateRangeHeader={formatDateRangeHeader}
      />
      
      {renderEventDialog()}
    </div>
  );
};

export default LeasingAgentCalendar;
