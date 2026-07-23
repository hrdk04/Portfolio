import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronDown, FiGithub, FiLinkedin, FiMail, FiCode, FiLayers, FiX } from 'react-icons/fi';
import { profile, techStack } from '../data/profile';
import { useState, useEffect, useRef } from 'react';

function ProfileImage() {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDoubleClick = () => {
    if (!imageError) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
        onDoubleClick={handleDoubleClick}
        title="Double-click to expand"
      >
        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-2xl shadow-elevated sm:h-[320px] sm:w-[320px] lg:h-[380px] lg:w-[380px] cursor-pointer group">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20 mix-blend-overlay" />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-body-sm font-medium">Double-click to expand</span>
          </div>
          
          {!imageError ? (
            <img
              src="/profile-picture.jpg"
              alt={profile.name}
              className="h-full w-full object-cover"
              loading="eager"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--surface)] to-[var(--surface-hover)] text-text-tertiary">
              <span className="font-display text-6xl font-bold">{profile.firstName[0]}{profile.lastName[0]}</span>
            </div>
          )}
          
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-accent/20" />
        </div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-8 rounded-full bg-accent/10 p-3 backdrop-blur-sm"
        >
          <FiCode size={24} className="text-accent" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -left-4 bottom-12 rounded-full bg-purple-500/10 p-3 backdrop-blur-sm"
        >
          <FiLayers size={24} className="text-purple-500" />
        </motion.div>
      </motion.div>

      {/* Expanded Image Modal */}
      <AnimatePresence>
        {isExpanded && !imageError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/profile-picture.jpg"
                alt={profile.name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-4 -right-4 h-10 w-10 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors shadow-lg"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollRef = useRef(null);

  const sections = ['home', 'about', 'skills', 'contact'];

  const startAutoScroll = () => {
    if (isAutoScrolling) return;
    setIsAutoScrolling(true);

    let currentIndex = 0;
    const scrollNextSection = () => {
      if (!isAutoScrolling || currentIndex >= sections.length) {
        // If we've reached the end, go back to home and stop
        if (currentIndex >= sections.length) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setIsAutoScrolling(false);
        }
        return;
      }

      const sectionId = sections[currentIndex];
      const section = document.getElementById(sectionId);
      
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentIndex++;
        autoScrollRef.current = setTimeout(scrollNextSection, 2000);
      }
    };

    // Start from the next section (about)
    currentIndex = 1;
    scrollNextSection();
  };

  const stopAutoScroll = () => {
    setIsAutoScrolling(false);
    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  useEffect(() => {
    // Add click listener to stop auto-scroll
    const handleClick = () => {
      if (isAutoScrolling) {
        stopAutoScroll();
      }
    };

    if (isAutoScrolling) {
      window.addEventListener('click', handleClick);
      window.addEventListener('scroll', handleClick);
    }

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleClick);
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pb-20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container-main w-full relative z-10 pt-20 lg:pt-20">
        <div className="grid gap-12 gap-y-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:items-center">

          {/* Profile Image - First on mobile */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <ProfileImage />
          </div>

          {/* Content - Second on mobile */}
          <motion.div
            variants={reduceMotion ? {} : stagger}
            initial="hidden"
            animate="visible"
            className="order-2 z-10 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left lg:pt-0"
          >
            {/* Availability */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-caption font-medium text-accent backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile.availability.text}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={fadeUp} className="text-body font-medium text-accent">
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-xl text-text-primary"
            >
              <span className="italic bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">{profile.firstName}</span>
              <span className="hidden lg:inline">&nbsp;</span>
              <span className="lg:hidden"> </span>
              <span className="italic bg-gradient-to-r from-text-secondary to-accent bg-clip-text text-transparent">{profile.lastName}</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-body-lg font-semibold text-text-primary"
            >
              {profile.role}
            </motion.p>

            {/* Headline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-body text-text-secondary lg:text-lg lg:leading-8"
            >
              {profile.headline}
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-2"
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-caption font-medium text-text-secondary transition-colors hover:border-accent/50 hover:bg-accent/10"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={() => window.open('/Resume.pdf', '_blank')}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-body-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
              >
                View Resume
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-body-sm font-medium text-text-primary transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:shadow-card"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
              <a
                href={profile.githubPrimary}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-text-secondary transition-all hover:border-accent hover:text-accent hover:shadow-lg"
              >
                <FiGithub size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-text-secondary transition-all hover:border-accent hover:text-accent hover:shadow-lg"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-text-secondary transition-all hover:border-accent hover:text-accent hover:shadow-lg"
              >
                <FiMail size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}