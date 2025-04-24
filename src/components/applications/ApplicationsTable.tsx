import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApplicationDialog from './ApplicationDialog';
import FilterDialog from '../leads/FilterDialog';
import { Application } from '@/types/index';

interface StatusObject {
  status: 'completed' | 'pending' | 'failed' | 'approved';
  score?: number;
  verified?: boolean;
}

interface ApplicationsTableProps {
  applications: Application[];
}

const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterDialog, setFilterDialog] = useState<{ key: string; label: string } | null>(null);

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'desc' };
    });
  };

  const handleFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string | StatusObject) => {
    const statusValue = typeof status === 'string' ? status : status.status;
    switch (statusValue.toLowerCase()) {
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'reviewing':
          return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'denied':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (statusValue: string | StatusObject) => {
    const status = typeof statusValue === 'string' ? statusValue : statusValue.status;
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredAndSortedApplications = React.useMemo(() => {
    let result = [...applications];

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(application => 
          String(application[key as keyof Application]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Application];
        const bValue = b[sortConfig.key as keyof Application];
        if (sortConfig.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }

    return result;
  }, [applications, filters, sortConfig]);

  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted">
          <tr>
            {[
              { key: 'name', label: 'Lead Info', width: 'w-[250px]' },
              { key: 'propertyInterest', label: 'Unit Address', width: 'w-[200px]' },
              { key: 'dateSubmitted', label: 'Submitted', width: 'w-[150px]' },
              { key: 'assignedTo', label: 'Agent', width: 'w-[150px]' },
              { key: 'status', label: 'Status', width: 'w-[150px]' },
              { key: 'backgroundCheck', label: 'Screening', width: 'w-[180px]' },
              { key: 'creditCheck', label: 'Credit Check', width: 'w-[180px]' },
              { key: 'incomeVerification', label: 'Income Check', width: 'w-[180px]' },
              { key: 'yardi', label: 'See in Yardi', width: 'w-[100px]' }
            ].map(({ key, label, width }) => (
              <th key={key} className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${width}`}>
                <div className="flex flex-col h-full">
                  <span className="flex-grow">{label}</span>
                  {key !== 'yardi' && (
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 ${sortConfig?.key === key ? 'bg-primary/10 hover:bg-primary/20' : ''}`}
                        onClick={() => handleSort(key)}
                      >
                        {sortConfig ? (
                          sortConfig.direction === 'asc' ? 
                            <ArrowDown className={`h-4 w-4 ${sortConfig.key === key ? 'text-primary' : 'opacity-50'}`} /> : 
                            <ArrowUp className={`h-4 w-4 ${sortConfig.key === key ? 'text-primary' : 'opacity-50'}`} />
                        ) : <ArrowDown className="h-4 w-4 opacity-50" />}
                      </Button>
                      <FilterDialog
                        open={filterDialog?.key === key}
                        onOpenChange={(open) => !open && setFilterDialog(null)}
                        columnName={label}
                        columnKey={key}
                        onFilter={(value) => handleFilter(key, value)}
                        currentFilter={filters[key]}
                        data={applications}
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-6 w-6 ${filters[key] ? 'bg-primary/10 hover:bg-primary/20' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (filters[key]) {
                                // If there's an active filter, clear it
                                handleFilter(key, '');
                              } else {
                                // If no active filter, open the filter dialog
                                setFilterDialog({ key, label });
                              }
                            }}
                          >
                            <Filter className={`h-4 w-4 ${filters[key] ? 'text-primary' : ''}`} />
                          </Button>
                        }
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {filteredAndSortedApplications.map((application: Application) => (
            <tr key={application.id} className="hover:bg-muted/50 cursor-pointer">
              <td className="px-4 py-3 w-[250px]">
                <div>
                  <div className="font-medium">{application.applicantName}</div>
                  <div className="text-sm text-gray-500">{application.email}</div>
                </div>
              </td>
              <td className="px-4 py-3 w-[200px]">{application.propertyInterest}</td>
              <td className="px-4 py-3 w-[150px]">{application.dateSubmitted}</td>
              <td className="px-4 py-3 w-[150px]">{application.assignedTo || 'Unassigned'}</td>
              <td className="px-4 py-3 w-[150px]">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                  {formatStatus(application.status)}
                </span>
              </td>
              <td className="px-4 py-3 w-[150px]">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.backgroundCheck)}`}>
                  {formatStatus(application.backgroundCheck)}
                </span>
              </td>
              <td className="px-4 py-3 w-[150px]">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.creditCheck)}`}>
                  {formatStatus(application.creditCheck)}
                </span>
              </td>
              <td className="px-4 py-3 w-[150px]">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.incomeVerification)}`}>
                  {formatStatus(application.incomeVerification)}
                </span>
              </td>
              <td className="px-4 py-3 w-[100px]">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  title="See in Yardi"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://www.yardi.com', '_blank');
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
          {filteredAndSortedApplications.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                No applications found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable; 