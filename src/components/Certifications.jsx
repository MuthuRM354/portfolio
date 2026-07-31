import React, { useEffect, useRef, useState } from 'react';
import { Award, Calendar, CheckCircle, Star } from 'lucide-react';
import GlassContainer from './GlassContainer';
import './Certifications.css';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const certifications = [
    {
      title: 'Full Stack Development with GenAI',
      issuer: 'NIIT',
      date: 'Nov 2024',
      skills: ['React.js', 'Spring Boot', 'REST APIs', 'GenAI integration'],
      colorScheme: 'purple',
      status: 'Completed',
      borderColor: 'purple'
    },
    {
      title: 'TCS iON NQT-IT',
      issuer: 'TCS',
      date: 'Apr 2025',
      score: '69.13%',
      colorScheme: 'cyan',
      status: 'Achieved',
      borderColor: 'cyan'
    },
    {
      title: 'TCS iON NQT Psychometric Assessment',
      issuer: 'TCS',
      date: 'Apr 2025',
      skills: ['Open-mindedness', 'Thoroughness', 'Sociableness', 'Motivation'],
      note: 'High scores in all parameters',
      colorScheme: 'green',
      status: 'Excelled',
      borderColor: 'green'
    }
  ];

  const stats = [
    { number: '3+', label: 'Certifications', borderColor: 'purple' },
    { number: '69.13%', label: 'NQT-IT Score', borderColor: 'cyan' },
    { number: '100%', label: 'Course Completion', borderColor: 'green' },
    { number: 'High', label: 'Assessment Scores', borderColor: 'magenta' }
  ];

  return (
    <section id="certifications" className="certifications-section" ref={sectionRef}>
      <div className="certifications-container">
        <div className={`certifications-content ${isVisible ? 'visible' : ''}`}>
          
          {/* Section Header */}
          <div className="certifications-header">
            <div className="header-title">
              <Award className="header-icon" />
              <h2 className="header-text">Certifications & Achievements</h2>
            </div>
            
            {/* Divider with Glassmorphism */}
            <GlassContainer 
              variant="tertiary" 
              borderColor="gradient" 
              className="header-divider" 
            />
          </div>

          {/* Certifications Grid */}
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`certification-item ${isVisible ? 'visible' : ''}`}
                style={{ '--delay': `${index * 200}ms` }}
              >
                {/* Certification Card */}
                <GlassContainer
                  variant="card"
                  borderColor={cert.borderColor}
                  withHover={true}
                  withRipple={true}
                  className="certification-card"
                >
                  <div className="card-content">
                    
                    {/* Header */}
                    <div className="card-header">
                      {/* Icon */}
                      <GlassContainer
                        variant="primary"
                        borderColor={cert.borderColor}
                        withHover={true}
                        className="cert-icon-container"
                      >
                        <Award className="cert-icon" />
                      </GlassContainer>
                      
                      {/* Status Badge */}
                      <GlassContainer
                        variant="secondary"
                        borderColor={cert.borderColor}
                        withHover={true}
                        className="status-badge"
                      >
                        <span className={`status-text ${cert.colorScheme}`}>
                          {cert.status}
                        </span>
                      </GlassContainer>
                    </div>

                    {/* Content */}
                    <div className="cert-details">
                      
                      {/* Title */}
                      <h3 className="cert-title">
                        {cert.title}
                      </h3>
                      
                      {/* Issuer and Date */}
                      <div className="cert-meta">
                        <p className="cert-issuer">
                          {cert.issuer}
                        </p>
                        <div className="cert-date">
                          <Calendar className={`date-icon ${cert.colorScheme}`} />
                          <span className="date-text">
                            {cert.date}
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      {cert.score && (
                        <GlassContainer
                          variant="tertiary"
                          borderColor="yellow"
                          className="score-container"
                        >
                          <Star className="score-icon" />
                          <span className="score-text">
                            {cert.score}
                          </span>
                        </GlassContainer>
                      )}

                      {/* Note */}
                      {cert.note && (
                        <GlassContainer
                          variant="tertiary"
                          borderColor={cert.borderColor}
                          className="note-container"
                        >
                          <p className={`note-text ${cert.colorScheme}`}>
                            {cert.note}
                          </p>
                        </GlassContainer>
                      )}

                      {/* Skills */}
                      {cert.skills && (
                        <div className="cert-skills-section">
                          <p className={`skills-title ${cert.colorScheme}`}>
                            Key Areas:
                          </p>
                          <div className="cert-skills-grid">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`cert-skill-tag cert-skill-tag--${cert.borderColor}`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Verification */}
                      <GlassContainer
                        variant="tertiary"
                        borderColor="green"
                        className="verification-container"
                      >
                        <div className="verification-content">
                          <CheckCircle className="verification-icon" />
                          <span className="verification-text">
                            Verified Credential
                          </span>
                        </div>
                      </GlassContainer>
                    </div>
                  </div>
                </GlassContainer>
              </div>
            ))}
          </div>

          {/* Achievement Stats */}
          <div className="stats-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`stat-item ${isVisible ? 'visible' : ''}`}
                  style={{ '--delay': `${600 + index * 100}ms` }}
                >
                  <GlassContainer
                    variant="card"
                    borderColor={stat.borderColor}
                    withHover={true}
                    withRipple={true}
                    className="stat-card"
                  >
                    <div className={`stat-number ${stat.borderColor}`}>
                      {stat.number}
                    </div>
                    <p className="stat-label">
                      {stat.label}
                    </p>
                  </GlassContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Certifications);
