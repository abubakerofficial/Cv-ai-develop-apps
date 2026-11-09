import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(48, Math.floor(width / 32));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.45 - 0.1,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.55 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseOffset: Math.random() * Math.PI * 2
    }));

    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha =
          p.alpha * (0.65 + 0.35 * Math.sin(tick * p.pulseSpeed + p.pulseOffset));

        // Subtle glowing crimson particle halo
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 5
        );
        gradient.addColorStop(0, `rgba(255, 0, 51, ${currentAlpha})`);
        gradient.addColorStop(0.45, `rgba(255, 0, 51, ${currentAlpha * 0.35})`);
        gradient.addColorStop(1, 'rgba(255, 0, 51, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        // Crisp core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 110, 130, ${Math.min(1, currentAlpha * 1.4)})`;
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with subtle cybernetic filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
            const lineAlpha = (1 - dist / 135) * 0.11;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 0, 51, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep dark ambient crimson gradient mesh */}
      <div
        className="absolute -top-48 left-1/4 h-[540px] w-[540px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, #ff0033 0%, rgba(120,0,24,0.3) 55%, transparent 100%)'
        }}
      />
      <div
        className="absolute top-[42%] -right-36 h-[480px] w-[480px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, #ff0033 0%, rgba(90,0,18,0.2) 60%, transparent 100%)'
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, #ff0033 0%, transparent 75%)'
        }}
      />

      {/* Subtle architectural perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
