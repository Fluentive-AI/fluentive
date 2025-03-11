
import React from 'react';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import { 
  mockDashboardMetrics, 
  mockLeadMetrics,
  mockOccupancyData,
  mockDelinquencyData,
  mockBillHoursData,
  mockWorkOrdersData
} from '@/data/mockData';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <MetricsGrid 
        metrics={mockDashboardMetrics} 
        title="Overview" 
        className="grid-cols-3 lg:grid-cols-6"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leasing Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Leasing</h2>
          <Card className="p-4">
            <SimpleLineChart 
              data={mockOccupancyData} 
              title="% Renewals trend"
              yAxisLabel="%"
            />
          </Card>
          <Card className="p-4">
            <SimpleBarChart 
              data={[
                { name: 'Lead to Sign', value: 15 },
                { name: 'Sign to Move', value: 30 }
              ]} 
              title="Leasing Timeline Trend"
              yAxisLabel="Days"
            />
          </Card>
        </div>

        {/* Property Ops Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Property Ops</h2>
          <Card className="p-4">
            <SimpleLineChart 
              data={mockOccupancyData} 
              title="Occupancy Rate Trend by Market"
              yAxisLabel="%"
            />
          </Card>
          <Card className="p-4">
            <SimpleLineChart 
              data={mockDelinquencyData} 
              title="Delinquency Rate Trend by Market"
              yAxisLabel="%"
            />
          </Card>
        </div>

        {/* Renovation, Maintenance, Turns Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Renovation, Maintenance, Turns</h2>
          <Card className="p-4">
            <SimpleLineChart 
              data={mockBillHoursData} 
              title="Bill Hours/Day/Technician"
              yAxisLabel="Hours"
            />
          </Card>
          <Card className="p-4">
            <SimpleLineChart 
              data={mockWorkOrdersData} 
              title="Work Orders/Day/Technician"
              yAxisLabel="Orders"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
