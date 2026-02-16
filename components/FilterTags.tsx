
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
          className="group inline-flex items-center px-4 py-2 bg-white border border-stone-300 rounded-full text-xs font-bold text-stone-800 hover:bg-stone-50 hover:border-stone-500 transition-all shadow-sm focus:ring