import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Code, Database, Server, Layout, Terminal, CheckCircle2 } from 'lucide-react';
import './Hero.css';

const roles = ['Full Stack Architecture', 'React Ecosystems', 'Java Microservices', 'AI Integrations'];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Holographic Card State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const role = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === role) {
      setTimeout(() => setIsDeleting(true), 2500);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(role.substring(0, displayText.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    const centerX = box.width / 2;
    const centerY = box.height / 2;

    // Rotate max 20 degrees
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    const glareX = (x / box.width) * 100;
    const glareY = (y / box.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Smooth reset
    setRotate({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <section id="hero" className="hero-wow-section">
      {/* Background Ambient Glows */}
      <div className="hero-ambient-glow glow-1"></div>
      <div className="hero-ambient-glow glow-2"></div>

      <div className="hero-wow-container">

        {/* LEFT COLUMN: Typography & CTAs */}
        <div className="hero-wow-content">
          <div className="hero-status-pill reveal">
            <span className="status-dot"></span>
            <span className="status-text">SYSTEM ONLINE: READY TO BUILD</span>
          </div>

          <h1 className="hero-wow-title reveal">
            Muthu <br />
            <span className="text-gradient-animate">Manikandan R</span>
          </h1>

          <div className="hero-wow-role reveal">
            <Terminal size={24} className="role-icon" />
            <span className="role-prefix">Engineered for</span>
            <span className="role-typewriter">{displayText}<span className="role-cursor">_</span></span>
          </div>

          <p className="hero-wow-bio reveal">
            I don't just write code; I architect solutions. Specializing in high-performance React frontends and scalable Java backends to bridge the gap between design and robust engineering.
          </p>

          <div className="hero-wow-cta reveal">
            <a href="#projects" className="btn-wow-primary">
              <span className="btn-content">Initialize Projects <ArrowRight size={18} /></span>
              <div className="btn-glow"></div>
            </a>
            <a href="/resume.pdf" className="btn-wow-secondary">
              <Code size={18} /> Download_Resume.pdf
            </a>
          </div>

          <div className="hero-wow-metrics reveal">
            <div className="metric">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Responsive</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span className="metric-val">&lt;1s</span>
              <span className="metric-lbl">Load Times</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric">
              <span className="metric-val">24/7</span>
              <span className="metric-lbl">Uptime Architecture</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Holographic ID Card */}
        <div className="hero-wow-visual reveal">

          <div
            className="holographic-card-wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: isHovering ? 'none' : 'transform 0.5s ease-out'
            }}
          >
            {/* The Conic Gradient Border Layer */}
            <div className="holo-card-border"></div>

            {/* The Actual Card Content Layer */}
            <div className="holo-card-inner">

              {/* Dynamic Glare Overlay */}
              <div
                className="holo-glare"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                  opacity: glare.opacity,
                  transition: isHovering ? 'none' : 'opacity 0.5s ease'
                }}
              ></div>

              {/* Photo Area with Scanlines */}
              <div className="holo-photo-container">
                <img src="/profile-photo.jpg" alt="Muthu Manikandan" className="holo-photo" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Muthu+Manikandan&background=1e293b&color=818CF8&size=300' }} />
                <div className="holo-scanlines"></div>
              </div>

              {/* ID Details */}
              <div className="holo-details">
                <div className="holo-name">MUTHU MANIKANDAN R</div>
                <div className="holo-title">Full Stack Engineer</div>

                <div className="holo-status">
                  <div className="holo-status-indicator">
                    <span className="ping"></span>
                    <span className="core"></span>
                  </div>
                  Available for Hire
                </div>
              </div>

              {/* Floating Orbiting Badges
              <div className="holo-badge badge-react"><Layout size={14} /> React</div>
              <div className="holo-badge badge-java"><Server size={14} /> Java Spring</div>
              <div className="holo-badge badge-db"><Database size={14} /> Systems</div> */}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
