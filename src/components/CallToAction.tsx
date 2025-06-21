import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Star, Users, Clock } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div 
          className="relative overflow-hidden bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 text-center shadow-2xl border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500/15 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-full px-3 sm:px-4 py-2 text-cyan-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles size={14} className="sm:w-4 sm:h-4" />
              <span>Join 10,000+ Creators</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2 
              className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg mb-4 sm:mb-6 px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to Build Your
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ultimate Reel Library?
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-sm sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Stop losing track of amazing content. Join thousands of creators who are already organizing their digital inspiration with AI-powered tools.
            </motion.p>

            {/* Benefits Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 sm:gap-3 text-cyan-300">
                <Zap size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Setup in 30 seconds</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-pink-300">
                <Users size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">10K+ happy users</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-purple-300">
                <Star size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Free forever plan</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/auth">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 font-bold group"
                  >
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Start Building Your Vault
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-1">
                <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>Join 10K+ creators</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>4.9/5 rating</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction; 