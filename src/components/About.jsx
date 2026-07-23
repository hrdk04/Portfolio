import { aboutBlocks, stats, education, achievements } from '../data/profile';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { FiAward, FiBookOpen, FiTrendingUp, FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';

const blockIcons = {
  'Who I Am': <FiAward size={24} />,
  'What I Build': <FiBookOpen size={24} />,
  'How I Work': <FiTrendingUp size={24} />,
};

export default function About() {
  return (
    <section id="about" className="section-padding py-12 lg:py-16 bg-gradient-to-b from-transparent to-[var(--surface-hover)]/20">
      <div className="container-main">
        <Reveal>
          <SectionTitle eyebrow="About" title="A developer story built around practical delivery." />
        </Reveal>

        {/* Story Blocks */}
        <div className="grid gap-6 md:grid-cols-3">
          {aboutBlocks.map((block, index) => (
            <Reveal key={block.label} delay={index * 0.08}>
              {/* Added glassmorphism classes: border/50, bg/30, backdrop-blur-md */}
              <div className="group relative h-full rounded-card border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-6 transition-all hover:bg-[var(--surface)]/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 overflow-hidden">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 p-3 text-accent shadow-sm">
                    {blockIcons[block.label] || <FiAward size={24} />}
                  </div>
                  
                  <p className="text-caption font-medium uppercase text-accent">
                    {block.label}
                  </p>
                  <p className="mt-4 text-body leading-relaxed text-text-secondary">
                    {block.content}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats Row */}
        <Reveal>
          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                {/* Added glassmorphism classes */}
                <div className="group rounded-card border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-4 sm:p-6 text-center transition-all hover:bg-[var(--surface)]/50 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                  <p className="font-display text-display-md sm:text-display-lg text-text-primary group-hover:text-accent transition-colors">{stat.value}</p>
                  <p className="mt-1 text-caption font-medium uppercase text-text-tertiary">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Education & Achievements */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Education Timeline */}
          <Reveal>
            {/* Added glassmorphism classes */}
            <div className="rounded-card border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-6 shadow-card transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                  <FiBookOpen size={20} />
                </div>
                <p className="text-caption font-medium uppercase text-text-tertiary">Education</p>
              </div>
              <div className="mt-6 space-y-6">
                {education.map((item, index) => (
                  <div key={item.degree} className="relative pl-6 group">
                    {/* Timeline line */}
                    {index !== education.length - 1 && (
                      <div className="absolute left-[5px] top-8 bottom-[-24px] w-0.5 bg-[var(--border)]/50" />
                    )}
                    {/* Timeline dot */}
                    <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 transition-all group-hover:scale-125 ${item.current ? 'border-accent bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]' : 'border-[var(--border)] bg-[var(--surface)] group-hover:border-accent group-hover:bg-accent/20'}`} />
                    <div className="group-hover:translate-x-1 transition-transform">
                      <p className="text-heading font-semibold text-text-primary">{item.degree}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-body-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <FiMapPin size={14} />
                          {item.school}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar size={14} />
                          {item.period}
                        </span>
                      </div>
                      {item.details && (
                        <p className="mt-2 text-body-sm text-text-secondary bg-[var(--surface-hover)]/40 rounded px-2 py-1 inline-block">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Achievements */}
          <Reveal delay={0.08}>
            {/* Added glassmorphism classes */}
            <div className="h-full rounded-card border border-[var(--border)]/50 bg-[var(--surface)]/30 backdrop-blur-md p-6 shadow-card transition-all hover:shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                  <FiStar size={20} />
                </div>
                <p className="text-caption font-medium uppercase text-text-tertiary">Achievements</p>
              </div>
              <div className="mt-6 space-y-4">
                {achievements.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05}>
                    <div className="group flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-[var(--surface)]/50 hover:translate-x-1">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(var(--accent-rgb),0.4)]" />
                      <p className="text-body-sm text-text-secondary group-hover:text-text-primary transition-colors">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}