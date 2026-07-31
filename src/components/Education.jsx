import React from 'react';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Education.css';

const BLOB_PATH =
  'M32.4,-41C45.2,-42.2,61,-38.6,63.9,-29.9C66.8,-21.2,56.8,-7.2,47.5,1.7C38.2,10.6,29.6,14.4,26.3,28.4C22.9,42.3,24.7,66.4,18.4,73C12,79.7,-2.5,68.8,-19.2,64.4C-35.9,60,-54.8,61.9,-56.2,52.9C-57.7,43.8,-41.7,23.7,-37.5,9.4C-33.3,-5,-41,-13.6,-44.4,-26.2C-47.8,-38.7,-47,-55.2,-38.9,-56.2C-30.7,-57.2,-15.4,-42.7,-2.8,-38.3C9.8,-34,19.6,-39.8,32.4,-41Z';

const COLOR_MAP = { cyan: '#22d3ee', purple: '#818cf8', green: '#4ade80', magenta: '#e879f9' };

const EDU_DATA = [
  {
    year: '2025',
    degree: 'Full Stack Development with GenAI',
    institution: 'NIIT, Chennai',
    status: 'Completed',
    type: "Software Engineering Course",
    colorScheme: 'purple',
    tags: ['React.js', 'Spring Boot', 'REST APIs', 'GenAI Integration'],
    tagLabel: 'Specializations',
  },
  {
    year: '2020',
    degree: 'B.Tech in Chemical Engineering',
    institution: "St. Peter's College of Engineering and Technology, Avadi",
    status: 'Completed',
    type: "Bachelor's Degree",
    colorScheme: 'cyan',
    tags: ['Analytical Thinking', 'Problem Solving', 'Process Optimization', 'Technical Foundation'],
    tagLabel: 'Core Strengths',
  },
];

const RAIN_COUNT = 10;

const EduCard = ({ edu }) => {
  const color = COLOR_MAP[edu.colorScheme] ?? '#22d3ee';
  return (
    <div
      className={`ec-card ec-card--${edu.colorScheme}`}
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

      {/* Always-visible collapsed header */}
      <div className="ec-header">
        <div className="ec-header-inner">
          <div className="ec-title-group">
            <h3 className="ec-title">{edu.degree}</h3>
            <p className="ec-company">
              <MapPin className="ec-company-icon" aria-hidden="true" />
              {edu.institution}
            </p>
          </div>
          <div className="ec-right">
            <span className="ec-duration">{edu.year}</span>
            <span className="ec-status">{edu.status}</span>
          </div>
        </div>
        <p className="ec-hover-hint">Hover to see details</p>
      </div>

      {/* Front cover panel — slides down on hover */}
      <div className="ec-front" />

      {/* Detail content */}
      <div className="ec-details">
        <p className="ec-type">
          <Award className="ec-type-icon" aria-hidden="true" />
          {edu.type}
        </p>

        <p className="ec-tag-label">{edu.tagLabel}:</p>
        <div className="ec-skills">
          {edu.tags.map((t) => (
            <span key={t} className="ec-skill">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  const ref = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <div ref={ref} className="education-content sr-section">

          <div className="education-header" data-sr>
            <div className="header-title">
              <GraduationCap className="header-icon" />
              <h2 className="header-text">Education</h2>
            </div>
            <div className="header-divider" />
          </div>

          <div className="ec-grid">
            {EDU_DATA.map((edu, idx) => (
              <div key={idx} data-sr="up" style={{ '--delay': `${idx * 120}ms` }}>
                <EduCard edu={edu} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Education);
