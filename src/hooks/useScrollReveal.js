import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * Apple-style IntersectionObserver hook.
 * Adds 'sr-visible' to the container and all its [data-sr] children
 * with staggered delays when the section enters the viewport.
 */
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const { threshold = 0.12, once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible');
          // Stagger all direct [data-sr] children
          const children = el.querySelectorAll('[data-sr]');
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('sr-visible'), i * 120);
          });
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove('sr-visible');
          el.querySelectorAll('[data-sr]').forEach(c => c.classList.remove('sr-visible'));
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
};

export default useScrollReveal;
