import React, { useState, useEffect, KeyboardEvent } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Lead } from '@/types';

const STATUS_TYPES = [
  { value: 'new', label: 'New Lead' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'tour_scheduled', label: 'Scheduled Tour' },
  { value: 'application_sent', label: 'Application Sent' },
  { value: 'application_received', label: 'Application Received' },
  { value: 'closed_won', label: 'Closed Won' },
  { value: 'closed_lost', label: 'Closed Lost' }
];

interface FilterDialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnName: string;
  columnKey: string;
  onFilter: (value: string) => void;
  currentFilter?: string;
  data: T[];
  trigger: React.ReactNode;
}

const FilterDialog = <T extends Record<string, any>>({
  open,
  onOpenChange,
  columnName,
  columnKey,
  onFilter,
  currentFilter,
  data,
  trigger
}: FilterDialogProps<T>) => {
  const [value, setValue] = useState(currentFilter || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (value) {
      let filteredSuggestions: string[];
      
      if (columnKey === 'status') {
        // For status column, use predefined status types
        filteredSuggestions = STATUS_TYPES
          .filter(status => status.label.toLowerCase().includes(value.toLowerCase()))
          .map(status => status.label)
          .slice(0, 5);
      } else {
        // For other columns, use existing logic
        const uniqueValues = new Set(
          data.map(item => String(item[columnKey] || ''))
        );
        
        filteredSuggestions = Array.from(uniqueValues)
          .filter(val => val.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 5);
      }
      
      setSuggestions(filteredSuggestions);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }, [value, data, columnKey]);

  const handleApply = () => {
    if (columnKey === 'status') {
      // Convert status label back to value before applying filter
      const statusType = STATUS_TYPES.find(status => status.label === value);
      onFilter(statusType ? statusType.value : value);
    } else {
      onFilter(value);
    }
    onOpenChange(false);
  };

  const handleClear = () => {
    setValue('');
    onFilter('');
    onOpenChange(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const selectedValue = suggestions[selectedIndex];
          setValue(selectedValue);
          handleApply();
        } else {
          handleApply();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onOpenChange(false);
        break;
    }
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="filter"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search ${columnName}...`}
              className="pl-8"
              autoFocus
            />
          </div>
          {suggestions.length > 0 && (
            <div className="mt-2 border rounded-md">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer ${
                    index === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 p-4 border-t">
          <Button variant="outline" size="sm" onClick={handleClear}>
            Clear
          </Button>
          <Button size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterDialog; 