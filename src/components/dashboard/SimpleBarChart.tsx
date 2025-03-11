import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimpleBarChartProps {
  data: any[];
  title: string;
  xAxisKey?: string;
  yAxisLabel?: string;
  bars?: {
    dataKey: string;
    color: string;
    stackId?: string;
  }[];
  stacked?: boolean;
}

const SimpleBarChart = ({ 
  data, 
  title, 
  xAxisKey = 'month', 
  yAxisLabel,
  bars,
  stacked = false
}: SimpleBarChartProps) => {
  // Calculate global min and max values
  const allValues = data.flatMap(item =>
    Object.entries(item)
      .filter(([key]) => key !== xAxisKey)
      .map(([_, value]) => value as number)
  );
  
  const globalMin = Math.min(...allValues);
  const globalMax = stacked 
    ? Math.max(...data.map(item => 
        Object.entries(item)
          .filter(([key]) => key !== xAxisKey)
          .reduce((sum, [_, value]) => sum + (value as number), 0)
      ))
    : Math.max(...allValues);
  
  // Set the y-axis range with some padding
  const yAxisMin = Math.floor(globalMin * 0.95);
  const yAxisMax = Math.ceil(globalMax * 1.05);

  // Determine bars to display based on data if not provided
  const chartBars = bars || (() => {
    if (!data || data.length === 0) return [];
    
    // Get all keys except the x-axis key
    const firstItem = data[0];
    return Object.keys(firstItem)
      .filter(key => key !== xAxisKey)
      .map((key, index) => ({
        dataKey: key,
        color: index === 0 ? '#3391b1' : '#7bccee',
        stackId: stacked ? 'a' : undefined
      }));
  })();

  return (
    <div className="h-[250px]">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            interval={1}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            label={{ 
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
            domain={[yAxisMin, yAxisMax]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          {chartBars.map((bar, index) => (
            <Bar 
              key={index}
              dataKey={bar.dataKey} 
              fill={bar.color} 
              stackId={bar.stackId}
              name={bar.dataKey}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
