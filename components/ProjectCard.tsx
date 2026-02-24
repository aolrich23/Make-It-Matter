
import React from 'react';
import { Project, Urgency } from '../types';

interface ProjectCardProps {
  project: Project;
}

const UrgencyBadge: React.FC<{ urgency: Urgency }> = ({ urgency }) => {
  const styles = {
    High: 'bg-red-50 text-red-700 border-red-200',
    Medium: 'bg-accent/10 text-secondary border-accent/30',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    None: 'bg-cloud text-gray-text border-primary/10',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border ${styles[urgency] || styles.None}`}>
      {urgency} Need
    </span>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="flex flex-col bg-white border border-primary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt="" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/600/600';
          }}
        />
        {project.need && (
          <div className="absolute top-4 left-4">
            <UrgencyBadge urgency={project.need} />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
            {project.category} &bull; {project.organiser.location}
          </p>
          <h3 className="text-2xl font-normal text-secondary group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm font-bold text-gray-text/80 mb-2">
            by {project.organiser.name}
          </p>
        </div>

        <p className="text-gray-text text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 mt-auto text-[11px] font-bold text-primary/80">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span>{project.craft.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{project.approximateTime}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>
              {project.materials.map(m => `${m.type} (${m.amount})`).join(', ')}
            </span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Tools: {project.equipment.join(', ')}</span>
          </div>
        </div>

        {project.community && (
          <div className="mb-6 p-3 bg-cloud/50 rounded-xl border border-primary/5">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Community
            </p>
            <p className="text-[11px] font-medium text-gray-text leading-tight">
              {project.community}
            </p>
          </div>
        )}

        <a 
          href={project.pattern.url} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`${project.pattern.text} for ${project.title}`}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-secondary active:scale-95 transition-all shadow-sm group-hover:shadow-md focus:ring-4 focus:ring-accent/30 outline-none"
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
