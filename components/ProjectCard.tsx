
import React from 'react';
import { Project, Urgency } from '../types';

interface ProjectCardProps {
  project: Project;
}

const UrgencyBadge: React.FC<{ urgency: Urgency }> = ({ urgency }) => {
  const styles = {
    High: 'bg-red-50 text-red-800 border-red-200',
    Medium: 'bg-amber-50 text-amber-800 border-amber-200',
    Low: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    None: 'bg-stone-100 text-stone-800 border-stone-300',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[urgency] || styles.None}`}>
      {urgency} Need
    </span>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt="" // Decorative image, or add project.title if it provides info. Empty alt for accessibility since title is below.
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/600/600';
          }}
        />
        <div className="absolute top-4 left-4">
          <UrgencyBadge urgency={project.need} />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <p className="text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
            {project.category} &bull; {project.organiser.location}
          </p>
          <h3 className="text-xl font-bold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm font-semibold text-stone-700 mb-2">
            by {project.organiser.name}
          </p>
        </div>

        <p className="text-stone-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 mt-auto text-xs font-bold text-stone-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span>{project.craft}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{project.approximateTime}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>{project.materialType} ({project.materialAmount})</span>
          </div>
        </div>

        <a 
          href={project.pattern.url} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`${project.pattern.text} for ${project.title}`}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-700 active:bg-stone-800 transition shadow-sm group-hover:shadow-md focus:ring-4 focus:ring-stone-200 outline-none"
        >
          {project.pattern.text}
          <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
