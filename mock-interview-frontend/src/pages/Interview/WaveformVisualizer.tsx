import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isActive: boolean;
  className?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isActive, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = 200;
    const height = canvas.height = 60;
    const bars = 20;
    const barWidth = width / bars;

    let animationTime = 0;

    const animate = () => {
      if (!isActive) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < bars; i++) {
        const barHeight = Math.abs(Math.sin(animationTime * 0.01 + i * 0.3)) * height * 0.8 + 5;
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#3B82F6');
        gradient.addColorStop(1, '#10B981');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
      }
      
      animationTime += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      animate();
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`rounded-lg bg-gray-100 ${className}`}
      style={{ width: '200px', height: '60px' }}
    />
  );
};