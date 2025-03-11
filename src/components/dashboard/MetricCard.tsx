import React from 'react';
import { cn } from '@/lib/utils';
import { MetricData } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  metric: MetricData;
  className?: string;
  selectedMarket: string;
}

const MetricCard = ({ metric, className, selectedMarket }: MetricCardProps) => {
  const { label, value, change, status, markets } = metric;
  
  const getStatusIcon = () => {
    if (status === 'increase_good') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (status === 'increase_bad') return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (status === 'decrease_good') return <TrendingDown className="h-4 w-4 text-green-500" />;
    if (status === 'decrease_bad') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };
  
  const getStatusColor = () => {
    if (status === 'increase_good') return 'text-green-500';
    if (status === 'increase_bad') return 'text-red-500';
    if (status === 'decrease_good') return 'text-green-500';
    if (status === 'decrease_bad') return 'text-red-500';
    return 'text-gray-500';
  };
  
  const isPercentageMetric = label.includes('Rate') || label.includes('Occupancy') || label.includes('Delinq') || label.includes('Renewals') || label.includes('Increase');
  
  const formatValue = (val: number) => {
    if (isPercentageMetric) {
      return val.toFixed(1); // Always show one decimal place for percentage metrics
    }
    return val;
  };
  
  return (
    <div className={cn('bg-white rounded-lg shadow-sm p-4 border border-gray-100', className)}>
      <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
      <div className="flex flex-col">
        {/* Main metric (total) */}
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold">
            {formatValue(value)}
            {label.includes('Rate') || label.includes('Occupancy') || label.includes('Delinq') || label.includes('Renewals') || label.includes('Increase') ? '%' : ''}
            {label.includes('Resolution Time') ? ' days' : ''}
          </p>
          {change !== undefined && (
            <p className={cn('ml-2 flex items-center text-sm', getStatusColor())}>
              {getStatusIcon()}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </p>
          )}
        </div>

        {/* Market-specific metrics (shown only when 'all' is selected) */}
        {markets && selectedMarket === 'all' && (
          <div className="mt-2 space-y-1 border-t pt-2">
            {Object.entries(markets).map(([market, data]) => (
              <div key={market} className="flex items-baseline justify-between text-xs text-gray-500">
                <span>{market}:</span>
                <div className="flex items-baseline">
                  <span className="font-medium">
                    {formatValue(data.value)}
                    {label.includes('Rate') || label.includes('Occupancy') || label.includes('Delinq') || label.includes('Renewals') || label.includes('Increase') ? '%' : ''}
                    {label.includes('Resolution Time') ? ' days' : ''}
                  </span>
                  {data.change !== undefined && (
                    <span className={cn('ml-1 flex items-center', 
                      data.status?.includes('good') ? 'text-green-500' : 
                      data.status?.includes('bad') ? 'text-red-500' : 
                      'text-gray-500'
                    )}>
                      ({data.change > 0 ? '+' : ''}{data.change.toFixed(1)}%)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
