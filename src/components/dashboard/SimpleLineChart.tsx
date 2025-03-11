
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimpleLineChartProps {
  data: any[];
  title: string;
  xAxisKey?: string;
  yAxisLabel?: string;
  lines?: {
    dataKey: string;
    color: string;
    strokeWidth?: number;
    isAverage?: boolean;
  }[];
}

const SimpleLineChart = ({ 
  data, 
  title, 
  xAxisKey = 'month', 
  yAxisLabel,
  lines 
}: SimpleLineChartProps) => {
  // Determine lines to display based on data if not provided
  const chartLines = lines || (() => {
    if (!data || data.length === 0) return [];
    
    // Get all keys except the x-axis key
    const firstItem = data[0];
    return Object.keys(firstItem)
      .filter(key => key !== xAxisKey)
      .map((key, index) => {
        const isAverage = key === 'Average';
        return {
          dataKey: key,
          color: isAverage ? '#3391b1' : `hsl(${(index * 30) % 360}, 70%, 65%)`,
          strokeWidth: isAverage ? 3 : 1.5,
          isAverage
        };
      });
  })();

  return (
    <div>
      <h3 className="text-base font-medium mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            {chartLines.map((line, index) => (
              <Line 
                key={index}
                type="monotone" 
                dataKey={line.dataKey} 
                stroke={line.color}
                strokeWidth={line.strokeWidth || (line.isAverage ? 3 : 1.5)}
                dot={false}
                activeDot={line.isAverage ? { r: 6 } : { r: 4 }}
                name={line.dataKey}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleLineChart;
