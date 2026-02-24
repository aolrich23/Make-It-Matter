
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
    <aside className="bg-white p-6 rounded-2xl border border-primary/10 shadow-sm space-y-6" aria-label="Project Filters">
      <div className="flex items-center justify-between md:block">
        <h3 className="text-xl font-normal text-secondary mb-2">Filters</h3>
        <button 
          onClick={onClearAll}
          className="text-sm font-bold text-primary hover:text-secondary md:hidden focus:ring-2 focus:ring-accent rounded-md px-1 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-0">
        {sections.map((section, index) => (
          <fieldset key={section.key} className={`border-none p-0 m-0 ${index > 0 ? 'mt-10' : ''}`}>
            <legend className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-3">
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
                        className="h-4 w-4 rounded border-primary/30 text-primary focus:ring-accent cursor-pointer"
                      />
                    </div>
                    <span className={`ml-3 text-sm transition-colors ${
                      filters[section.key].includes(option) 
                        ? 'text-secondary font-bold underline decoration-accent decoration-2' 
                        : 'text-gray-text group-hover:text-primary font-medium'
                    }`}>
                      {option}
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-text/50 italic font-medium">No options available</p>
              )}
            </div>
          </fieldset>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
