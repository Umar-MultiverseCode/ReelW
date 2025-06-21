import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const AnimatedWave = ({ offset = 0, color = '#6366f1', opacity = 0.12, speed = 1 }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [path, setPath] = useState('');

  useEffect(() => {
    // Animate a sine wave
    const width = 1600;
    const height = 320;
    const points = 60;
    let frame = 0;
    let running = true;
    function animate() {
      let d = '';
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const y =
          height / 2 +
          Math.sin((i / points) * Math.PI * 2 + (frame * 0.02 * speed) + offset) * 32 +
          Math.sin((i / points) * Math.PI * 6 + (frame * 0.01 * speed) + offset) * 8;
        d += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
      }
      d += ` L${width},${height} L0,${height} Z`;
      setPath(d);
      if (running) {
        frame++;
        requestAnimationFrame(animate);
      }
    }
    animate();
    return () => { running = false; };
  }, [offset, speed]);

  return (
    <path
      ref={pathRef}
      d={path}
      fill={color}
      opacity={opacity}
      style={{ transition: 'opacity 0.3s' }}
    />
  );
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Animated gradient background
const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(162, 28, 175, 0.1) 100%)',
      }}
      animate={{
        background: [
          'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(162, 28, 175, 0.12) 100%)',
          'radial-gradient(ellipse at 70% 80%, rgba(6, 182, 212, 0.12) 0%, rgba(162, 28, 175, 0.08) 50%, rgba(99, 102, 241, 0.15) 100%)',
          'radial-gradient(ellipse at 50% 50%, rgba(162, 28, 175, 0.1) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(6, 182, 212, 0.12) 100%)',
          'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(162, 28, 175, 0.12) 100%)',
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const HeroBackground: React.FC = () => {
  // Parallax effect
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(.25,.8,.25,1)'
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradient />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Animated waves */}
      <svg width="100%" height="100%" viewBox="0 0 1600 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-[320px]">
        <AnimatedWave color="#6366f1" opacity={0.13} speed={1} />
        <AnimatedWave color="#06b6d4" opacity={0.10} speed={1.3} offset={1.5} />
        <AnimatedWave color="#a21caf" opacity={0.09} speed={0.7} offset={3.2} />
      </svg>
      
      {/* Subtle dots layer */}
      <svg width="100%" height="100%" viewBox="0 0 1600 320" className="absolute inset-0 w-full h-full">
        {[...Array(18)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 1600}
            cy={Math.random() * 320}
            r={2 + Math.random() * 2}
            fill="#fff"
            opacity={0.07 + Math.random() * 0.07}
            animate={{
              opacity: [0.07, 0.2, 0.07],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Additional animated elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default HeroBackground; 