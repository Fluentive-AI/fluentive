import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import CommunicationStatusFilter from '@/components/rent/CommunicationStatusFilter';
import PropertyManagerRentAIConsole from '@/components/rent/PropertyManagerRentAIConsole';

// Define the current property manager
const CURRENT_MANAGER = "John Davis";

const PropertyManagerRent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [communicationStatusFilters, setCommunicationStatusFilters] = useState<string[]>([]);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Rent Collection</h1>
          <p className="text-muted-foreground">Welcome back, {CURRENT_MANAGER}</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 md:flex-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="flex-1 md:flex-auto" 
            onClick={() => window.open('https://www.yardi.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            See in Yardi
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search communications..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
                
                <div className="flex gap-2">
                <CommunicationStatusFilter 
                    selectedValues={communicationStatusFilters}
                    onChange={setCommunicationStatusFilters}
                />
                </div>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
          <PropertyManagerRentAIConsole 
            searchQuery={searchQuery}
            statusFilters={communicationStatusFilters}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyManagerRent; 