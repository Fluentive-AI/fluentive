
import React from 'react';
import { Tenant } from '@/types';
import StatusBadge from '../shared/StatusBadge';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TenantsTableProps {
  tenants: Tenant[];
}

const TenantsTable = ({ tenants }: TenantsTableProps) => {
  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Unit</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Community (Market)</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Lease End</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rent</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rent Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tenants.map((tenant) => (
            <tr key={tenant.id} className="hover:bg-muted/50">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium">{tenant.name}</div>
                  <div className="text-sm text-gray-500">{tenant.email}</div>
                </div>
              </td>
              <td className="px-4 py-3">{tenant.unit}</td>
              <td className="px-4 py-3">{tenant.community} ({tenant.market})</td>
              <td className="px-4 py-3">{tenant.leaseEnd}</td>
              <td className="px-4 py-3">${tenant.rentAmount.toLocaleString()}</td>
              <td className="px-4 py-3">
                <StatusBadge status={tenant.status as any} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={tenant.rentStatus as any} />
              </td>
              <td className="px-4 py-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  title="See in Yardi"
                  onClick={() => window.open('https://www.yardi.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
          {tenants.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                No tenants found matching the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TenantsTable;
