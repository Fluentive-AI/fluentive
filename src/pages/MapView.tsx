
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin } from 'lucide-react';
import { mockMaintenanceRequests } from '@/data/mockData';
import { useLocation } from 'react-router-dom';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';
import StatusBadge from '@/components/shared/StatusBadge';

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

  useEffect(() => {
    // A placeholder for the map implementation
    // In a real implementation, we would:
    // 1. Create a mapbox map
    // 2. Add markers for each maintenance request
    // 3. Add click handlers to the markers
    const mapContainer = mapContainerRef.current;
    
    if (mapContainer) {
      mapContainer.innerHTML = '<div class="flex justify-center items-center h-full bg-muted/50 rounded-lg border"><p class="text-muted-foreground">Interactive map would be displayed here<br/>(requires Mapbox integration)</p></div>';
    }
    
    return () => {
      // Clean up map resources
    };
  }, [filteredRequests]);

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
        <div ref={mapContainerRef} className="w-full h-[400px] rounded-lg border shadow-sm"></div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Today's Stops</CardTitle>
        </CardHeader>
        <CardContent>
          {isSuperintendentView ? (
            <MaintenanceTable requests={filteredRequests} />
          ) : (
            <div className="relative w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tenant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Unit</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Issue</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Assigned To</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pictures</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="py-3 px-4">{request.tenantName}</td>
                      <td className="py-3 px-4">{request.unit}</td>
                      <td className="py-3 px-4">{request.description}</td>
                      <td className="py-3 px-4">{request.date}</td>
                      <td className="py-3 px-4">{request.assignedTo || 'Unassigned'}</td>
                      <td className="py-3 px-4">
                        <button 
                          className="text-blue-600 hover:text-blue-800 underline p-0 bg-transparent border-none text-sm"
                          onClick={() => {/* Handle picture view */}}
                        >
                          {`See picture${(request.images?.length || 0) <= 1 ? '' : 's'} (${request.images?.length || 0})`}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
