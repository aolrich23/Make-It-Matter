
import React from 'react';
import { FilterState } from '../types';

interface SidebarProps {
  filters: FilterState;
  options: { [K in keyof FilterState]: string[] };
  onFilterChange: (category: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, options, onFilterChange, onClearAll }) => {
  const sections: { key: keyof FilterState; label: string }[] = [
    { key: 'need', label: 'Urgency' },
    { key: 'craft', label: 'Craft Skill' },
    { key: 'materialType', label: 'Materials' },
    { key: 'category', label: 'Cause Category' },
    { key: 'location', label: 'Location' },
    { key: 'approximateTime', label: 'Time Required' },
  ];

  return (
    <aside className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-8" aria-label="Project Filters">
      <div className="flex items-center justify-between md:block">
        <h3 className="text-lg font-semibold text-stone-900 mb-4">Filters</h3>
        <button 
          onClick={onClearAll}
          className="text-sm font-medium text-stone-500 hover:text-stone-700 md:hidden focus:ring-2 focus:ring-stone-400 rounded-md px-1"
        >
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {sections.map(section => (
          <fieldset key={section.key} className="space-y-3 border-none p-0 m-0">
            <legend className="text-sm font-bold uppercase tracking-wider text-stone-600 mb-2">
              {section.label}
            </legend>
            <div className="space-y-2">
              {options[section.key].length > 0 ? (
                options[section.key].map(option => (
                  <label key={option} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={filters[section.key].includes(option)}
                        onChange={() => onFilterChange(section.key, option)}
                        className="h-4 w-4 rounded border-stone-400 text-stone-800 focus:ring-stone-500 cursor-pointer"
                      />
                    </div>
                    <span className={`ml-3 text-sm transition-colors ${
                      filters[section.key].includes(option) 
                        ? 'text-stone-900 font-semibold underline decoration-stone-300' 
                        : 'text-stone-700 group-hover:text-stone-900 font-medium'
                    }`}>
                      {option}
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-stone-500 italic">No options available</p>
              )}
            </div>
          </fieldset>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
