
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

const ReportsPage = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>
      
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BarChart className="h-12 w-12 mb-4 mx-auto text-brand-300" />
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              The Reports page is under development. Soon you'll be able to generate custom reports on property performance, occupancy rates, and financial metrics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
