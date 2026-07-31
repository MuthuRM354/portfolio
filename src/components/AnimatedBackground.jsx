import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 140;
const MOUSE_REPEL_RADIUS = 120;
const MOUSE_REPEL_FORCE = 2.5;
const BASE_SPEED = 0.4;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

const COLORS = ['#22D3EE', '#818CF8', '#C9A84C', '#22D3EE', '#818CF8'];

class Particle {
  constructor(w, h) {
    this.reset(w, h);
  }
  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * BASE_SPEED;
    this.vy = (Math.random() - 0.5) * BASE_SPEED;
    this.radius = 1.5 + Math.random() * 1.5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.rgb = hexToRgb(this.color);
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.02 + Math.random() * 0.02;
  }
  update(w, h, mouse) {
    this.pulse += this.pulseSpeed;

    // Mouse repulsion
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
        const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS;
        this.vx += (dx / dist) * force * MOUSE_REPEL_FORCE * 0.05;
        this.vy += (dy / dist) * force * MOUSE_REPEL_FORCE * 0.05;
      }
    }

    // Dampen velocity
    this.vx *= 0.99;
    this.vy *= 0.99;

    // Clamp speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > BASE_SPEED * 4) {
      this.vx = (this.vx / speed) * BASE_SPEED * 4;
      this.vy = (this.vy / speed) * BASE_SPEED * 4;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap edges
    if (this.x < -10) this.x = w + 10;
    if (this.x > w + 10) this.x = -10;
    if (this.y < -10) this.y = h + 10;
    if (this.y > h + 10) this.y = -10;
  }
  draw(ctx) {
    const pulseFactor = 0.8 + 0.2 * Math.sin(this.pulse);
    const r = this.radius * pulseFactor;
    const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 3);
    glow.addColorStop(0, `rgba(${this.rgb},0.9)`);
    glow.addColorStop(0.5, `rgba(${this.rgb},0.3)`);
    glow.addColorStop(1, `rgba(${this.rgb},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 3, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.rgb},1)`;
    ctx.fill();
  }
}

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], mouse: { x: null, y: null }, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    state.particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(canvas.width, canvas.height));

    const onMouseMove = (e) => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      state.mouse.x = null;
      state.mouse.y = null;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      state.particles.forEach(p => p.update(w, h, state.mouse));

      // Draw connections
      for (let i = 0; i < state.particles.length; i++) {
        for (let j = i + 1; j < state.particles.length; j++) {
          const a = state.particles[i];
          const b = state.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.35;
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${a.rgb},${alpha})`);
            grad.addColorStop(1, `rgba(${b.rgb},${alpha})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles on top
      state.particles.forEach(p => p.draw(ctx));

      state.raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animated-background-canvas"
      aria-hidden="true"
    />
  );
};

export default React.memo(AnimatedBackground);
