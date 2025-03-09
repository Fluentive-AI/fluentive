
import React from 'react';
import { Lead } from '@/types';
import StatusBadge from '../shared/StatusBadge';

interface LeadsTableProps {
  leads: Lead[];
}

const LeadsTable = ({ leads }: LeadsTableProps) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Property Interest</th>
            <th>Source</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Tour Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </div>
              </td>
              <td>{lead.propertyInterest}</td>
              <td>{lead.source}</td>
              <td>
                <StatusBadge status={lead.status} />
              </td>
              <td>{lead.dateCreated}</td>
              <td>{lead.tourScheduled || 'Not scheduled'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
