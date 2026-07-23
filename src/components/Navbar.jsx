import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { profile } from '../data/profile';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useActiveSection } from '../hooks/useActiveSection';

const navLinks = [
  { label: 'Home', href: '/', sectionId: 'home', isHash: false },
  { label: 'About', href: '/#about', sectionId: 'about', isHash: true },
  { label: 'Skills', href: '/#skills', sectionId: 'skills', isHash: true },
  { label: 'Projects', href: '/projects', sectionId: 'projects', isHash: false },
  { label: 'Certifications', href: '/certifications', sectionId: 'certifications', isHash: false },
  { label: 'Contact', href: '/#contact', sectionId: 'contact', isHash: true },
];

const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const activeLabel = useMemo(() => {
    if (location.pathname !== '/') {
      // For separate pages, highlight the corresponding nav item
      if (location.pathname === '/projects') return 'Projects';
      if (location.pathname === '/certifications') return 'Certifications';
      return '';
    }
    const match = navLinks.find(
      (link) => link.sectionId === activeSection
    );
    return match ? match.label : 'Home';
  }, [activeSection, location.pathname]);

  return (
    <>
      <header
        className={`
          fixed top-[2px] left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl'
            : 'bg-transparent'
          }
        `}
      >
        <div className="container-main flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-body-sm font-semibold tracking-tight text-text-primary transition-opacity hover:opacity-70"
          >
            {profile.firstName}
            <span className="text-text-tertiary">.dev</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => {
                  // Handle hash navigation from separate pages
                  if (link.isHash && location.pathname !== '/') {
                    e.preventDefault();
                    window.location.href = link.href;
                  } else if (link.label === 'Home' && location.pathname !== '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="relative px-4 py-2 text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {activeLabel === link.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-subtle"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeLabel === link.label ? 'text-accent' : ''}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[var(--surface-hover)] hover:text-text-primary"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <Link
              to="/#contact"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  e.preventDefault();
                  window.location.href = '/#contact';
                }
              }}
              className="hidden rounded-full bg-accent px-4 py-2 text-body-sm font-medium text-white transition-all hover:bg-accent-hover hover:shadow-lg sm:inline-flex"
            >
              Let's Talk
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[var(--surface-hover)] hover:text-text-primary md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--bg)]/98 backdrop-blur-xl md:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      // Handle hash navigation from separate pages
                      if (link.isHash && location.pathname !== '/') {
                        e.preventDefault();
                        window.location.href = link.href;
                      } else if (link.label === 'Home' && location.pathname !== '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-3xl font-display italic text-text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  to="/#contact"
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (location.pathname !== '/') {
                      e.preventDefault();
                      window.location.href = '/#contact';
                    }
                  }}
                  className="rounded-full bg-accent px-6 py-3 text-body font-medium text-white transition-all hover:bg-accent-hover"
                >
                  Let's Talk
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}