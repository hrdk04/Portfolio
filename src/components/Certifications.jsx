import { certifications } from '../data/profile';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';

export default function Certifications({ featuredOnly = false }) {
  if (!certifications || certifications.length === 0) return null;

  const displayCertifications = featuredOnly ? certifications.slice(0, 2) : certifications;

  return (
    <section id="certifications" className="section-padding !pt-4 lg:!pt-0">
      <div className="container-main">
        <Reveal>
          <SectionTitle eyebrow="Credentials" title={featuredOnly ? "Featured certifications." : "Certifications and continuous learning."} />
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {displayCertifications.map((cert, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-card border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-card transition-all hover:border-[var(--border-hover)] hover:shadow-card-hover">
                {/* Image placeholder */}
                <div className="aspect-[4/3] w-full" style={{ background: `linear-gradient(135deg, ${cert.color}22 0%, ${cert.color}11 100%)` }}>
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="font-display text-display-md text-[var(--text-tertiary)] opacity-50" style={{ color: cert.color }}>{cert.issuer}</p>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-caption font-medium uppercase tracking-wider text-accent">{cert.issuer}</p>
                    <p className="text-caption text-text-tertiary">{cert.date}</p>
                  </div>
                  <h3 className="mt-3 font-display text-display-md font-semibold leading-tight text-text-primary">
                    {cert.title}
                  </h3>
                  {cert.description && (
                    <p className="mt-4 text-body text-text-secondary">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All Button on Homepage */}
        {featuredOnly && certifications.length > 2 && (
          <Reveal>
            <div className="mt-16 flex justify-center">
              <Link 
                to="/certifications"
                onClick={() => window.scrollTo(0, 0)}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-body font-medium text-text-primary transition-all hover:border-[var(--border-hover)] hover:shadow-card"
              >
                View all certifications
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
