import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const particlesContainer = particlesRef.current;
    if (!cursor || !particlesContainer) return;

    let particles: Array<{ element: HTMLDivElement; velocityX: number; velocityY: number }> = [];

    document.body.style.cursor = 'none';

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';

        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        const velocityX = (Math.random() - 0.5) * 2;
        const velocityY = Math.random() * 1 + 1;
        
        particle.style.left = `${e.clientX + offsetX}px`;
        particle.style.top = `${e.clientY + offsetY}px`;
        particlesContainer.appendChild(particle);
        
        particles.push({
          element: particle,
          velocityX,
          velocityY
        });
      }

      if (particles.length > 50) {
        const old = particles.shift();
        if (old) particlesContainer.removeChild(old.element);
      }
    };

    const animateParticles = () => {
      particles.forEach((p, i) => {
        const x = parseFloat(p.element.style.left || '0') + p.velocityX;
        const y = parseFloat(p.element.style.top || '0') + p.velocityY;
        const scale = Math.max(0, parseFloat(p.element.style.transform.replace('scale(', '') || '1') - 0.01);
        const opacity = Math.max(0, parseFloat(p.element.style.opacity || '1') - 0.015);
        
        p.element.style.left = `${x}px`;
        p.element.style.top = `${y}px`;
        p.element.style.transform = `scale(${scale})`;
        p.element.style.opacity = opacity.toString();
        
        if (opacity <= 0) {
          particlesContainer.removeChild(p.element);
          particles.splice(i, 1);
        }
      });
      requestAnimationFrame(animateParticles);
    };

    window.addEventListener('mousemove', updateCursor);
    animateParticles();

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={particlesRef} className="cursor-particles" />
    </>
  );
};

export default CustomCursor;