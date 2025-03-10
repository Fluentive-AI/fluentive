import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, InfoIcon } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import { useLocation } from 'react-router-dom';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';

// This would be better stored in env variables
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNrczl4eGxhdTBxaXIydHFpbmhuc3ZkbzAifQ.QpZOOZ5H5avIcQpq0qmYRQ";

const CURRENT_SUPER = "Mike Johnson";

const MapView = () => {
  const location = useLocation();
  const isSuperintendentView = location.pathname.startsWith('/super');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // For superintendent view, we only show their requests
  const filteredRequests = isSuperintendentView
    ? mockMaintenanceRequests.filter(request => request.assignedTo === CURRENT_SUPER)
    : mockMaintenanceRequests;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {isSuperintendentView ? (
          <div>
            <h1 className="text-2xl font-bold">Superintendent Itinerary</h1>
            <p className="text-muted-foreground">Welcome back, {CURRENT_SUPER}</p>
          </div>
        ) : (
          <h1 className="text-2xl font-bold">Itinerary for All Supers</h1>
        )}
        
        <div className="flex gap-3">
          <Button className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Open in Google Maps
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <InfoIcon className="h-12 w-12 mb-4 mx-auto text-brand-300" />
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md">
                The Map View page is under development. Check back later for updates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Today's Stops</CardTitle>
        </CardHeader>
        <CardContent>
          <MaintenanceTable requests={filteredRequests} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
