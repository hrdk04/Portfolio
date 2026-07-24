import React, { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiArrowRight, FiMonitor, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { featuredProjects, allProjects } from '../data/projects';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';

function FeaturedProject({ project, index, onExpand, onHighlight, isHighlighted }) {
  const isEven = index % 2 === 0;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
      <div className={`rounded-card overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-card transition-shadow hover:shadow-elevated ${!isEven ? 'lg:col-start-2' : ''}`}>
        
        {/* Added separated onClick and onDoubleClick handlers */}
        <div 
          className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-hover)] cursor-pointer group"
          onClick={() => onHighlight(project.name)}
          onDoubleClick={() => onExpand(project.image)}
          title="Double-click to expand, single-click to highlight links"
        >
          {/* Flash effect on the image itself when clicked */}
          <div className={`absolute inset-0 z-20 bg-[var(--text-primary)]/10 transition-opacity duration-300 pointer-events-none ${isHighlighted ? 'opacity-100' : 'opacity-0'}`} />
          
          {project.image ? (
            <>
              {/* Impressive Loading Skeleton */}
              <div className={`absolute inset-0 z-10 bg-gradient-to-br from-[var(--surface-hover)] to-[var(--surface)] animate-pulse transition-opacity duration-700 ${imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
              
              {/* Image with smooth un-blur and scale reveal animation */}
              <img 
                src={project.image} 
                alt={`${project.name} preview`} 
                onLoad={() => setImgLoaded(true)}
                className={`h-full w-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 ${imgLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-md'}`}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}11 100%)` }}>
              <p className="font-display text-display-md text-[var(--text-tertiary)] opacity-50" style={{ color: project.color }}>{project.name}</p>
            </div>
          )}
        </div>
      </div>

      <div className={!isEven ? 'lg:col-start-1 lg:pr-8' : 'lg:pl-8'}>
        <h3 className="font-display text-display-md font-semibold text-text-primary">{project.name}</h3>
        <p className="mt-4 text-body text-text-secondary">{project.description}</p>
        
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-caption font-medium uppercase text-text-tertiary">Problem</p>
            <p className="mt-1 text-body-sm text-text-secondary">{project.problem}</p>
          </div>
          <div>
            <p className="text-caption font-medium uppercase text-text-tertiary">Solution</p>
            <p className="mt-1 text-body-sm text-text-secondary">{project.solution}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-[var(--surface-hover)] px-3 py-1 text-caption text-text-secondary">
              {tech}
            </span>
          ))}
        </div>

        {/* Added an ID here for auto-scrolling */}
        <div id={`actions-${project.name.replace(/\s+/g, '-')}`} className="mt-8 flex items-center gap-4 transition-all duration-300">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-body-sm font-medium text-text-primary transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]"
            >
              <FiGithub size={16} />
              View Repository
            </a>
          )}
          
          {project.presentationUrl && (
            <a
              href={project.presentationUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-body-sm font-medium transition-all duration-500 ${
                isHighlighted 
                  ? 'bg-[var(--text-primary)] text-[var(--surface)] ring-4 ring-[var(--text-primary)]/30 scale-110 shadow-2xl -translate-y-1'
                  : 'bg-transparent text-accent hover:bg-[var(--surface-hover)] hover:text-accent-hover'
              }`}
            >
              <FiMonitor 
                size={16} 
                className={`transition-transform duration-300 ${isHighlighted ? 'scale-125 animate-bounce' : ''}`}
              />
              View Case Study
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ featuredOnly = false }) {
  const displayProjects = featuredOnly ? [] : allProjects.filter(p => !p.featured);
  
  // States for interactive features
  const [expandedImage, setExpandedImage] = useState(null);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [highlightedProject, setHighlightedProject] = useState(null);

  // Helper function to handle the click highlight effect
  const handleHighlight = (projectName) => {
    setHighlightedProject(projectName);
    
    // Auto-scroll the buttons into the center of the screen
    const elementId = `actions-${projectName.replace(/\s+/g, '-')}`;
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Clear the highlight after 2.5 seconds
    setTimeout(() => {
      setHighlightedProject(null);
    }, 2500);
  };

  return (
    <section id="projects" className="section-padding !pt-8 lg:!pt-0 relative">
      <div className="container-main">
        <Reveal>
          <SectionTitle eyebrow="Work" title={featuredOnly ? "Featured projects." : "All projects and experiments."} />
        </Reveal>

        {/* Featured Projects (Case Studies) */}
        <div className="space-y-24 lg:space-y-32">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.name || index} delay={0.1}>
              <FeaturedProject 
                project={project} 
                index={index} 
                onExpand={setExpandedImage}
                onHighlight={handleHighlight}
                isHighlighted={highlightedProject === project.name}
              />
            </Reveal>
          ))}
        </div>

        {/* View All Button on Homepage */}
        {featuredOnly && (
          <Reveal>
            <div className="mt-16 flex justify-center">
              <Link 
                to="/projects"
                onClick={() => window.scrollTo(0,0)}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-body font-medium text-text-primary transition-all hover:border-[var(--border-hover)] hover:shadow-card"
              >
                View all projects
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        )}

        {/* Other Projects List (Only shown on /projects page) */}
        {!featuredOnly && displayProjects.length > 0 && (
          <div className="mt-32">
            <Reveal>
              <button 
                onClick={() => setShowMoreProjects(!showMoreProjects)}
                className="group flex w-full items-center justify-between rounded-card border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-6 transition-all hover:bg-[var(--surface)]/50 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 mb-8"
              >
                <h3 className="font-display text-display-md text-text-primary m-0">More Projects</h3>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-hover)] text-text-secondary transition-colors group-hover:text-accent">
                  {showMoreProjects ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </div>
              </button>
            </Reveal>

            {/* Collapsible content */}
            {showMoreProjects && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-[fadeIn_0.3s_ease-out]">
                {displayProjects.map((project, index) => (
                  <Reveal key={project.name} delay={(index % 3) * 0.1}>
                    <a 
                      href={project.presentationUrl || project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col justify-between rounded-card border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-6 transition-all hover:bg-[var(--surface)]/50 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-heading font-semibold text-text-primary">{project.name}</h4>
                          {project.presentationUrl ? (
                              <FiMonitor className="text-text-tertiary transition-colors group-hover:text-text-primary" size={20} />
                          ) : (
                              <FiGithub className="text-text-tertiary transition-colors group-hover:text-text-primary" size={20} />
                          )}
                        </div>
                        <p className="mt-3 text-body-sm text-text-secondary">{project.description}</p>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/90 p-4 pt-28 sm:pt-32 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setExpandedImage(null)} // Close when clicking background
        >
          <button 
            className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            <FiX size={24} />
          </button>
          
          <img 
            src={expandedImage} 
            alt="Expanded project" 
            className="w-auto h-auto max-w-[90vw] max-h-[70vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing it
          />
          <p className="text-white/60 mt-6 text-sm font-medium tracking-wide">Click outside or press X to close</p>
        </div>
      )}
    </section>
  );
}