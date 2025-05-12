import React, { useEffect, useRef } from 'react';

const RainEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameTime = useRef(0);
  const frameInterval = 1000 / 60; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    interface Raindrop {
      x: number;
      y: number;
      length: number;
      speedY: number;
      speedX: number;
      width: number;
      opacity: number;
    }

    const MAX_RAINDROPS = 300;
    const raindrops: Raindrop[] = [];

    for (let i = 0; i < MAX_RAINDROPS; i++) {
      raindrops.push({
        x: Math.random() * width * 1.2,
        y: Math.random() * height * 2 - height,
        length: Math.random() * 20 + 10,
        speedY: Math.random() * 15 + 15,
        speedX: Math.random() * -2 - 1,
        width: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.7 + 0.6,
      });
    }

    const drawRaindrop = (d: Raindrop) => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.speedX * 2, d.y + d.length);
      ctx.strokeStyle = `rgba(174,194,224,${d.opacity})`;
      ctx.lineWidth = d.width;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameTime.current < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = timestamp;

      ctx.clearRect(0, 0, width, height);

      raindrops.forEach((d) => {
        drawRaindrop(d);
        d.x += d.speedX;
        d.y += d.speedY;

        if (d.y > height) {
          d.y = -Math.random() * height;
          d.x = Math.random() * width * 1.2;
        }
      });

      requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default RainEffect;