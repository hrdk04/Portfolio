import { primaryExpertise, supportingSkills, currentlyLearning } from '../data/profile';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { FiCode, FiLayers, FiCpu, FiDatabase, FiTool, FiGlobe, FiTerminal, FiZap } from 'react-icons/fi';

const skillIcons = {
  'React Native Development': <FiCode size={28} />,
  'MERN Stack': <FiLayers size={28} />,
  'Python Development': <FiCpu size={28} />,
};

const categoryIcons = {
  'Languages': <FiTerminal size={20} />,
  'Frontend': <FiGlobe size={20} />,
  'Databases': <FiDatabase size={20} />,
  'Tools': <FiTool size={20} />,
};

const skillColors = {
  'React Native Development': 'from-blue-500/20 to-purple-500/20',
  'MERN Stack': 'from-green-500/20 to-emerald-500/20',
  'Python Development': 'from-yellow-500/20 to-orange-500/20',
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding py-12 lg:py-16 bg-gradient-to-b from-transparent to-[var(--surface-hover)]/20">
      <div className="container-main">
        <Reveal>
          <SectionTitle eyebrow="Capabilities" title="The tools I use to build." />
        </Reveal>

        {/* Primary Expertise */}
        <div className="grid gap-6 lg:grid-cols-3">
          {primaryExpertise.map((skill, index) => (
            <Reveal key={skill.title} delay={index * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-card border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-sm p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skillColors[skill.title] || 'from-gray-500/10 to-gray-500/5'} opacity-0 transition-opacity group-hover:opacity-100`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 p-3 text-accent">
                    {skillIcons[skill.title] || <FiCode size={28} />}
                  </div>
                  
                  <h3 className="text-heading font-semibold text-text-primary">{skill.title}</h3>
                  <p className="mt-3 text-body-sm text-text-secondary">{skill.description}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1 text-caption font-medium text-text-secondary transition-colors group-hover:border-accent/30 group-hover:bg-accent/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Supporting Skills Grid */}
        <Reveal>
          <div className="mt-16 ml-4 mr-4 rounded-card border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-sm p-6 lg:p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 lg:ml-0 lg:mr-0">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2 text-accent">
                <FiTool size={20} />
              </div>
              <h4 className="text-caption font-medium uppercase text-text-tertiary">Supporting Arsenal</h4>
            </div>
            <div className="mt-6 grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              {supportingSkills.map((category) => (
                <Reveal key={category.category} delay={0.1}>
                  <div className="group">
                    <div className="flex items-center gap-2">
                      <div className="text-text-tertiary transition-colors group-hover:text-accent">
                        {categoryIcons[category.category] || <FiZap size={20} />}
                      </div>
                      <p className="text-body-sm font-semibold text-text-primary">{category.category}</p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {category.items.map((item) => (
                        <li 
                          key={item} 
                          className="flex items-center gap-2 text-body-sm text-text-secondary transition-colors group-hover:text-text-primary"
                        >
                          <span className="h-1 w-1 rounded-full bg-text-tertiary transition-colors group-hover:bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Currently Learning */}
        <Reveal>
          <div className="mt-6 rounded-card border border-accent/50 bg-gradient-to-r from-accent/10 to-accent/5 p-6 lg:p-8 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/20 p-2 text-accent animate-pulse">
                <FiZap size={20} />
              </div>
              <h4 className="text-caption font-medium uppercase text-accent">Current Focus & Learning</h4>
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {currentlyLearning.map((item, index) => (
                <li 
                  key={item} 
                  className="flex items-center gap-2 text-body-sm font-medium text-text-primary transition-all hover:translate-x-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}