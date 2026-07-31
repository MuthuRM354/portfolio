import React from 'react';
import { User, Code2, Zap, Brain, Layers } from 'lucide-react';
import GlassContainer from './GlassContainer';
import AnimatedMail from './AnimatedMail';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const FEATURES = [
  { icon: Code2,  title: 'Full Stack',     subtitle: 'React · Spring · Java 8' },
  { icon: Brain,  title: 'AI Integration', subtitle: 'GenAI · REST APIs · Gemini' },
  { icon: Layers, title: 'Architecture',   subtitle: 'Microservices · MongoDB · MySQL' },
  { icon: Zap,    title: 'Fast Learner',   subtitle: 'Transitioned from Chemical Eng.' },
];

const About = () => {
  const ref = useScrollReveal({ threshold: 0.12 });

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div ref={ref} className="about-content sr-section">

          {/* Header — full width, above grid */}
          <div className="about-header" data-sr>
            <div className="header-title">
              <User className="header-icon" aria-hidden="true" />
              <h2 className="header-text">About Me</h2>
            </div>
            <GlassContainer variant="tertiary" borderColor="gradient" className="header-divider" />
          </div>

          {/* Grid — envelope left, feature cards right */}
          <div className="about-grid">

            <div className="about-mail-col" data-sr="left">
              <AnimatedMail />
            </div>

            <div className="features-grid">
              {FEATURES.map(({ icon: Icon, title, subtitle }, i) => (
                <div key={i} className="skew-card">
                  <div className="skew-dots">
                    <span className="skew-dot dot-red" />
                    <span className="skew-dot dot-yellow" />
                    <span className="skew-dot dot-green" />
                  </div>
                  <div className="skew-icon-wrap">
                    <Icon size={22} className="skew-icon" />
                  </div>
                  <p className="skew-title">{title}</p>
                  <p className="skew-subtitle">{subtitle}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
