
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
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Community (Market)</th>
            <th>Lease End</th>
            <th>Rent</th>
            <th>Status</th>
            <th>Rent Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>
                <div>
                  <div className="font-medium">{tenant.name}</div>
                  <div className="text-sm text-gray-500">{tenant.email}</div>
                </div>
              </td>
              <td>{tenant.unit}</td>
              <td>{tenant.community} ({tenant.market})</td>
              <td>{tenant.leaseEnd}</td>
              <td>${tenant.rentAmount.toLocaleString()}</td>
              <td>
                <StatusBadge status={tenant.status as any} />
              </td>
              <td>
                <StatusBadge status={tenant.rentStatus as any} />
              </td>
              <td>
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
        </tbody>
      </table>
    </div>
  );
};

export default TenantsTable;
