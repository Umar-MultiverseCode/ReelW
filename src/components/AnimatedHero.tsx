import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight
} from 'lucide-react';

const Particle = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-white/5"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, filter: 'blur(1px)' }}
    animate={{
      y: [0, -20, 0],
      opacity: [0, 0.5, 0],
    }}
    transition={{ duration: 10, repeat: Infinity, delay }}
  />
);

const useCountUp = (end: number, duration = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const step = (duration * 60);
      const increment = end / step;
      let currentFrame: number;

      const timer = () => {
        start += increment;
        if (start < end) {
          setCount(Math.ceil(start));
          currentFrame = requestAnimationFrame(timer);
        } else {
          setCount(end);
        }
      };
      timer();
      return () => cancelAnimationFrame(currentFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const AnimatedHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const reelsCount = useCountUp(10000);
  const usersCount = useCountUp(5000, 2.5);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const backgroundVariants: Variants = {
    animate: {
      background: [
        'radial-gradient(ellipse at 70% 20%, #0c4a6e 0%, #1e1b4b 60%, #020617 100%)',
        'radial-gradient(ellipse at 30% 80%, #1e1b4b 0%, #4c1d95 60%, #020617 100%)',
        'radial-gradient(ellipse at 50% 50%, #0c4a6e 0%, #4c1d95 60%, #020617 100%)',
        'radial-gradient(ellipse at 70% 20%, #0c4a6e 0%, #1e1b4b 60%, #020617 100%)',
      ],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      },
    }
  };
  
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const contentContainerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="animated-bg"></div>
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={contentContainerVariants}
          initial="hidden"
          animate={controls}
          className="w-full max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-slate-100/10 backdrop-blur-md border border-slate-100/20 rounded-full px-4 py-2 text-sm font-medium text-slate-300 mb-6"
          >
            <Sparkles size={16} className="text-cyan-400" />
            <span>Revolutionary Reel Management</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-br from-slate-50 via-slate-300 to-slate-50 bg-clip-text text-transparent mb-4"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
          >
            ReelVault
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Store, organize, and share your favorite Instagram reels with intelligent categorization, mood-based filtering, and seamless social sharing.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-center mb-10"
          >
            <div className="flex items-center gap-2 text-slate-300 text-base">
              <TrendingUp size={18} className="text-cyan-400" />
              <strong className="text-white">{reelsCount}</strong>
              <span>Reels Saved</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-base">
              <Users size={18} className="text-pink-400" />
              <strong className="text-white">{usersCount}</strong>
              <span>Happy Users</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-base">
              <Zap size={18} className="text-purple-400" />
              <strong className="text-white">99.9%</strong>
              <span>Uptime</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/auth">
                <Button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg" style={{ boxShadow: '0 0 24px -4px #06b6d4' }}>
                  <Play className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                className="border-2 border-slate-100/20 bg-slate-100/5 backdrop-blur-md text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-slate-100/10 hover:border-slate-100/30"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1 } }
        }}
        initial="hidden"
        animate={controls}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-100/30 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-3 bg-slate-100/60 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AnimatedHero; 