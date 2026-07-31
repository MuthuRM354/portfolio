import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Github, Linkedin, Send, MapPin, MessageCircle } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
import GlassContainer from './GlassContainer';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';
import ContactSocialCard from './ContactSocialCard';

// ── EmailJS credentials ──────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (Gmail) → copy Service ID
// 3. Create a Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    → copy Template ID
// 4. Account → API Keys → copy Public Key
const EMAILJS_SERVICE_ID = 'service_ipjdj0g';
const EMAILJS_TEMPLATE_ID = 'template_pzi2bhh';
const EMAILJS_PUBLIC_KEY = 'RmJ12eUbMF8WWqkH0';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'muthurm527@gmail.com', href: 'mailto:muthurm527@gmail.com', colorScheme: 'purple', borderColor: 'purple' },
  { icon: Phone, label: 'Phone', value: '+91 76676 96410', href: 'tel:+917667696410', colorScheme: 'cyan', borderColor: 'cyan' },
  { icon: Github, label: 'GitHub', value: 'github.com/MuthuRM354', href: 'https://github.com/MuthuRM354', colorScheme: 'gray', borderColor: 'gray' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Muthu Manikandan R M', href: 'https://www.linkedin.com/in/muthu-manikandan-rm', colorScheme: 'blue', borderColor: 'blue' },
  { icon: MapPin, label: 'Location', value: 'Chennai, India 600050', href: 'https://www.google.com/maps/place/Chennai,+Tamil+Nadu', colorScheme: 'green', borderColor: 'green' },
];

const STATS = [
  { number: '< 24h', label: 'Response Time', colorScheme: 'red' },
  { number: '3+', label: 'Projects Built', colorScheme: 'purple' },
  { number: '10+', label: 'Technologies Learned', colorScheme: 'green' },
  { number: '3+', label: 'Certifications', colorScheme: 'yellow' },
];

const Contact = () => {
  const ref = useScrollReveal({ threshold: 0.08 });
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const istTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) + ' IST';

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: `Portfolio enquiry from ${formData.name}`,
          time: istTime,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    if (formStatus && formStatus !== 'sending') setFormStatus(null);
  };

  const handleWhatsApp = () => {
    if (!formData.name.trim()) {
      alert('Please enter your name before sending via WhatsApp.');
      return;
    }
    const lines = [`Hi Muthu! I'm ${formData.name.trim()}.`];
    if (formData.email.trim()) lines.push(`Email: ${formData.email.trim()}`);
    lines.push('');
    lines.push(formData.message.trim() || "I'd like to connect with you.");
    const url = `https://api.whatsapp.com/send/?phone=917667696410&text=${encodeURIComponent(lines.join('\n'))}&type=phone_number&app_absent=0`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div ref={ref} className="contact-content sr-section">

          <div className="contact-header" data-sr>
            <div className="header-title">
              <MessageCircle className="header-icon" />
              <h2 className="header-text">Get In Touch</h2>
            </div>
            <div className="header-divider" />
            <p className="header-description">Ready to collaborate? Let's build something amazing together.</p>
          </div>

          <div className="contact-grid">

            <div className="contact-info" data-sr="left">
              <h3 className="info-title">Contact Information</h3>
              <ContactSocialCard />
              <a href="https://www.google.com/maps/place/Chennai" target="_blank" rel="noopener noreferrer" className="contact-location-link">
                <GlassContainer variant="tertiary" withRipple withHover borderColor="green" className="contact-card">
                  <div className="contact-card-content">
                    <div className="contact-icon-container green">
                      <MapPin className="contact-icon green" />
                    </div>
                    <div className="contact-text">
                      <div className="contact-value">Chennai, India 600050</div>
                    </div>
                    <div className="contact-accent green" />
                  </div>
                </GlassContainer>
              </a>
            </div>

            <div className="contact-form-section" data-sr="right">
              <GlassContainer variant="card" borderColor="gradient" className="form-container">
                <h3 className="form-title">Send a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <GlassContainer variant="tertiary" borderColor="purple" className="input-container">
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        className="form-input" placeholder="Enter your full name" required />
                    </GlassContainer>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <GlassContainer variant="tertiary" borderColor="cyan" className="input-container">
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className="form-input" placeholder="your.email@example.com" required />
                    </GlassContainer>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Details</label>
                    <GlassContainer variant="tertiary" borderColor="green" className="input-container">
                      <textarea name="message" value={formData.message} onChange={handleChange}
                        rows={3} className="form-textarea"
                        placeholder="Tell me about your project, requirements, timeline..." required />
                    </GlassContainer>
                  </div>
                  <div className="submit-section">
                    <div className="submit-buttons">
                      {/* Email via EmailJS */}
                      <button
                        type="submit"
                        className="submit-button submit-button--email"
                        disabled={formStatus === 'sending'}
                      >
                        <Send className="submit-icon" aria-hidden="true" />
                        <span>{formStatus === 'sending' ? 'Sending…' : 'Send Email'}</span>
                      </button>

                      {/* WhatsApp */}
                      <button
                        type="button"
                        className="submit-button submit-button--whatsapp"
                        onClick={handleWhatsApp}
                        disabled={formStatus === 'sending'}
                      >
                        <WhatsAppIcon />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                    {formStatus === 'sent' && (
                      <p className="form-status form-status--success" role="status">
                        ✓ Message sent — I'll get back to you soon!
                      </p>
                    )}
                    {formStatus === 'error' && (
                      <p className="form-status form-status--error" role="alert">
                        ✕ Something went wrong. Please try again or email me directly.
                      </p>
                    )}
                  </div>
                </form>
              </GlassContainer>
            </div>

          </div>

          <div className="stats-section" data-sr>
            <div className="stats-grid">
              {STATS.map((stat, i) => (
                <div key={i} className="stat-item">
                  <GlassContainer variant="tertiary" withRipple withHover borderColor="subtle" className="stat-card">
                    <div className={`stat-number ${stat.colorScheme}`}>{stat.number}</div>
                    <p className="stat-label">{stat.label}</p>
                  </GlassContainer>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-footer" data-sr="fade">
            <GlassContainer variant="tertiary" borderColor="gradient" className="cta-container">
              <div className="availability-indicator" />
              <span className="availability-text">Currently available for freelance projects and opportunities</span>
            </GlassContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
