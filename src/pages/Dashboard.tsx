import React, { useState } from 'react';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import MarketFilter from '@/components/dashboard/MarketFilter';
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

const Dashboard = () => {
  const [selectedMarket, setSelectedMarket] = useState('all');

  const filterMetricsByMarket = (metrics: typeof mockDashboardMetrics) => {
    if (selectedMarket === 'total' || selectedMarket === 'all') {
      return metrics;
    }

    return metrics.map(metric => ({
      ...metric,
      value: metric.markets?.[selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1)]?.value ?? metric.value,
      change: metric.markets?.[selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1)]?.change ?? metric.change,
      status: metric.markets?.[selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1)]?.status ?? metric.status,
    }));
  };

  const filterChartData = (data: any[], isLeasingTimeline: boolean = false, isTechnicianData: boolean = false) => {
    if (isTechnicianData) {
      if (selectedMarket === 'total') {
        return data.map(item => ({
          month: item.month,
          Average: Number(item.Average.toFixed(1))
        }));
      }
      
      if (selectedMarket === 'all') {
        return data;
      }

      // For specific market, only show technicians from that market
      const marketName = selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1);
      const techniciansInMarket = Object.entries(technicianLocations)
        .filter(([_, location]) => location === marketName)
        .map(([tech]) => tech);

      if (techniciansInMarket.length === 0) {
        return data.map(item => ({
          month: item.month,
          Average: Number(item.Average.toFixed(1))
        }));
      }

      return data.map(item => {
        const result = { month: item.month };
        
        // Add individual technicians
        techniciansInMarket.forEach(tech => {
          result[tech] = Number(item[tech].toFixed(1));
        });

        // Calculate and add market-specific average
        if (techniciansInMarket.length > 0) {
          const marketAverage = techniciansInMarket.reduce((sum, tech) => sum + item[tech], 0) / techniciansInMarket.length;
          result[`${marketName} Average`] = Number(marketAverage.toFixed(1));
        }

        return result;
      });
    }

    if (isLeasingTimeline) {
      if (selectedMarket === 'total') {
        return data.map(item => ({
          month: item.month,
          'Lead to Sign': item.Average['Lead to Sign'],
          'Sign to Move': item.Average['Sign to Move']
        }));
      }
      if (selectedMarket === 'all') {
        return data.map(item => ({
          month: item.month,
          'Lead to Sign': item.Average['Lead to Sign'],
          'Sign to Move': item.Average['Sign to Move']
        }));
      }
      return data.map(item => ({
        month: item.month,
        'Lead to Sign': item[selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1)]['Lead to Sign'],
        'Sign to Move': item[selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1)]['Sign to Move']
      }));
    }

    // Original logic for other charts
    if (selectedMarket === 'total') {
      return data.map(item => ({
        month: item.month,
        Average: Number(item.Average.toFixed(1))
      }));
    }
    if (selectedMarket === 'all') return data;

    return data.map(item => ({
      month: item.month,
      [selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1)]: item[selectedMarket.charAt(0).toUpperCase() + selectedMarket.slice(1)],
      Average: Number(item.Average.toFixed(1))
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <MarketFilter 
          selectedMarket={selectedMarket} 
          onMarketChange={setSelectedMarket} 
        />
      </div>
      
      <MetricsGrid 
        metrics={filterMetricsByMarket(mockDashboardMetrics)} 
        className="grid-cols-3 lg:grid-cols-6"
        selectedMarket={selectedMarket}
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
            />
          </Card>
          <Card className="p-4">
            <SimpleLineChart 
              data={filterChartData(mockDelinquencyTrendData)} 
              title="Delinquency Rate (%) trend by market"
              yAxisLabel="%"
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
              key={selectedMarket}
            />
          </Card>
          <Card className="p-4">
            <SimpleLineChart 
              data={filterChartData(mockWorkOrdersTrendData, false, true)} 
              title="Work Orders/ Day/ Technician"
              yAxisLabel="Orders"
              key={selectedMarket}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
