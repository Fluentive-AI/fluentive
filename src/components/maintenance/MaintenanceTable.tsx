
import React from 'react';
import { MaintenanceRequest } from '@/types';
import StatusBadge from '../shared/StatusBadge';

interface MaintenanceTableProps {
  requests: MaintenanceRequest[];
}

const MaintenanceTable = ({ requests }: MaintenanceTableProps) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Unit</th>
            <th>Issue</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.tenantName}</td>
              <td>{request.unit}</td>
              <td>
                <div>
                  <div className="font-medium">{request.issue}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{request.description}</div>
                </div>
              </td>
              <td>{request.dateSubmitted}</td>
              <td>
                <StatusBadge status={request.priority} />
              </td>
              <td>
                <StatusBadge status={request.status} />
              </td>
              <td>{request.scheduledDate || 'Not scheduled'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceTable;
