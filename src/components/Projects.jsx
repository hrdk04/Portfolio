import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { featuredProjects, allProjects } from '../data/projects';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';

function FeaturedProject({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
      <div className={`rounded-card overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-card transition-shadow hover:shadow-elevated ${!isEven ? 'lg:col-start-2' : ''}`}>
        {/* Placeholder for project image/gradient */}
        <div className="aspect-[4/3] w-full" style={{ background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}11 100%)` }}>
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-display text-display-md text-[var(--text-tertiary)] opacity-50" style={{ color: project.color }}>{project.name}</p>
          </div>
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

        <div className="mt-8 flex items-center gap-4">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-body-sm font-medium text-text-primary transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]"
          >
            <FiGithub size={16} />
            View Repository
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-body-sm font-medium text-accent hover:text-accent-hover"
            >
              <FiExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ featuredOnly = false }) {
  const displayProjects = featuredOnly ? [] : allProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="section-padding !pt-8 lg:!pt-0">
      <div className="container-main">
        <Reveal>
          <SectionTitle eyebrow="Work" title={featuredOnly ? "Featured projects." : "All projects and experiments."} />
        </Reveal>

        {/* Featured Projects (Case Studies) */}
        <div className="space-y-24 lg:space-y-32">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.repoUrl} delay={0.1}>
              <FeaturedProject project={project} index={index} />
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
              <h3 className="mb-8 font-display text-display-md text-text-primary">More Projects</h3>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {displayProjects.map((project, index) => (
                <Reveal key={project.repoUrl} delay={(index % 3) * 0.1}>
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col justify-between rounded-card border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-accent hover:shadow-card"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-heading font-semibold text-text-primary">{project.name}</h4>
                        <FiGithub className="text-text-tertiary transition-colors group-hover:text-text-primary" size={20} />
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
          </div>
        )}
      </div>
    </section>
  );
}