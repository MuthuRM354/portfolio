import React from 'react';
import { ExternalLink, Github, Zap, Shield, Clock, ShoppingCart, Smartphone, Utensils } from 'lucide-react';
import GlassContainer from './GlassContainer';
import useScrollReveal from '../hooks/useScrollReveal';
import './Projects.css';

const PROJECTS = [
  {
    title: 'Foodie App', subtitle: 'Food Delivery Platform', colorScheme: 'purple', borderColor: 'purple',
    description: 'Full-stack food ordering application with JWT-based authentication and CRUD APIs for menu, orders, and user management.',
    technologies: ['React.js', 'Spring Boot', 'MySQL', 'MongoDB', 'JWT'],
    achievements: [
      { icon: Shield, text: 'JWT-based authentication' },
      { icon: Zap,    text: 'Optimized DB queries' },
      { icon: Clock,  text: 'CRUD APIs for menu & orders' },
    ],
    demoUrl: 'https://github.com/MuthuRM354', repoUrl: 'https://github.com/MuthuRM354',
  },
  {
    title: 'Dairy Delights', subtitle: 'E-Commerce Dairy Platform', colorScheme: 'cyan', borderColor: 'cyan',
    description: 'Responsive front-end for a dairy storefront with shopping cart, order placement, and product listings.',
    technologies: ['React.js', 'JSON', 'CSS'],
    achievements: [
      { icon: ShoppingCart, text: 'Cart & order placement' },
      { icon: Zap,          text: 'Optimized static assets' },
      { icon: Smartphone,   text: 'Fully responsive layout' },
    ],
    demoUrl: 'https://github.com/MuthuRM354', repoUrl: 'https://github.com/MuthuRM354',
  },
  {
    title: 'Spice Garden Restaurant', subtitle: 'Portfolio Website', colorScheme: 'green', borderColor: 'green',
    description: 'Static restaurant website with reservation and menu pages, responsive CSS layouts, and interactivity using vanilla JavaScript.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'JSON'],
    achievements: [
      { icon: Utensils,   text: 'Reservation & menu pages' },
      { icon: Smartphone, text: 'Responsive CSS layouts' },
      { icon: Zap,        text: 'Interactive nav & forms' },
    ],
    demoUrl: 'https://github.com/MuthuRM354', repoUrl: 'https://github.com/MuthuRM354',
  },
];

const Projects = () => {
  const ref = useScrollReveal({ threshold: 0.08 });

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div ref={ref} className="projects-content sr-section">

          <div className="projects-header" data-sr>
            <div className="header-title">
              <ExternalLink className="header-icon" />
              <h2 className="header-text">Featured Projects</h2>
            </div>
            <GlassContainer variant="tertiary" borderColor="gradient" className="header-divider" />
          </div>

          <div className="projects-grid">
            {PROJECTS.map((project, index) => (
              <div key={project.title} className="project-item" data-sr="scale">
                <GlassContainer variant="card" borderColor={project.borderColor} withHover withRipple className={`project-card ${project.colorScheme}`}>
                  <div className="project-content">
                    <div className="project-header">
                      <GlassContainer variant="primary" borderColor={project.borderColor} withHover className="subtitle-badge">
                        <span className={`subtitle-text ${project.colorScheme}`}>{project.subtitle}</span>
                      </GlassContainer>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                    </div>

                    <div className="technologies-section">
                      <div className="technologies-grid">
                        {project.technologies.map((tech) => (
                          <GlassContainer key={tech} variant="secondary" borderColor={project.borderColor} withHover withRipple className="tech-badge">
                            <span className="tech-text">{tech}</span>
                          </GlassContainer>
                        ))}
                      </div>
                    </div>

                    <div className={`achievements-container achievement-border--${project.borderColor}`}>
                      {project.achievements.map((a, i) => {
                        const Icon = a.icon;
                        return (
                          <div key={i} className="achievement-item">
                            <Icon className={`achievement-icon ${project.colorScheme}`} />
                            <p className="achievement-text">{a.text}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="action-buttons">
                      <GlassContainer variant="primary" borderColor={project.borderColor} withHover withRipple className="primary-button">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="view-button">
                          <ExternalLink className="button-icon" />
                          <span>View Project</span>
                        </a>
                      </GlassContainer>
                      <GlassContainer variant="secondary" borderColor={project.borderColor} withHover withRipple className="github-button">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={`github-btn ${project.colorScheme}`}>
                          <Github className="github-icon" />
                        </a>
                      </GlassContainer>
                    </div>
                  </div>
                </GlassContainer>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
