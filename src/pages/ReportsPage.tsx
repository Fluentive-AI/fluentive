
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  mockOccupancyTrendData, 
  mockRenewalsTrendData,
  mockDelinquencyTrendData
} from '@/data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ReportsPage = () => {
  const [selectedMarket, setSelectedMarket] = useState('Average');
  
  const formatYAxis = (value: number) => `${value}%`;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Market:</span>
          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Average">All Markets (Average)</SelectItem>
              <SelectItem value="Atlanta">Atlanta</SelectItem>
              <SelectItem value="Tampa">Tampa</SelectItem>
              <SelectItem value="Jacksonville">Jacksonville</SelectItem>
              <SelectItem value="Orlando">Orlando</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="occupancy" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="occupancy">Occupancy Rate</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="delinquency">Delinquency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="occupancy">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate Trend</CardTitle>
              <CardDescription>Monthly occupancy rates over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockOccupancyTrendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[90, 95]} tickFormatter={formatYAxis} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={selectedMarket}
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="renewals">
          <Card>
            <CardHeader>
              <CardTitle>Renewals Trend</CardTitle>
              <CardDescription>Monthly renewal rates over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockRenewalsTrendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[65, 75]} tickFormatter={formatYAxis} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={selectedMarket}
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delinquency">
          <Card>
            <CardHeader>
              <CardTitle>Delinquency Trend</CardTitle>
              <CardDescription>Monthly delinquency rates over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockDelinquencyTrendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[2, 4]} tickFormatter={formatYAxis} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={selectedMarket}
                      stroke="#dc2626"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
