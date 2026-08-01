# Modern Portfolio Website — Neon Theme

A personal portfolio site built with React, featuring a cyberpunk/neon visual theme, glassmorphism UI, an animated background, and a built-in AI chat agent for visitors to ask about my background.

**Live repo:** [MuthuRM354/portfolio](https://github.com/MuthuRM354/portfolio)

## Features

- **Neon / cyberpunk theme** with a dark-first design and a light/dark toggle (persisted to `localStorage`, falls back to `prefers-color-scheme`)
- **Animated background** — particle/neural-network style canvas effects
- **Glassmorphism UI** via a reusable `GlassContainer` component
- **Scroll-reveal animations** using `IntersectionObserver` (`useScrollReveal` hook)
- **AI Chat Agent** (`ChatAgent.jsx`) powered by the Google Generative AI SDK, so visitors can ask questions about my experience
- **Resume download** — bundled PDF, plus an animated "mail" contact affordance
- **Fully responsive**, single-page layout with a fixed side navigation bar

## Tech Stack

- **React 18** (Create React App / `react-scripts`)
- **React Router DOM** for navigation
- `@google/generative-ai` for the chat agent
- `@emailjs/browser` for the contact form
- `lucide-react` for icons
- Plain CSS (custom properties/theming, no CSS-in-JS)

## Project Structure

```
src/
├── App.jsx                    # Root component, theme context, scroll-reveal setup
├── main.css / App.css         # Global styles and theme variables
├── components/
│   ├── Hero.jsx                    # Landing/hero section
│   ├── About.jsx                   # About me
│   ├── Skills.jsx                  # Technical skills
│   ├── Projects.jsx                 # Project showcase
│   ├── Experience.jsx               # Work experience timeline
│   ├── Education.jsx                # Education history
│   ├── Certifications.jsx           # Certifications
│   ├── Contact.jsx / ContactSocialCard.jsx  # Contact section & social links
│   ├── AnimatedMail.jsx              # Animated contact call-to-action
│   ├── ChatAgent.jsx                 # AI-powered chat widget
│   ├── AnimatedBackground.jsx        # Background particle/neon effects
│   ├── SideNavbar.jsx                # Fixed side navigation
│   └── GlassContainer.jsx            # Reusable glassmorphism wrapper
├── data/
│   └── resume.json            # Structured resume data used across sections
└── hooks/
    └── useScrollReveal.js     # IntersectionObserver-based reveal hook
```

## Getting Started

### Prerequisites

- Node.js 14+
- npm

### Installation

```bash
git clone https://github.com/MuthuRM354/portfolio.git
cd portfolio
npm install
```

### Environment variables

The chat agent and contact form need API keys — create a `.env` file in the project root:

```
REACT_APP_GEMINI_API_KEY=your_google_generative_ai_key
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Run locally

```bash
npm start
```

Visit `http://localhost:3000`.

### Build for production

```bash
npm run build
```

## Available Scripts

- `npm start` — start the dev server
- `npm run build` — production build
- `npm test` — run tests
- `npm run eject` — eject from Create React App (irreversible)

## License

MIT — see the repository for details.
