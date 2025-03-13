
import React, { useState, useEffect } from 'react';
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
import { ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import DashboardSelector from '@/components/dashboard/DashboardSelector';
import CreateDashboardDialog from '@/components/dashboard/CreateDashboardDialog';
import AddMetricCardDialog from '@/components/dashboard/AddMetricCardDialog';
import AddGraphDialog from '@/components/dashboard/AddGraphDialog';
import { toast } from 'sonner';

interface DashboardCard {
  id: number;
  title: string;
  type: string;
  kpi: string;
  timeframe: string;
  market: string;
  category: string;
}

interface Dashboard {
  id: string;
  name: string;
  isDefault?: boolean;
  cards?: DashboardCard[];
  metrics?: DashboardMetric[];
}

interface DashboardMetric {
  id: number;
  title: string;
  value: number | string;
  change: number;
  status: 'neutral' | 'up' | 'down' | 'increase_good' | 'increase_bad' | 'decrease_good' | 'decrease_bad';
  format?: string;
}

const initialDashboards: Dashboard[] = [
  { 
    id: '1', 
    name: 'Default Overview', 
    isDefault: true,
    cards: [
      { id: 1, title: 'Occupancy Rate', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 2, title: 'Renewals', type: 'line', kpi: 'renewals', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 3, title: 'Maintenance Metrics', type: 'line', kpi: 'resolution-time', timeframe: 'month', market: 'all', category: 'maintenance' }
    ]
  },
  { 
    id: '2', 
    name: 'Leasing Focus', 
    isDefault: false,
    cards: [
      { id: 1, title: 'Leasing Velocity', type: 'bar', kpi: 'leasing-velocity', timeframe: 'quarter', market: 'all', category: 'leasing' },
      { id: 2, title: 'Occupancy by Market', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 3, title: 'Renewal Trends', type: 'line', kpi: 'renewals', timeframe: 'year', market: 'all', category: 'leasing' }
    ]
  },
  { 
    id: '3', 
    name: 'Maintenance KPIs', 
    isDefault: false,
    cards: [
      { id: 1, title: 'Work Order Resolution', type: 'line', kpi: 'resolution-time', timeframe: 'month', market: 'all', category: 'maintenance' },
      { id: 2, title: 'Billable Hours', type: 'line', kpi: 'billable-hours', timeframe: 'month', market: 'all', category: 'maintenance' },
      { id: 3, title: 'Work Orders per Tech', type: 'bar', kpi: 'work-orders', timeframe: 'month', market: 'all', category: 'maintenance' }
    ]
  },
  { 
    id: '4', 
    name: 'Occupancy Tracker', 
    isDefault: false,
    cards: [
      { id: 1, title: 'Occupancy Trends', type: 'line', kpi: 'occupancy', timeframe: 'year', market: 'all', category: 'leasing' },
      { id: 2, title: 'Delinquency Rate', type: 'line', kpi: 'delinquency', timeframe: 'quarter', market: 'all', category: 'operations' }
    ] 
  }
];

const Dashboard = () => {
  const [selectedMarketCommunities, setSelectedMarketCommunities] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'market' | 'community'>('market');
  const [dashboards, setDashboards] = useState<Dashboard[]>(initialDashboards);
  const [activeDashboard, setActiveDashboard] = useState<Dashboard>(dashboards[0]);
  const [createDashboardOpen, setCreateDashboardOpen] = useState(false);
  const [addMetricCardOpen, setAddMetricCardOpen] = useState(false);
  const [addGraphOpen, setAddGraphOpen] = useState(false);
  const [customMetrics, setCustomMetrics] = useState<DashboardMetric[]>([]);

  useEffect(() => {
    const handleCreateDashboardEvent = (event: CustomEvent) => {
      if (event.detail?.action === 'open') {
        setCreateDashboardOpen(true);
      }
    };

    document.addEventListener('create-dashboard', handleCreateDashboardEvent as EventListener);
    
    return () => {
      document.removeEventListener('create-dashboard', handleCreateDashboardEvent as EventListener);
    };
  }, []);

  const getMarketFromCommunity = (community: string): string => {
    return community.split('/')[0];
  };

  const getSelectedMarkets = (): string[] => {
    if (selectedMarketCommunities.length === 0) return ['all'];
    
    const markets = selectedMarketCommunities.map(getMarketFromCommunity);
    return [...new Set(markets)];
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
          return data;
        } else {
          return data.map(item => ({
            month: item.month,
            Average: Number(item.Average.toFixed(1))
          }));
        }
      }
      
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
          techniciansInMarkets.forEach(tech => {
            result[tech] = Number(item[tech].toFixed(1));
          });
        } else {
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
      
      return data.map(item => ({
        month: item.month,
        'Lead to Sign': item.Average['Lead to Sign'],
        'Sign to Move': item.Average['Sign to Move']
      }));
    }

    if (selectedMarketCommunities.length === 0 || selectedMarkets.includes('all')) {
      if (viewMode === 'market') {
        return data;
      } else {
        return data.map(item => ({
          month: item.month,
          Average: Number(item.Average.toFixed(1))
        }));
      }
    }

    if (viewMode === 'market') {
      return data.map(item => {
        const result = { month: item.month };
        
        selectedMarkets.forEach(market => {
          const formattedMarket = market.charAt(0).toUpperCase() + market.slice(1);
          result[formattedMarket] = item[formattedMarket];
        });
        
        if (selectedMarkets.length > 1) {
          result['Average'] = Number(item.Average.toFixed(1));
        }
        
        return result;
      });
    } else {
      const markets = [...new Set(selectedMarketCommunities.map(getMarketFromCommunity))];
      
      return data.map(item => {
        const result = { month: item.month };
        
        markets.forEach(market => {
          const formattedMarket = market.charAt(0).toUpperCase() + market.slice(1);
          result[formattedMarket] = item[formattedMarket];
        });
        
        if (markets.length > 1) {
          result['Average'] = Number(item.Average.toFixed(1));
        }
        
        return result;
      });
    }
  };

  const handleDashboardSelect = (dashboard: Dashboard) => {
    setActiveDashboard(dashboard);
  };

  const handleCreateDashboard = (newDashboard: { name: string; cards: DashboardCard[] }) => {
    const dashboardToAdd: Dashboard = {
      id: Date.now().toString(),
      name: newDashboard.name,
      isDefault: false,
      cards: newDashboard.cards
    };
    
    setDashboards([...dashboards, dashboardToAdd]);
    setActiveDashboard(dashboardToAdd);
    setCreateDashboardOpen(false);
    
    toast.success(`Dashboard "${newDashboard.name}" created successfully`);
  };

  const handleAddMetricCard = (metric: DashboardMetric) => {
    setCustomMetrics([...customMetrics, metric]);
    setAddMetricCardOpen(false);
    toast.success("New metric card added successfully");
  };

  const handleAddGraph = (graph: DashboardCard) => {
    const updatedDashboard = { 
      ...activeDashboard,
      cards: [...(activeDashboard.cards || []), graph]
    };
    
    const updatedDashboards = dashboards.map(d => 
      d.id === activeDashboard.id ? updatedDashboard : d
    );
    
    setDashboards(updatedDashboards);
    setActiveDashboard(updatedDashboard);
    setAddGraphOpen(false);
    
    toast.success("New graph added successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">
            {activeDashboard.name}
          </h2>
          <DashboardSelector 
            dashboards={dashboards}
            activeDashboard={activeDashboard}
            onSelect={handleDashboardSelect}
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
      
      <div className="flex items-center justify-between">
        <MetricsGrid 
          metrics={filterMetricsBySelection([...mockDashboardMetrics, ...customMetrics])} 
          className="grid-cols-3 lg:grid-cols-6"
          selectedMarket={viewMode}
        />
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 h-24 bg-white border-dashed border-2 border-gray-200 rounded-lg ml-2 px-4"
          onClick={() => setAddMetricCardOpen(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Add new card</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeDashboard.cards?.map((card, index) => (
          <div key={card.id} className="space-y-6">
            {index === 0 && (
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Leasing</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-10 bg-white border-dashed border-2 border-gray-200 rounded-lg px-4"
                  onClick={() => {
                    setAddGraphOpen(true);
                  }}
                >
                  <Plus className="h-5 w-5" />
                  <span>Add new card</span>
                </Button>
              </div>
            )}
            {index === 1 && (
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Property Operations</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-10 bg-white border-dashed border-2 border-gray-200 rounded-lg px-4"
                  onClick={() => {
                    setAddGraphOpen(true);
                  }}
                >
                  <Plus className="h-5 w-5" />
                  <span>Add new card</span>
                </Button>
              </div>
            )}
            {index === 2 && (
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Renovation, Maintenance, Turns</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-10 bg-white border-dashed border-2 border-gray-200 rounded-lg px-4"
                  onClick={() => {
                    setAddGraphOpen(true);
                  }}
                >
                  <Plus className="h-5 w-5" />
                  <span>Add new card</span>
                </Button>
              </div>
            )}
            
            <Card className="p-4">
              {card.type === 'line' ? (
                <SimpleLineChart 
                  data={filterChartData(
                    card.kpi === 'occupancy' ? mockOccupancyTrendData :
                    card.kpi === 'renewals' ? mockRenewalsTrendData :
                    card.kpi === 'delinquency' ? mockDelinquencyTrendData :
                    card.kpi === 'billable-hours' ? mockBillHoursTrendData :
                    card.kpi === 'work-orders' ? mockWorkOrdersTrendData :
                    mockRenewalsTrendData
                  )} 
                  title={card.title}
                  yAxisLabel={card.kpi.includes('time') ? 'Days' : '%'}
                  key={`${card.id}-${viewMode}-${selectedMarketCommunities.join('-')}`}
                />
              ) : (
                <SimpleBarChart 
                  data={filterChartData(
                    card.kpi === 'leasing-velocity' ? mockLeasingTimelineTrendData :
                    card.kpi === 'occupancy' ? mockOccupancyTrendData :
                    card.kpi === 'work-orders' ? mockWorkOrdersTrendData :
                    mockRenewalsTrendData,
                    card.kpi === 'leasing-velocity'
                  )} 
                  title={card.title}
                  yAxisLabel={card.kpi.includes('time') ? 'Days' : '%'}
                  stacked={card.kpi === 'leasing-velocity'}
                  bars={card.kpi === 'leasing-velocity' ? [
                    { dataKey: 'Lead to Sign', color: '#3391b1', stackId: 'a' },
                    { dataKey: 'Sign to Move', color: '#7bccee', stackId: 'a' }
                  ] : undefined}
                  key={`${card.id}-${viewMode}-${selectedMarketCommunities.join('-')}`}
                />
              )}
            </Card>
          </div>
        ))}

        {(!activeDashboard.cards || activeDashboard.cards.length === 0) && (
          <>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Leasing</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-10 bg-white border-dashed border-2 border-gray-200 rounded-lg px-4"
                  onClick={() => {
                    setAddGraphOpen(true);
                  }}
                >
                  <Plus className="h-5 w-5" />
                  <span>Add new card</span>
                </Button>
              </div>
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

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Property Operations</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-10 bg-white border-dashed border-2 border-gray-200 rounded-lg px-4"
                  onClick={() => {
                    setAddGraphOpen(true);
                  }}
                >
                  <Plus className="h-5 w-5" />
                  <span>Add new card</span>
                </Button>
              </div>
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

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Renovation, Maintenance, Turns</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-10 bg-white border-dashed border-2 border-gray-200 rounded-lg px-4"
                  onClick={() => {
                    setAddGraphOpen(true);
                  }}
                >
                  <Plus className="h-5 w-5" />
                  <span>Add new card</span>
                </Button>
              </div>
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
          </>
        )}
      </div>

      <CreateDashboardDialog 
        open={createDashboardOpen}
        onOpenChange={setCreateDashboardOpen}
        onSave={handleCreateDashboard}
      />

      <AddMetricCardDialog
        open={addMetricCardOpen}
        onOpenChange={setAddMetricCardOpen}
        onSave={handleAddMetricCard}
      />

      <AddGraphDialog
        open={addGraphOpen}
        onOpenChange={setAddGraphOpen}
        onSave={handleAddGraph}
      />
    </div>
  );
};

export default Dashboard;
