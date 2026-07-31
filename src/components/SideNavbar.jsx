import React, { useEffect, useRef, useState } from 'react';
import { Home, User, Code, Briefcase, Building2, GraduationCap, Award, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';
import './SideNavbar.css';

// Module-level so the array reference is stable across renders.
const NAV_ITEMS = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Code, label: 'Skills' },
  { id: 'projects', icon: Briefcase, label: 'Projects' },
  { id: 'experience', icon: Building2, label: 'Experience' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'certifications', icon: Award, label: 'Certs' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const SideNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
      );

      NAV_ITEMS.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });

      observerRef.current = observer;
    };

    // Delay observer setup to prevent interference with initial scroll
    const timer = setTimeout(setupObserver, 1000);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="side-navbar" aria-label="Section navigation">
      <div className="navbar-container">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              aria-label={`Go to ${item.label} section`}
              aria-current={isActive ? 'true' : undefined}
            >
              <Icon className="nav-icon" aria-hidden="true" />
              <span className="nav-tooltip" aria-hidden="true">{item.label}</span>
            </button>
          );
        })}

        {/* Theme Toggle - Separator */}
        <div className="nav-separator" aria-hidden="true" />

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="theme-icon" aria-hidden="true" /> : <Moon className="theme-icon" aria-hidden="true" />}
          <span className="nav-tooltip" aria-hidden="true">{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
};

export default React.memo(SideNavbar);
