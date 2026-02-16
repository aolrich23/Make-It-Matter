
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
      const checkFilter = (items: string[], field: string) => {
        return items.length === 0 || items.includes(field);
      };

      return (
        checkFilter(filters.need, project.need) &&
        checkFilter(filters.craft, project.craft) &&
        checkFilter(filters.materialType, project.materialType) &&
        checkFilter(filters.category, project.category) &&
        checkFilter(filters.location, project.organiser.location) &&
        checkFilter(filters.approximateTime, project.approximateTime)
      );
    });
  }, [projects, searchQuery, filters]);

  // Derived unique filter options
  const filterOptions = useMemo(() => {
    return {
      need: Array.from(new Set(projects.map(p => p.need))).sort(),
      craft: Array.from(new Set(projects.map(p => p.craft))).sort(),
      materialType: Array.from(new Set(projects.map(p => p.materialType))).sort(),
      category: Array.from(new Set(projects.map(p => p.category))).sort(),
      location: Array.from(new Set(projects.map(p => p.organiser.location))).sort(),
      approximateTime: Array.from(new Set(projects.map(p => p.approximateTime))).sort(),
    };
  }, [projects]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50" role="alert">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-stone-200">
          <h2 className="text-2xl font-semibold text-stone-800 mb-2">Oops!</h2>
          <p className="text-stone-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-700 transition font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
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
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-stone-800" aria-live="polite">
                {isLoading ? 'Searching...' : `${filteredProjects.length} Projects found`}
              </h2>
              {(Object.values(filters) as string[][]).some(f => f.length > 0) && (
                <button 
                  onClick={clearAllFilters}
                  className="text-sm font-bold text-orange-800 hover:text-orange-950 underline decoration-orange-200 transition px-2 py-1 focus:ring-2 focus:ring-orange-400 rounded-md"
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

      <footer className="py-10 border-t border-stone-200 bg-stone-50 text-center text-stone-600 text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} Make It Matter – Charity Craft Finder</p>
      </footer>
    </div>
  );
};

export default App;
