
import React from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  isLoading: boolean;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-stone-100 rounded-2xl h-96 flex flex-col">
            <div className="bg-stone-100 h-48 w-full rounded-t-2xl"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-stone-100 rounded w-3/4"></div>
              <div className="h-4 bg-stone-100 rounded w-1/2"></div>
              <div className="h-10 bg-stone-100 rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-2">No projects found</h3>
        <p className="text-stone-500 max-w-sm">
          Try adjusting your filters or search terms to find matching craft projects.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project, idx) => (
        <ProjectCard key={`${project.title}-${idx}`} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
