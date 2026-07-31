import React from 'react';
import { Briefcase, Calendar, Code2, TrendingUp, Users, FileText } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Experience.css';

const BLOB_PATH =
  'M32.4,-41C45.2,-42.2,61,-38.6,63.9,-29.9C66.8,-21.2,56.8,-7.2,47.5,1.7C38.2,10.6,29.6,14.4,26.3,28.4C22.9,42.3,24.7,66.4,18.4,73C12,79.7,-2.5,68.8,-19.2,64.4C-35.9,60,-54.8,61.9,-56.2,52.9C-57.7,43.8,-41.7,23.7,-37.5,9.4C-33.3,-5,-41,-13.6,-44.4,-26.2C-47.8,-38.7,-47,-55.2,-38.9,-56.2C-30.7,-57.2,-15.4,-42.7,-2.8,-38.3C9.8,-34,19.6,-39.8,32.4,-41Z';

const COLOR_MAP = { cyan: '#22d3ee', purple: '#818cf8', green: '#4ade80', magenta: '#e879f9' };

const EXPERIENCES = [
  {
    title: 'Software Developer',
    company: 'Kuwy Technology Services PVT Ltd',
    location: 'Chennai',
    duration: 'Oct 2025 – Present',
    type: 'Full-time · Current Role',
    status: 'Active',
    colorScheme: 'cyan',
    achievements: [
      { icon: Code2,      text: 'Building and maintaining full-stack web applications using Spring MVC and JSP on Java 8', category: 'Development' },
      { icon: TrendingUp, text: 'Developing server-side logic, REST APIs, and JSP-based UI components integrated with MySQL', category: 'Architecture' },
      { icon: Users,      text: 'Collaborating with cross-functional teams to deliver production-grade solutions', category: 'Teamwork' },
    ],
    skills: ['Spring MVC', 'JSP', 'Java 8', 'MySQL', 'REST APIs', 'Git'],
  },
  {
    title: 'Executive Trainee',
    company: 'Anthem Bioscience',
    location: 'Bangalore',
    duration: 'Sep 2022 – Aug 2023',
    type: 'Full-time Position',
    status: 'Completed',
    colorScheme: 'purple',
    achievements: [
      { icon: TrendingUp, text: 'Gained professional industry experience before transitioning into software development in 2024', category: 'Professional Foundation' },
      { icon: FileText,   text: 'Practiced process documentation, lab reporting, and quality protocols', category: 'Documentation & QA' },
      { icon: Users,      text: 'Built analytical reasoning and structured problem-solving habits now applied to software development', category: 'Transferable Skills' },
    ],
    skills: ['Analytical Thinking', 'Problem Solving', 'Process Documentation', 'Quality Protocols', 'Team Collaboration', 'Adaptability'],
  },
];

const RAIN_COUNT = 10;

const ExpCard = ({ exp }) => {
  const color = COLOR_MAP[exp.colorScheme] ?? '#22d3ee';
  return (
    <div
      className={`ec-card ec-card--${exp.colorScheme}`}
      style={{ '--ec-color': color }}
      tabIndex={0}
    >
      {/* Rotating blob background */}
      <div className="ec-blob">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill="currentColor" d={BLOB_PATH} transform="translate(100 100)" />
        </svg>
      </div>

      {/* Rain drops */}
      {Array.from({ length: RAIN_COUNT }).map((_, i) => (
        <div key={i} className={`ec-rain ec-rain--${i + 1}`} />
      ))}

      {/* Always-visible collapsed header (z-index above front cover) */}
      <div className="ec-header">
        <div className="ec-header-inner">
          <div className="ec-title-group">
            <h3 className="ec-title">{exp.title}</h3>
            <p className="ec-company">
              <Briefcase className="ec-company-icon" aria-hidden="true" />
              {exp.company} · {exp.location}
            </p>
          </div>
          <div className="ec-right">
            <span className="ec-duration">{exp.duration}</span>
            <span className={`ec-status ${exp.status === 'Active' ? 'ec-status--active' : ''}`}>
              {exp.status === 'Active' ? '● Active' : exp.status}
            </span>
          </div>
        </div>
        <p className="ec-hover-hint">Hover to see details</p>
      </div>

      {/* Front cover panel — slides down on hover */}
      <div className="ec-front" />

      {/* Detail content — revealed when front slides away */}
      <div className="ec-details">
        <p className="ec-type">
          <Calendar className="ec-type-icon" aria-hidden="true" />
          {exp.type}
        </p>

        <div className="ec-achievements">
          {exp.achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="ec-achievement">
                <Icon className="ec-achievement-icon" aria-hidden="true" />
                <div className="ec-achievement-info">
                  <p className="ec-achievement-text">{a.text}</p>
                  <span className="ec-achievement-cat">{a.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="ec-skills">
          {exp.skills.map((s) => (
            <span key={s} className="ec-skill">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const ref = useScrollReveal({ threshold: 0.08 });

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <div ref={ref} className="experience-content sr-section">

          <div className="experience-header" data-sr>
            <div className="header-title">
              <Briefcase className="header-icon" />
              <h2 className="header-text">Experience</h2>
            </div>
            <div className="header-divider" />
          </div>

          <div className="ec-grid">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} data-sr="up" style={{ '--delay': `${idx * 120}ms` }}>
                <ExpCard exp={exp} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Experience);
