import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AgentFilterProps {
  agents: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const AgentFilter: React.FC<AgentFilterProps> = ({
  agents,
  selectedValues,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const toggleAll = () => {
    const allValues = agents;
    const hasAll = allValues.every(value => selectedValues.includes(value));
    onChange(hasAll ? [] : allValues);
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return 'All Agents';
    if (selectedValues.length === agents.length) return 'All Agents';
    
    if (selectedValues.length <= 2) {
      return selectedValues.join(', ');
    }
    
    return `${selectedValues.length} selected`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 justify-between min-w-[150px] max-w-[200px]"
        >
          <span className="truncate">{getSelectedText()}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-4" align="end">
        <div className="space-y-2">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-brand-600"
            onClick={toggleAll}
          >
            <div className={cn(
              "h-5 w-5 rounded border flex items-center justify-center transition-colors",
              selectedValues.length === agents.length && "bg-brand-600 border-brand-600",
              selectedValues.length > 0 && selectedValues.length < agents.length && "border-brand-600",
              selectedValues.length === 0 && "border-gray-200"
            )}>
              {selectedValues.length === agents.length && <Check className="h-4 w-4 text-white" />}
              {selectedValues.length > 0 && selectedValues.length < agents.length && (
                <div className="h-2.5 w-2.5 rounded-sm bg-brand-600"></div>
              )}
            </div>
            <span className="font-medium">All Agents</span>
          </div>
          <div className="space-y-1 pl-4">
            {agents.map((agent) => {
              return (
                <div 
                  key={agent} 
                  className="grid grid-cols-[20px,1fr] gap-2 cursor-pointer text-[13px] hover:text-brand-600 h-[32px] items-center"
                  onClick={() => toggleOption(agent)}
                >
                  <div className={cn(
                    "h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                    selectedValues.includes(agent) && "bg-brand-600 border-brand-600",
                    !selectedValues.includes(agent) && "border-gray-200"
                  )}>
                    {selectedValues.includes(agent) && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <span className="leading-tight text-gray-600">
                    {agent}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AgentFilter; 