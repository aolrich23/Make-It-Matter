
import React, { useState, useEffect, useMemo } from 'react';
import { Project, FilterState } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProjectGrid from './components/ProjectGrid';
import FilterTags from './components/FilterTags';

const INITIAL_FILTERS: FilterState = {
  need: [],
  craft: [],
  materialType: [],
  category: [],
  location: [],
  approximateTime: [],
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/projects.json');
        if (!response.ok) throw new Error('Failed to load project data.');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: nextValues };
    });
  };

  const handleClearCategory = (category: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [category]: [] }));
  };

  const clearAllFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search Logic (Fuzzy match on title and organiser name)
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.organiser.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Filter Logic: OR within group, AND across groups
      const checkFilter = (items: string[], field?: string | string[]) => {
        if (items.length === 0) return true;
        if (!field) return false; // If a filter is selected but project has no value for it, hide it
        if (Array.isArray(field)) {
          return items.some(item => field.includes(item));
        }
        return items.includes(field);
      };

      return (
        checkFilter(filters.need, project.need) &&
        checkFilter(filters.craft, project.craft) &&
        checkFilter(filters.materialType, project.materials.map(m => m.type)) &&
        checkFilter(filters.category, project.category) &&
        checkFilter(filters.location, project.organiser.location) &&
        checkFilter(filters.approximateTime, project.approximateTime)
      );
    });
  }, [projects, searchQuery, filters]);

  // Derived unique filter options
  const filterOptions = useMemo(() => {
    const timeOrder = ["Less than one hour", "1-2 hours", "2-4 hours", "Over 4 hours"];

    return {
      need: Array.from(new Set(projects.map(p => p.need).filter(Boolean) as string[])).sort(),
      craft: Array.from(new Set(projects.flatMap(p => p.craft).filter(Boolean))).sort(),
      materialType: Array.from(new Set(projects.flatMap(p => p.materials.map(m => m.type)).filter(Boolean))).sort(),
      category: Array.from(new Set(projects.map(p => p.category).filter(Boolean) as string[])).sort(),
      location: Array.from(new Set(projects.map(p => p.organiser.location).filter(Boolean) as string[])).sort(),
      approximateTime: Array.from(new Set(projects.map(p => p.approximateTime).filter(Boolean) as string[]))
        .sort((a, b) => timeOrder.indexOf(a) - timeOrder.indexOf(b)),
    };
  }, [projects]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cloud" role="alert">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-primary/10">
          <h2 className="text-3xl font-normal text-secondary mb-2">Oops!</h2>
          <p className="text-gray-text mb-4 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition font-bold shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cloud">
      <Header />
      
      <main className="flex-grow flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 py-8 gap-8">
        {/* Sidebar - Persistent */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar 
            filters={filters} 
            options={filterOptions} 
            onFilterChange={handleFilterChange} 
            onClearAll={clearAllFilters}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          <div className="mb-8">
            <div className="max-w-2xl mb-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-primary/60 group-focus-within:text-primary transition-colors" 
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
                className="block w-full pl-11 pr-4 py-4 bg-white border border-primary/20 rounded-2xl leading-5 focus:outline-none focus:ring-4 focus:ring-accent/50 focus:border-primary transition-all text-secondary placeholder-gray-text/60 shadow-sm"
                placeholder="Search by project name or organization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-normal text-secondary" aria-live="polite">
                {isLoading ? 'Searching...' : `${filteredProjects.length} Projects found`}
              </h2>
              {(Object.values(filters) as string[][]).some(f => f.length > 0) && (
                <button 
                  onClick={clearAllFilters}
                  className="text-sm font-bold text-primary hover:text-secondary underline decoration-accent decoration-2 transition px-2 py-1 focus:ring-2 focus:ring-accent rounded-md"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <FilterTags filters={filters} onClearCategory={handleClearCategory} />
          </div>

          <ProjectGrid projects={filteredProjects} isLoading={isLoading} />
        </div>
      </main>

      <footer className="py-10 border-t border-primary/10 bg-white text-center text-gray-text/60 text-sm font-bold">
        <p>&copy; {new Date().getFullYear()} Make It Matter – Charity Craft Finder</p>
      </footer>
    </div>
  );
};

export default App;
