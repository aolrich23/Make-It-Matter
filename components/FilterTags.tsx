
import React from 'react';
import { FilterState } from '../types';

interface FilterTagsProps {
  filters: FilterState;
  onClearCategory: (category: keyof FilterState) => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({ filters, onClearCategory }) => {
  // Group values by category and filter out empty categories
  const activeGroups = (Object.entries(filters) as [keyof FilterState, string[]][])
    .filter(([_, values]) => values.length > 0);

  if (activeGroups.length === 0) return null;

  // Map key names to better display labels matching the sidebar
  const getDisplayCategoryName = (key: keyof FilterState) => {
    const names: Record<keyof FilterState, string> = {
      need: 'Urgency',
      craft: 'Craft skill',
      materialType: 'Materials',
      category: 'Category',
      location: 'Location',
      approximateTime: 'Time Required',
    };
    return names[key] || key;
  };

  return (
    <div className="flex flex-wrap gap-2" aria-label="Active Filters">
      {activeGroups.map(([category, values]) => (
        <button
          key={category}
          onClick={() => onClearCategory(category)}
          aria-label={`Remove all ${getDisplayCategoryName(category)} filters: ${values.join(', ')}`}
          className="group inline-flex items-center px-4 py-2 bg-white border border-primary/20 rounded-full text-xs font-bold text-secondary hover:bg-cloud hover:border-primary transition-all shadow-sm focus:ring-2 focus:ring-accent outline-none"
        >
          <span className="text-primary mr-1.5 font-bold capitalize">
            {getDisplayCategoryName(category)}:
          </span>
          <span className="max-w-[400px] truncate">
            {values.join(', ')}
          </span>
          <svg 
            className="w-3.5 h-3.5 ml-2 text-primary/50 group-hover:text-secondary flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default FilterTags;
