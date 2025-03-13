
import React, { useState } from 'react';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import MarketCommunityFilter from '@/components/leads/MarketCommunityFilter';
import { 
  mockDashboardMetrics, 
  mockRenewalsTrendData,
  mockOccupancyTrendData,
  mockDelinquencyTrendData,
  mockBillHoursTrendData,
  mockWorkOrdersTrendData,
  mockLeasingTimelineTrendData,
  technicianLocations
} from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import DashboardSelector from '@/components/dashboard/DashboardSelector';

// Sample personalized dashboards
const personalizedDashboards = [
  { id: '1', name: 'Default Overview', isDefault: true },
  { id: '2', name: 'Leasing Focus', isDefault: false },
  { id: '3', name: 'Maintenance KPIs', isDefault: false },
  { id: '4', name: 'Occupancy Tracker', isDefault: false }
];

const Dashboard = () => {
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'market' | 'community'>('market');
  const [activeDashboard, setActiveDashboard] = useState(personalizedDashboards[0]);

  // Helper function to extract market from community string (e.g., "Atlanta/Osborne Farms" -> "Atlanta")
  const getMarketFromCommunity = (community: string): string => {
    return community.split('/')[0];
  };

  // Get the currently selected markets based on the selected communities
  const getSelectedMarkets = (): string[] => {
    if (selectedMarketCommunities.length === 0) return ['all'];
    
    const markets = selectedMarketCommunities.map(getMarketFromCommunity);
    return [...new Set(markets)]; // Remove duplicates
  };

  const filterMetricsBySelection = (metrics: typeof mockDashboardMetrics) => {
    const selectedMarkets = getSelectedMarkets();
    
    if (selectedMarkets.includes('all') || selectedMarketCommunities.length === 0) {
      return metrics;
    }

    if (viewMode === 'market') {
      return metrics.map(metric => ({
        ...metric,
        value: metric.markets?.[selectedMarkets[0]]?.value ?? metric.value,
        change: metric.markets?.[selectedMarkets[0]]?.change ?? metric.change,
        status: metric.markets?.[selectedMarkets[0]]?.status ?? metric.status,
      }));
    }

    // In community view with selections, we would ideally have community-specific data
    // For now, default to the market data of the first selected community
    return metrics.map(metric => ({
      ...metric,
      value: metric.markets?.[getMarketFromCommunity(selectedMarketCommunities[0])]?.value ?? metric.value,
      change: metric.markets?.[getMarketFromCommunity(selectedMarketCommunities[0])]?.change ?? metric.change,
      status: metric.markets?.[getMarketFromCommunity(selectedMarketCommunities[0])]?.status ?? metric.status,
    }));
  };

  const filterChartData = (data: any[], isLeasingTimeline: boolean = false, isTechnicianData: boolean = false) => {
    const selectedMarkets = getSelectedMarkets();
    
    if (isTechnicianData) {
      if (selectedMarketCommunities.length === 0 || selectedMarkets.includes('all')) {
        if (viewMode === 'market') {
          return data; // Show all markets in market view
        } else {
          // In community view, show "Average" if no selection
          return data.map(item => ({
            month: item.month,
            Average: Number(item.Average.toFixed(1))
          }));
        }
      }
      
      // For specific market/community, only show technicians from that market
      const marketNames = selectedMarkets.map(market => 
        market.charAt(0).toUpperCase() + market.slice(1)
      );
      
      const techniciansInMarkets = Object.entries(technicianLocations)
        .filter(([_, location]) => marketNames.includes(location))
        .map(([tech]) => tech);

      if (techniciansInMarkets.length === 0) {
        return data.map(item => ({
          month: item.month,
          Average: Number(item.Average.toFixed(1))
        }));
      }

      return data.map(item => {
        const result = { month: item.month };
        
        if (viewMode === 'community') {
          // In community view with selected communities, show individual technicians
          techniciansInMarkets.forEach(tech => {
            result[tech] = Number(item[tech].toFixed(1));
          });
        } else {
          // In market view with selected markets, show market averages
          marketNames.forEach(market => {
            const techsInMarket = Object.entries(technicianLocations)
              .filter(([_, loc]) => loc === market)
              .map(([tech]) => tech);
              
            if (techsInMarket.length > 0) {
              const marketAverage = techsInMarket.reduce((sum, tech) => sum + item[tech], 0) / techsInMarket.length;
              result[`${market}`] = Number(marketAverage.toFixed(1));
            }
          });
        }

        // Add overall average if multiple selections
        if (Object.keys(result).length > 2) {
          result['Average'] = Number(item.Average.toFixed(1));
        }

        return result;
      });
    }

    if (isLeasingTimeline) {
      if (selectedMarketCommunities.length === 0 || selectedMarkets.includes('all')) {
        return data.map(item => ({
          month: item.month,
          'Lead to Sign': item.Average['Lead to Sign'],
          'Sign to Move': item.Average['Sign to Move']
        }));
      }
      
      if (viewMode === 'market' && selectedMarkets.length === 1) {
        const market = selectedMarkets[0].charAt(0).toUpperCase() + selectedMarkets[0].slice(1);
        return data.map(item => ({
          month: item.month,
          'Lead to Sign': item[market]['Lead to Sign'],
          'Sign to Move': item[market]['Sign to Move']
        }));
      }
      
      // Default to average for multiple selections or community view
      return data.map(item => ({
        month: item.month,
        'Lead to Sign': item.Average['Lead to Sign'],
        'Sign to Move': item.Average['Sign to Move']
      }));
    }

    // Logic for other charts
    if (selectedMarketCommunities.length === 0 || selectedMarkets.includes('all')) {
      if (viewMode === 'market') {
        return data; // Show all markets in market view
      } else {
        // In community view with no selection, show average
        return data.map(item => ({
          month: item.month,
          Average: Number(item.Average.toFixed(1))
        }));
      }
    }

    if (viewMode === 'market') {
      // Filter data for selected markets
      return data.map(item => {
        const result = { month: item.month };
        
        selectedMarkets.forEach(market => {
          const formattedMarket = market.charAt(0).toUpperCase() + market.slice(1);
          result[formattedMarket] = item[formattedMarket];
        });
        
        // Add average if multiple markets selected
        if (selectedMarkets.length > 1) {
          result['Average'] = Number(item.Average.toFixed(1));
        }
        
        return result;
      });
    } else {
      // For community view, we would ideally have community-specific data
      // For now, show the market data for the selected communities
      const markets = [...new Set(selectedMarketCommunities.map(getMarketFromCommunity))];
      
      return data.map(item => {
        const result = { month: item.month };
        
        markets.forEach(market => {
          const formattedMarket = market.charAt(0).toUpperCase() + market.slice(1);
          result[formattedMarket] = item[formattedMarket];
        });
        
        // Add average if multiple markets
        if (markets.length > 1) {
          result['Average'] = Number(item.Average.toFixed(1));
        }
        
        return result;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">
            {activeDashboard.name}
          </h2>
          <DashboardSelector 
            dashboards={personalizedDashboards}
            activeDashboard={activeDashboard}
            onSelect={setActiveDashboard}
          />
        </div>
        <div className="flex items-center gap-4">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'market' | 'community')} className="w-[250px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="market">By Market</TabsTrigger>
              <TabsTrigger value="community">By Community</TabsTrigger>
            </TabsList>
          </Tabs>
          <MarketCommunityFilter 
            selectedValues={selectedMarketCommunities} 
            onChange={setSelectedMarketCommunities} 
          />
        </div>
      </div>
      
      <MetricsGrid 
        metrics={filterMetricsBySelection(mockDashboardMetrics)} 
        className="grid-cols-3 lg:grid-cols-6"
        selectedMarket={viewMode}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leasing Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Leasing</h2>
          <Card className="p-4">
            <SimpleLineChart 
              data={filterChartData(mockRenewalsTrendData)} 
              title="Renewals (%) trend by market"
              yAxisLabel="%"
              key={`renewals-${viewMode}-${selectedMarketCommunities.join('-')}`}
            />
          </Card>
          <Card className="p-4">
            <SimpleBarChart 
              data={filterChartData(mockLeasingTimelineTrendData, true)} 
              title="Leasing Timeline Trend"
              yAxisLabel="Days"
              stacked={true}
              bars={[
                { dataKey: 'Lead to Sign', color: '#3391b1', stackId: 'a' },
                { dataKey: 'Sign to Move', color: '#7bccee', stackId: 'a' }
              ]}
              key={`timeline-${viewMode}-${selectedMarketCommunities.join('-')}`}
            />
          </Card>
        </div>

        {/* Property Ops Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Property Operations</h2>
          <Card className="p-4">
            <SimpleLineChart 
              data={filterChartData(mockOccupancyTrendData)} 
              title="Occupancy Rate (%) trend by market"
              yAxisLabel="%"
              key={`occupancy-${viewMode}-${selectedMarketCommunities.join('-')}`}
            />
          </Card>
          <Card className="p-4">
            <SimpleLineChart 
              data={filterChartData(mockDelinquencyTrendData)} 
              title="Delinquency Rate (%) trend by market"
              yAxisLabel="%"
              key={`delinquency-${viewMode}-${selectedMarketCommunities.join('-')}`}
            />
          </Card>
        </div>

        {/* Renovation, Maintenance, Turns Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Renovation, Maintenance, Turns</h2>
          <Card className="p-4">
            <SimpleLineChart 
              data={filterChartData(mockBillHoursTrendData, false, true)} 
              title="Billable Hours/ Day/ Technician"
              yAxisLabel="Hours"
              key={`billhours-${viewMode}-${selectedMarketCommunities.join('-')}`}
            />
          </Card>
          <Card className="p-4">
            <SimpleLineChart 
              data={filterChartData(mockWorkOrdersTrendData, false, true)} 
              title="Work Orders/ Day/ Technician"
              yAxisLabel="Orders"
              key={`workorders-${viewMode}-${selectedMarketCommunities.join('-')}`}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
