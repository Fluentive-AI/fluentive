
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types';

interface SimpleBarChartProps {
  data: ChartData[];
  title: string;
  dataKey?: string;
  yAxisLabel?: string;
}

const SimpleBarChart = ({ data, title, dataKey = 'value', yAxisLabel }: SimpleBarChartProps) => {
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
            <XAxis dataKey="name" />
            <YAxis 
              label={{ 
                value: yAxisLabel,
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#3391b1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleBarChart;
