import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Footer from './components/Footer';

import { useTheme } from './contexts/ThemeContext';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to ensure render completes before scrolling
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Projects />
            </motion.div>
          } 
        />
        <Route 
          path="/certifications" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Certifications />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // Initialize theme
  useTheme();

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] via-[var(--bg)] to-[var(--surface-hover)] relative overflow-hidden">
        {/* Animated light source from center top */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 dark:opacity-40"
               style={{
                 background: 'radial-gradient(ellipse at center, rgba(0, 150, 255, 0.4) 0%, rgba(0, 100, 200, 0.2) 30%, transparent 70%)',
                 animation: 'lightPulse 8s ease-in-out infinite',
                 filter: 'blur(60px)'
               }}
          />
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 dark:opacity-30"
               style={{
                 background: 'radial-gradient(ellipse at center, rgba(0, 200, 255, 0.3) 0%, rgba(0, 150, 255, 0.15) 40%, transparent 70%)',
                 animation: 'lightPulse 6s ease-in-out infinite reverse',
                 filter: 'blur(80px)'
               }}
          />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[300px] opacity-15 dark:opacity-25"
               style={{
                 background: 'radial-gradient(ellipse at center, rgba(100, 200, 255, 0.25) 0%, rgba(50, 150, 200, 0.1) 50%, transparent 80%)',
                 animation: 'lightFloat 10s ease-in-out infinite',
                 filter: 'blur(50px)'
               }}
          />
        </div>
        
        {/* Subtle accent glows */}
        <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
               style={{
                 background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                 animation: 'glowPulse 12s ease-in-out infinite',
                 filter: 'blur(80px)'
               }}
          />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
               style={{
                 background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                 animation: 'glowPulse 15s ease-in-out infinite reverse',
                 filter: 'blur(70px)'
               }}
          />
        </div>

        <style>{`
          @keyframes lightPulse {
            0%, 100% {
              opacity: 0.3;
              transform: translateX(-50%) scale(1);
            }
            50% {
              opacity: 0.5;
              transform: translateX(-50%) scale(1.1);
            }
          }
          
          @keyframes lightFloat {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(-20px);
            }
          }
          
          @keyframes glowPulse {
            0%, 100% {
              opacity: 0.2;
              transform: scale(1);
            }
            50% {
              opacity: 0.4;
              transform: scale(1.2);
            }
          }
        `}</style>

        <Navbar />
        <ScrollHandler />
        <main className="flex-grow relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}