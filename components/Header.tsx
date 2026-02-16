
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-stone-200 pt-10 pb-14 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold text-stone-900 mb-4 tracking-tight leading-tight">
          Make It Matter – Charity Craft Project Finder
        </h1>
        <p className="text-stone-600 max-w-3xl mx-auto mb-10 text-lg leading-relaxed">
          A searchable directory of craft projects supporting charities across Australia. 
          Filter by the material, skills, or time you have, or find local causes, or ones 
          that matter to you. Every bit helps.
        </p>
        
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-stone-500 group-focus-within:text-stone-700 transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            id="search-input"
            aria-label="Search by project name or organization"
            className="block w-full pl-11 pr-4 py-4 bg-stone-50 border border-stone-300 rounded-2xl leading-5 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-500 transition-all text-stone-900 placeholder-stone-500 shadow-sm"
            placeholder="Search by project name or organization..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
