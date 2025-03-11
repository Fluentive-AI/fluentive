
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
    <div>
      <h3 className="text-base font-medium mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} />
            <YAxis 
              label={{ 
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip />
            <Legend />
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
    </div>
  );
};

export default SimpleBarChart;
