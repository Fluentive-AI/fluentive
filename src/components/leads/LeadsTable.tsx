import React, { useState } from 'react';
import { Lead, Application } from '@/types';
import StatusBadge from '../shared/StatusBadge';
import { ExternalLink, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadDialog from './LeadDialog';
import FilterDialog from './FilterDialog';

interface LeadsTableProps {
  leads: Lead[];
}

const LeadsTable = ({ leads }: LeadsTableProps) => {
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

  const filteredAndSortedLeads = React.useMemo(() => {
    let result = [...leads];

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(lead => 
          String(lead[key as keyof Lead]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Lead];
        const bValue = b[sortConfig.key as keyof Lead];
        if (sortConfig.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }

    return result;
  }, [leads, filters, sortConfig]);

  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted">
          <tr>
            {[
              { key: 'name', label: 'Lead Info', width: 'w-[250px]' },
              { key: 'propertyInterest', label: 'Unit Address', width: 'w-[200px]' },
              { key: 'assignedTo', label: 'Agent', width: 'w-[150px]' },
              { key: 'community', label: 'Community', width: 'w-[200px]' },
              { key: 'status', label: 'Status', width: 'w-[180px]' },
              { key: 'dateCreated', label: 'Created', width: 'w-[120px]' },
              { key: 'tourScheduled', label: 'Tour Date', width: 'w-[120px]' },
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
                        data={leads}
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
          {filteredAndSortedLeads.map((lead) => (
            <LeadDialog
              key={lead.id}
              lead={lead}
              trigger={
                <tr className="hover:bg-muted/50 cursor-pointer">
                  <td className="px-4 py-3 w-[250px]">
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 w-[200px]">{lead.propertyInterest}</td>
                  <td className="px-4 py-3 w-[150px]">{lead.assignedTo || 'Unassigned'}</td>
                  <td className="px-4 py-3 w-[200px]">{lead.community} ({lead.market})</td>
                  <td className="px-4 py-3 w-[180px]">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 w-[120px]">{lead.dateCreated}</td>
                  <td className="px-4 py-3 w-[120px]">{lead.tourScheduled || 'Not scheduled'}</td>
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
              }
            />
          ))}
          {filteredAndSortedLeads.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                No leads found matching the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
