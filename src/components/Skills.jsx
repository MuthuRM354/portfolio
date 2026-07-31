import React from 'react';
import { Code, Database, Server, Globe, Zap } from 'lucide-react';
import GlassContainer from './GlassContainer';
import useScrollReveal from '../hooks/useScrollReveal';
import './Skills.css';

const CATEGORIES = [
  {
    category: 'Frontend', icon: Globe, borderColor: 'cyan',
    skills: [
      { name: 'JavaScript (ES6+)', icon: '⚡' }, { name: 'React.JS', icon: '⚛️' },
      { name: 'HTML5', icon: '🌐' }, { name: 'CSS3', icon: '🎨' }, { name: 'Bootstrap', icon: '🅱️' }
    ]
  },
  {
    category: 'Backend', icon: Server, borderColor: 'purple',
    skills: [
      { name: 'Java', icon: '☕' }, { name: 'Spring Boot', icon: '🍃' },
      { name: 'REST APIs', icon: '🔗' }, { name: 'Microservices', icon: '🏗️' }, { name: 'JPA', icon: '🗃️' }
    ]
  },
  {
    category: 'Database', icon: Database, borderColor: 'green',
    skills: [{ name: 'MySQL', icon: '🐬' }, { name: 'MongoDB', icon: '🍃' }]
  },
  {
    category: 'Tools & Others', icon: Code, borderColor: 'magenta',
    skills: [
      { name: 'Postman', icon: '📮' }, { name: 'JUnit', icon: '🧪' },
      { name: 'Selenium (basic)', icon: '🕷️' }, { name: 'GitHub', icon: '🐙' }, { name: 'GitHub Copilot', icon: '🤖' }
    ]
  }
];

const LEARNING = ['AI/ML', 'AWS', 'Docker', 'TypeScript', 'NextJS', 'GraphQL'];

const Skills = () => {
  const ref = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div ref={ref} className="skills-content sr-section">

          <div className="skills-header" data-sr>
            <div className="header-title">
              <Zap className="header-icon" />
              <h2 className="header-text">Technical Skills</h2>
            </div>
            <GlassContainer variant="tertiary" borderColor="gradient" className="header-divider" />
            <p className="header-description">
              Modern technologies and frameworks I use to build scalable, efficient applications
            </p>
          </div>

          <div className="skills-grid">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.category} className="skill-category" data-sr="scale">
                  <div className={`sk-book sk-book--${cat.borderColor}`} tabIndex={0}>

                    {/* Inner content — revealed when cover opens */}
                    <div className="sk-book-inner">
                      <div className="sk-inner-header">
                        <Icon className={`sk-inner-icon sk-inner-icon--${cat.borderColor}`} size={18} />
                        <span className={`sk-inner-title sk-inner-title--${cat.borderColor}`}>{cat.category}</span>
                      </div>
                      <div className="sk-skills-list">
                        {cat.skills.map((skill) => (
                          <div key={skill.name} className="sk-skill-row">
                            <span className="sk-skill-emoji">{skill.icon}</span>
                            <span className="sk-skill-name">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cover — flips open on hover */}
                    <div className="sk-cover">
                      <div className="sk-cover-icon-wrap">
                        <Icon className={`sk-cover-icon sk-cover-icon--${cat.borderColor}`} size={36} />
                      </div>
                      <h3 className="sk-cover-title">{cat.category}</h3>
                      <span className="sk-cover-hint">Hover to explore</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="learning-banner" data-sr>
            <GlassContainer variant="primary" borderColor="gradient" className="learning-container">
              <div className="learning-content">
                <h3 className="learning-title">Always Learning</h3>
                <p className="learning-description">
                  Currently exploring <span className="highlight-ai">GenAI integration</span>,{' '}
                  <span className="highlight-cloud">Cloud technologies</span>, and{' '}
                  <span className="highlight-react">Advanced React patterns</span>
                </p>
                <div className="tech-badges">
                  {LEARNING.map((tech) => (
                    <GlassContainer key={tech} variant="tertiary" withRipple withHover borderColor="gradient" className="tech-badge">
                      <span className="badge-text">{tech}</span>
                    </GlassContainer>
                  ))}
                </div>
              </div>
              <div className="particles-container">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`particle particle-${i % 2 === 0 ? 'purple' : 'cyan'}`}
                    style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 20}%`, animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
            </GlassContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
