
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockMaintenanceRequests } from '@/data/mockData';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Wrench, ImageIcon } from 'lucide-react';
import { format, startOfToday, startOfDay, endOfDay, eachDayOfInterval, add, sub, isSameDay, isSameMonth, getDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const CURRENT_SUPER = "Mike Johnson";

const viewOptions = {
  day: { label: "Day", days: 1 },
  '3day': { label: "3 Days", days: 3 },
  '5day': { label: "5 Day Week", days: 5 },
  week: { label: "7 Day Week", days: 7 },
  month: { label: "Month", days: 31 }
};

const SuperintendentCalendar = () => {
  const [calendarView, setCalendarView] = useState<string>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  
  const superintendentRequests = useMemo(() => mockMaintenanceRequests.filter(
    request => request.assignedTo === CURRENT_SUPER
  ), []);

  // Calculate date range for the current view
  const dateRange = useMemo(() => {
    const today = selectedDate;
    
    if (calendarView === 'month') {
      // For month view, we start on the first day of the month
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return eachDayOfInterval({ start: startDate, end: endDate });
    } else {
      // For day/week views, we show the selected number of days
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      const firstDayOfWeek = 0; // Sunday
      
      // Adjust start date to begin on Sunday for week views
      let startDate = today;
      if (days > 1) {
        const dayOfWeek = getDay(today);
        startDate = sub(today, { days: dayOfWeek });
      }
      
      return eachDayOfInterval({
        start: startDate,
        end: add(startDate, { days: days - 1 })
      });
    }
  }, [selectedDate, calendarView]);

  // Navigate to previous period
  const goToPrevious = () => {
    if (calendarView === 'month') {
      setSelectedDate(sub(selectedDate, { months: 1 }));
    } else {
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      setSelectedDate(sub(selectedDate, { days }));
    }
  };

  // Navigate to next period
  const goToNext = () => {
    if (calendarView === 'month') {
      setSelectedDate(add(selectedDate, { months: 1 }));
    } else {
      const days = viewOptions[calendarView as keyof typeof viewOptions]?.days || 7;
      setSelectedDate(add(selectedDate, { days }));
    }
  };

  // Go to today
  const goToToday = () => {
    setSelectedDate(startOfToday());
  };

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return superintendentRequests.filter(request => {
      const requestDate = new Date(request.scheduledDate || request.dateSubmitted);
      return isSameDay(requestDate, day);
    });
  };

  // Format date range for header
  const formatDateRangeHeader = () => {
    if (calendarView === 'day') {
      return format(selectedDate, 'MMMM d, yyyy');
    } else if (calendarView === 'month') {
      return format(selectedDate, 'MMMM yyyy');
    } else {
      const start = dateRange[0];
      const end = dateRange[dateRange.length - 1];
      
      if (isSameMonth(start, end)) {
        return `${format(start, 'MMMM d')} - ${format(end, 'd, yyyy')}`;
      } else {
        return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Superintendent Calendar</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <Select value={calendarView} onValueChange={setCalendarView}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Calendar View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="3day">3 Days</SelectItem>
              <SelectItem value="5day">5 Day Week</SelectItem>
              <SelectItem value="week">7 Day Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>Maintenance Schedule</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>Today</Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">{formatDateRangeHeader()}</h3>
          </div>
          
          {calendarView === 'month' ? (
            <div className="grid grid-cols-7 gap-1">
              {/* Week day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center p-2 font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {dateRange.map((day, i) => {
                const events = getEventsForDay(day);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "min-h-24 border p-1 relative",
                      !isSameMonth(day, selectedDate) && "bg-muted/50 text-muted-foreground", 
                      isSameDay(day, new Date()) && "border-primary"
                    )}
                  >
                    <div className="text-right mb-1">{format(day, 'd')}</div>
                    <div className="space-y-1">
                      {events.slice(0, 3).map((event) => (
                        <div 
                          key={event.id} 
                          className={cn(
                            "text-xs p-1 rounded truncate",
                            event.priority === 'urgent' ? "bg-red-100 text-red-800" :
                            event.priority === 'high' ? "bg-orange-100 text-orange-800" :
                            "bg-blue-100 text-blue-800"
                          )}
                        >
                          {event.issue}
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className="text-xs text-center text-muted-foreground">
                          + {events.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 divide-y">
                {dateRange.map((day, i) => {
                  const events = getEventsForDay(day);
                  return (
                    <div key={i} className="py-4">
                      <div className={cn(
                        "text-base font-semibold mb-2",
                        isSameDay(day, new Date()) ? "text-primary" : ""
                      )}>
                        {format(day, 'EEEE, MMMM d')}
                      </div>
                      
                      {events.length === 0 ? (
                        <div className="text-sm text-muted-foreground italic py-2">
                          No maintenance tasks scheduled
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {events.map((event) => (
                            <div key={event.id} className="bg-muted/40 rounded-lg p-3 text-sm">
                              <div className="flex justify-between items-start">
                                <div className="font-medium">{event.issue}</div>
                                <Badge 
                                  variant={
                                    event.priority === 'urgent' ? "destructive" :
                                    event.priority === 'high' ? "default" : "secondary"
                                  }
                                  className="ml-2"
                                >
                                  {event.priority}
                                </Badge>
                              </div>
                              
                              <div className="mt-2 space-y-1 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>{event.scheduledDate || 'Not scheduled'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{event.unit}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Wrench className="h-3.5 w-3.5" />
                                  <span>{event.description}</span>
                                </div>
                              </div>
                              
                              <div className="mt-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs flex items-center gap-1"
                                >
                                  <ImageIcon className="h-3.5 w-3.5" />
                                  {`See picture${(event.images?.length || 0) <= 1 ? '' : 's'} (${event.images?.length || 0})`}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperintendentCalendar;
