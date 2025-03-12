
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const ApplicationPage = () => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>
      </div>
      
      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FileText className="h-12 w-12 mb-4 mx-auto text-brand-300" />
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              The Applications page is under development. Check back later for updates on tenant applications and approval status.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationPage;
