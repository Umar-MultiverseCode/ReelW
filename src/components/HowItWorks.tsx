import React from 'react';
import { ClipboardPaste, Bot, Library, Sparkles, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: ClipboardPaste,
    title: 'Paste & Save',
    description: 'Simply paste the link to any Instagram Reel, YouTube Short, or TikTok video you want to save.',
    details: [
      'Supports multiple platforms',
      'Instant link validation',
      'Automatic metadata extraction'
    ],
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-400/30'
  },
  {
    icon: Bot,
    title: 'AI Magic Happens',
    description: 'Our advanced AI automatically analyzes content, detects mood, and suggests smart tags for perfect organization.',
    details: [
      'Mood detection (funny, motivational, etc.)',
      'Smart tag suggestions',
      'Content categorization'
    ],
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-400/30'
  },
  {
    icon: Library,
    title: 'Organize & Enjoy',
    description: 'Build your perfect collection with powerful search, filters, and personal notes. Rediscover your favorites anytime.',
    details: [
      'Advanced search & filters',
      'Personal notes & collections',
      'Cross-device sync'
    ],
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-400/30'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-800/30 to-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-pink-400/30 rounded-full px-4 py-2 text-pink-300 text-sm font-medium mb-6">
            <Zap size={16} />
            <span>Simple & Fast</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-6">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From saving your first reel to building a perfectly organized library - it's that simple.
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="text-center relative flex flex-col items-center"
                variants={stepVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Step Number */}
                <div className="relative flex flex-col items-center" style={{ minHeight: 80 }}>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-400 text-white text-xl font-bold shadow-lg border-2 border-white/30">
                    {index + 1}
                  </span>
                  <div className="mt-8" />
                  {/* Step Icon */}
                  <div className={`mx-auto mb-4 p-6 rounded-2xl border-2 ${step.borderColor} ${step.bgColor} ${step.color} relative flex items-center justify-center`} style={{ minWidth: 80, minHeight: 80 }}>
                    <step.icon className="w-12 h-12" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 mt-2">{step.title}</h3>
                <div className="flex justify-center mb-2">
                  <ArrowRight className="w-5 h-5 text-cyan-300" />
                </div>
                <p className="text-base text-gray-300 mb-4 max-w-xs mx-auto">{step.description}</p>
                <ul className="text-left text-sm text-cyan-200 space-y-1 mx-auto max-w-xs">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-3 text-cyan-300 text-lg font-medium">
            <Sparkles size={20} />
            <span>Ready to start organizing your reels?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 