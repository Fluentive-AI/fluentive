import React, { useState } from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

interface SimpleLineChartProps {
  data: any[];
  title?: string;
  yAxisLabel?: string;
}

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, title, yAxisLabel }) => {
  // State to track the currently hovered line
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  // Calculate global min and max values across all data points
  const allValues = data.flatMap(item =>
    Object.entries(item)
      .filter(([key]) => key !== 'month')
      .map(([_, value]) => value as number)
  );
  
  const globalMin = Math.min(...allValues);
  const globalMax = Math.max(...allValues);
  
  // Set the y-axis range with some padding
  const yAxisMin = Math.floor(globalMin * 0.95);
  const yAxisMax = Math.ceil(globalMax * 1.05);

  // Custom tooltip component that positions to the right of the cursor
  const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      // Check if we're in the first quarter (Mar/Apr/May)
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
                  fontWeight: entry.dataKey === hoveredLine ? 'bold' : 'normal'
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

  return (
    <div className="h-[250px]">
      <h3 className="text-sm font-medium mb-4">{title}</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onMouseLeave={() => setHoveredLine(null)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
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
            cursor={{ strokeDasharray: '3 3' }}
            offset={15}
            wrapperStyle={{ left: 'auto' }}
          />
          {Object.keys(data[0])
            .filter(key => key !== 'month')
            .map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={getLineColor(index)}
                strokeWidth={key === hoveredLine ? 3 : key === 'Average' ? 2 : 1}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2 }}
                onMouseOver={(_, event) => {
                  setHoveredLine(key);
                }}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const getLineColor = (index: number): string => {
  const colors = [
    '#0369a1', // Professional blue
    '#15803d', // Forest green
    '#8250df', // Muted purple
    '#b45309', // Warm brown
    '#000000', // Black (for Average)
  ];
  return colors[index % colors.length];
};

export default SimpleLineChart;