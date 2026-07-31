import React from 'react';
import './AnimatedMail.css';

const AnimatedMail = () => (
  <div className="mail-wrapper">
    <div className="mail-hint">&#9993; Hover to open</div>
    <div className="letter-image">
      <div className="animated-mail">
        <div className="back-fold"></div>
        <div className="letter">
          <div className="letter-border"></div>
          <div className="letter-content">
            <p className="lc-name">Muthu Manikandan R.</p>
            <p className="lc-role">Full Stack Developer &middot; Chennai, India</p>
            <div className="lc-divider"></div>
            <p className="lc-text">
              Proficient in <span className="lc-highlight cyan">Java</span> with strong knowledge of OOP,
              Data Structures &amp; Algorithms &mdash; plus hands-on expertise in{' '}
              <span className="lc-highlight purple">Spring MVC</span>,{' '}
              <span className="lc-highlight cyan">React.js</span>, JSP, MySQL, and MongoDB.
            </p>
            <p className="lc-text">
              Certified in <span className="lc-highlight gold">Full Stack Development with GenAI at NIIT, Chennai</span>.
              Built projects like Foodie App (Spring Boot + JWT), Dairy Delights &amp; Spice Garden Restaurant.
            </p>
            <p className="lc-text">
              Currently a <span className="lc-highlight cyan">Software Developer at Kuwy Technology Services PVT Ltd</span> (Oct 2025 &ndash; Present),
              building full-stack apps using Spring MVC, JSP, Java 8 &amp; MySQL in a fintech environment.
            </p>
            <p className="lc-text">
              Transitioned into IT in 2024 after a <span className="lc-highlight purple">B.Tech in Chemical Engineering</span>,
              bringing analytical thinking &amp; structured problem-solving to software.
            </p>
            <div className="lc-divider"></div>
            <p className="lc-email">&#9993; muthurm527@gmail.com</p>
          </div>
          <div className="letter-stamp"></div>
        </div>
        <div className="top-fold"></div>
        <div className="body"></div>
        <div className="left-fold"></div>
      </div>
      <div className="shadow"></div>
    </div>
  </div>
);

export default AnimatedMail;
