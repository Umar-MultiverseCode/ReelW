import React, { useEffect, useState } from 'react';
import { Sparkles, BarChart, Film, Search, Wind, Heart, Share2, Lock, Zap, Users, Globe, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const useCountUp = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = (duration * 60);
    const increment = end / step;
    let currentFrame;
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
  }, [end, duration]);
  return count.toLocaleString();
};

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Tagging',
    description: 'Our advanced AI automatically analyzes your reels and suggests relevant tags, saving you hours of manual work.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-400/30'
  },
  {
    icon: Wind,
    title: 'Smart Mood Detection',
    description: 'Instantly categorize your reels by mood - funny, motivational, calm, or energetic. Find the perfect vibe instantly.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-400/30'
  },
  {
    icon: Film,
    title: 'Unified Media Library',
    description: 'Keep all your favorite Instagram Reels, YouTube Shorts, and TikTok videos in one beautifully organized vault.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-400/30'
  },
  {
    icon: Search,
    title: 'Lightning-Fast Search',
    description: 'Find any reel instantly with powerful search that scans descriptions, tags, notes, and even video content.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-400/30'
  },
  {
    icon: Heart,
    title: 'Personal Collections',
    description: 'Create custom collections and playlists. Organize reels by theme, occasion, or your personal preferences.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-400/30'
  },
  {
    icon: Share2,
    title: 'Seamless Sharing',
    description: 'Share your favorite reels with friends and family. Generate beautiful shareable collections instantly.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-400/30'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your reels are private by default. Choose what to share and control who sees your collections.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-400/30'
  },
  {
    icon: Zap,
    title: 'Instant Sync',
    description: 'Your reels sync across all devices instantly. Access your library from anywhere, anytime.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-400/30'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const Features = () => {
  return (
    <section className="py-8 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div 
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-full px-2 py-1 sm:px-4 sm:py-2 text-cyan-300 text-[11px] sm:text-sm font-medium mb-3 sm:mb-6">
            <Sparkles size={13} />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-2 sm:mb-6 px-2">
            Why Creators Choose ReelVault
          </h2>
          <p className="text-sm sm:text-xl text-gray-300 max-w-3xl mx-auto leading-snug sm:leading-relaxed px-3">
            Experience the future of content organization with AI-powered features that make managing your digital library effortless and enjoyable.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.3 }
              }}
            >
              <Card className={`bg-white/5 backdrop-blur-lg border ${feature.borderColor} text-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer p-3 sm:p-0`}>
                <CardHeader className="flex flex-row items-start gap-2 sm:gap-4 pb-2 sm:pb-4">
                  <div className={`p-2 sm:p-3 rounded-xl ${feature.bgColor} ${feature.color} group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <CardTitle className="text-sm sm:text-lg font-bold text-white leading-tight">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-gray-300 leading-snug sm:leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-8 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-cyan-400 mb-1 sm:mb-2">
              <Users size={16} />
              <span className="text-lg sm:text-3xl font-bold">10K+</span>
            </div>
            <p className="text-xs sm:text-gray-400">Active Creators</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-pink-400 mb-1 sm:mb-2">
              <Film size={16} />
              <span className="text-lg sm:text-3xl font-bold">1M+</span>
            </div>
            <p className="text-xs sm:text-gray-400">Reels Organized</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-purple-400 mb-1 sm:mb-2">
              <Globe size={16} />
              <span className="text-lg sm:text-3xl font-bold">50+</span>
            </div>
            <p className="text-xs sm:text-gray-400">Countries Served</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 