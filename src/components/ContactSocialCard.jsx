import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './ContactSocialCard.css';

const MODALS = {
  phone: {
    label: 'Phone Number',
    value: '+91 76676 96410',
    btnText: 'Call Now',
    href: 'tel:+917667696410',
    color: '#22d3ee',
  },
  mail: {
    label: 'Email Address',
    value: 'muthurm527@gmail.com',
    btnText: 'Send Email',
    href: 'mailto:muthurm527@gmail.com',
    color: '#818cf8',
  },
  github: {
    label: 'GitHub Profile',
    value: 'github.com/MuthuRM354',
    btnText: 'Visit Profile',
    href: 'https://github.com/MuthuRM354',
    color: '#c9a84c',
    external: true,
  },
  linkedin: {
    label: 'LinkedIn Profile',
    value: 'Muthu Manikandan R M',
    btnText: 'View Profile',
    href: 'https://linkedin.com/in/muthu-manikandan-rm',
    color: '#38bdf8',
    external: true,
  },
};

const PhoneSVG = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={size} width={size}>
    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor"
      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.21 2.21z"/>
  </svg>
);
const MailSVG = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={size} width={size}>
    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" points="22,6 12,13 2,6"/>
  </svg>
);
const GithubSVG = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={size} width={size}>
    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor"
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
);
const LinkedinSVG = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height={size} width={size}>
    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor"
      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2" strokeWidth="2" stroke="currentColor"/>
  </svg>
);

const ICONS = { phone: PhoneSVG, mail: MailSVG, github: GithubSVG, linkedin: LinkedinSVG };

const Modal = ({ type, onClose }) => {
  const m = MODALS[type];
  const Icon = ICONS[type];
  return ReactDOM.createPortal(
    <div className="csc-modal-overlay" onClick={onClose}>
      <div className="csc-modal" onClick={e => e.stopPropagation()}>
        <button className="csc-modal-close" onClick={onClose}>✕</button>
        <div className="csc-modal-icon" style={{ background: `${m.color}18`, borderColor: `${m.color}50`, color: m.color }}>
          <Icon size={32} />
        </div>
        <p className="csc-modal-label">{m.label}</p>
        <p className="csc-modal-number" style={{ fontSize: type === 'mail' ? '1rem' : '1.4rem' }}>{m.value}</p>
        <a
          href={m.href}
          className="csc-modal-call-btn"
          style={{ background: `linear-gradient(135deg, ${m.color}, #818cf8)` }}
          {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <Icon size={18} />
          {m.btnText}
        </a>
      </div>
    </div>,
    document.body
  );
};

const ContactSocialCard = () => {
  const [active, setActive] = useState(null);

  const open = (type) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(type);
  };

  return (
    <>
      <div className="csc-card">
        <img className="csc-astronaut" src="https://uiverse.io/astronaut.png" alt="astronaut" />
        <div className="csc-heading">Connect with Me</div>
        <div className="csc-icons">
          <button type="button" className="csc-link csc-phone"   onClick={open('phone')}   title="Call">
            <PhoneSVG />
          </button>
          <button type="button" className="csc-link csc-mail"    onClick={open('mail')}    title="Email">
            <MailSVG />
          </button>
          <button type="button" className="csc-link csc-github"  onClick={open('github')}  title="GitHub">
            <GithubSVG />
          </button>
          <button type="button" className="csc-link csc-linkedin" onClick={open('linkedin')} title="LinkedIn">
            <LinkedinSVG />
          </button>
        </div>
      </div>

      {active && <Modal type={active} onClose={() => setActive(null)} />}
    </>
  );
};

export default ContactSocialCard;
