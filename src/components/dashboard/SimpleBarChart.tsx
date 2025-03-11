import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

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
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      const isFirstQuarter = label.includes('Mar') || label.includes('Apr') || label.includes('May');
      
      return (
        <div 
          className="bg-white p-1.5 border border-gray-200 shadow-md rounded text-xs min-w-[120px]"
          style={{
            transform: isFirstQuarter ? 'translateX(10px)' : 'none'
          }}
        >
          <p className="font-medium text-[10px] text-gray-500">{label}</p>
          <div className="flex flex-col gap-0.5">
            {payload.map((entry, index) => (
              <div 
                key={`item-${index}`} 
                className="flex items-center gap-1.5"
                style={{ 
                  color: entry.color,
                  fontWeight: entry.dataKey === hoveredBar ? 'bold' : 'normal'
                }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span>{`${entry.dataKey}: ${entry.value}`}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

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
          onMouseLeave={() => setHoveredBar(null)}
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
          <Tooltip 
            content={<CustomTooltip />}
            position={{ x: 10, y: -30 }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            offset={15}
            wrapperStyle={{ left: 'auto' }}
          />
          {chartBars.map((bar, index) => (
            <Bar 
              key={index}
              dataKey={bar.dataKey} 
              fill={bar.color} 
              stackId={bar.stackId}
              name={bar.dataKey}
              onMouseOver={() => setHoveredBar(bar.dataKey)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
