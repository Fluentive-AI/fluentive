
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface CategoryOption {
  name: string;
  options: { value: string; label: string }[];
}

interface ScenarioFilterProps {
  options: CategoryOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const ScenarioFilter: React.FC<ScenarioFilterProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleCategory = (categoryName: string) => {
    const category = options.find(c => c.name === categoryName);
    if (!category) return;

    const categoryValues = category.options.map(opt => opt.value);
    const allCategoryValuesSelected = categoryValues.every(value => 
      selectedValues.includes(value)
    );

    let newSelectedValues: string[];
    
    if (allCategoryValuesSelected) {
      // Deselect all options in the category
      newSelectedValues = selectedValues.filter(value => !categoryValues.includes(value));
    } else {
      // Select all options in the category
      const valuesToAdd = categoryValues.filter(value => !selectedValues.includes(value));
      newSelectedValues = [...selectedValues, ...valuesToAdd];
    }
    
    onChange(newSelectedValues);
  };

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    
    onChange(newSelectedValues);
  };

  const isCategorySelected = (categoryName: string) => {
    const category = options.find(c => c.name === categoryName);
    if (!category) return false;
    
    const categoryValues = category.options.map(opt => opt.value);
    return categoryValues.some(value => selectedValues.includes(value));
  };

  const isCategoryFullySelected = (categoryName: string) => {
    const category = options.find(c => c.name === categoryName);
    if (!category) return false;
    
    const categoryValues = category.options.map(opt => opt.value);
    return categoryValues.every(value => selectedValues.includes(value));
  };

  const getSelectedText = () => {
    if (selectedValues.length === 0) return 'All Scenarios';
    
    const categorySelections = options
      .filter(category => 
        category.options.some(option => selectedValues.includes(option.value))
      )
      .map(category => {
        const categoryValues = category.options.map(opt => opt.value);
        const allSelected = categoryValues.every(value => selectedValues.includes(value));
        
        if (allSelected) return category.name;
        
        const selectedLabels = category.options
          .filter(option => selectedValues.includes(option.value))
          .map(option => option.label.split('/').pop());
        
        return `${category.name} (${selectedLabels.join(', ')})`;
      });
    
    return categorySelections.join(', ');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[200px] max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {getSelectedText()}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] max-h-[500px] overflow-auto p-0">
        <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          {options.map((category) => (
            <div key={category.name} className="space-y-2 p-2">
              <div 
                className="flex items-center gap-2 font-semibold cursor-pointer"
                onClick={() => toggleCategory(category.name)}
              >
                <div className={cn(
                  "h-5 w-5 border border-gray-300 rounded flex items-center justify-center",
                  isCategoryFullySelected(category.name) && "bg-primary border-primary"
                )}>
                  {isCategoryFullySelected(category.name) && <Check className="h-4 w-4 text-white" />}
                  {isCategorySelected(category.name) && !isCategoryFullySelected(category.name) && (
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  )}
                </div>
                <span className="text-sm">All {category.name}</span>
              </div>
              <div className="ml-6 space-y-1">
                {category.options.map((option) => (
                  <div 
                    key={option.value} 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleOption(option.value)}
                  >
                    <div className={cn(
                      "h-4 w-4 border border-gray-300 rounded flex items-center justify-center",
                      selectedValues.includes(option.value) && "bg-primary border-primary"
                    )}>
                      {selectedValues.includes(option.value) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm">{option.label.split('/').pop()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ScenarioFilter;
