import React, { useCallback, useEffect, useRef, useState } from 'react';
import './GlassContainer.css';

const GlassContainer = ({
  children,
  variant = 'primary',
  withRipple = false,
  withHover = false,
  borderColor = 'cyan',
  className = '',
  onClick,
}) => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);
  const rippleIdRef = useRef(0);
  const timeoutsRef = useRef(new Set());

  // Clear pending timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((t) => clearTimeout(t));
      timeouts.clear();
    };
  }, []);

  const handleClick = useCallback(
    (event) => {
      if (withRipple && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        rippleIdRef.current += 1;
        const id = rippleIdRef.current;

        setRipples((prev) => [...prev, { id, x, y }]);

        const timeoutId = setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
          timeoutsRef.current.delete(timeoutId);
        }, 1000);
        timeoutsRef.current.add(timeoutId);
      }

      // Always invoke the consumer's onClick, regardless of ripple flag
      if (onClick) onClick(event);
    },
    [withRipple, onClick],
  );

  const baseClass = `glass-${variant}`;
  const colorClass = borderColor !== 'gradient' ? `glass-${borderColor}` : 'glass-gradient';
  const interactiveClass = withHover ? 'glass-interactive' : '';

  return (
    <div
      ref={containerRef}
      className={`glass-container ${baseClass} ${colorClass} ${interactiveClass} ${className}`}
      onClick={handleClick}
    >
      {withRipple &&
        ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="glass-ripple"
            style={{ left: ripple.x - 150, top: ripple.y - 150 }}
            aria-hidden="true"
          />
        ))}

      <div className="glass-content">{children}</div>
    </div>
  );
};

export default React.memo(GlassContainer);
