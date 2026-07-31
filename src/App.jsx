import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import SideNavbar from './components/SideNavbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ChatAgent from './components/ChatAgent';
import './App.css';

const STORAGE_KEY = 'portfolio-theme';

// Resolve initial theme: localStorage > prefers-color-scheme > dark default
const getInitialTheme = () => {
  if (typeof window === 'undefined') return true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  } catch (e) {
    // localStorage unavailable (private mode, sandboxed iframe) — fall through
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return false;
  }
  return true; // default: dark
};

// Theme Context
const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Global Scroll Reveal Hook (Apple-style animations)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing once revealed so it doesn't animate out
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    // Initial setup: select all .reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // MutationObserver to catch dynamically added components/elements (like React renders)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            if (node.classList && node.classList.contains('reveal')) {
              observer.observe(node);
            }
            const children = node.querySelectorAll('.reveal');
            children.forEach((child) => observer.observe(child));
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Apply theme class to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
    try {
      window.localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (e) {
      // ignore storage failures
    }
  }, [isDark]);

  // Scroll to top on first mount, clear any auto-scroll triggers
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();

    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname);
    }

    const timer = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timer);
  }, []);

  const themeValue = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={`app-container ${isDark ? 'dark' : 'light'}`}>
        {/* Animated Background */}
        <div className="background-layer">
          <AnimatedBackground />
        </div>

        {/* Ambient glow — dark theme only */}
        {isDark && <div className="ambient-background" aria-hidden="true" />}

        {/* Main Content Container */}
        <main className="main-content">
          {/* Hero Section */}
          <section className="hero-wrapper">
            <div className="hero-outer">
              <Hero />
            </div>
          </section>

          {/* Content Sections */}
          <div className="sections-wrapper">
            <div className="sections-content">
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Certifications />
              <Contact />
            </div>
          </div>
        </main>

        {/* Side Navigation */}
        <div className="side-navigation">
          <SideNavbar />
        </div>
      </div>
      
      {/* Floating AI Agent - Outside app-container for reliable fixed positioning */}
      <ChatAgent />
    </ThemeContext.Provider>
  );
};

export default React.memo(App);
