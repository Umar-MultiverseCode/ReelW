import React, { useEffect, useState } from 'react';
import { Star, Quote, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useFeedback } from '@/hooks/useFeedback';
import { Skeleton } from './ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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

const AnimatedNumber = ({ end, duration = 2, suffix = '' }) => {
  const value = useCountUp(end, duration);
  return <>{value}{suffix}</>;
};

const Testimonials = () => {
  const { feedback, loading } = useFeedback();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-slate-800/30 to-slate-900/50">
      <div className="container mx-auto px-3 sm:px-4">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-purple-400/30 rounded-full px-3 sm:px-4 py-2 text-purple-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Heart size={14} className="sm:w-4 sm:h-4" />
            <span>User Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-4 sm:mb-6 px-2">
            Loved by Creators Worldwide
          </h2>
          <p className="text-sm sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-3">
            Join thousands of satisfied creators who have transformed their content organization with ReelVault.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10">
                  <Skeleton className="h-6 w-2/5 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-4 mt-6">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-3/5 mb-2" />
                      <Skeleton className="h-4 w-2/5" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : feedback.length > 0 ? (
            feedback.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group">
                  <CardContent className="pt-4 sm:pt-6">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/50 group-hover:text-purple-400 transition-colors" />
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-gray-300 leading-relaxed italic text-sm sm:text-lg mb-4 sm:mb-6">
                      "{testimonial.comment}"
                    </blockquote>

                    {/* User Info */}
                    <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-purple-400/30 group-hover:ring-purple-400/50 transition-all">
                        <AvatarImage src={testimonial.user_avatar_url} alt={testimonial.user_name} />
                        <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold">
                          {testimonial.user_name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white text-sm sm:text-base">{testimonial.user_name}</p>
                        <p className="text-xs sm:text-sm text-gray-400">Verified User</p>
                      </div>
                      <div className="ml-auto">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-12 max-w-2xl mx-auto">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Be the First to Share Your Experience!</h3>
                <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Join our community of creators and share how ReelVault has transformed your content organization.
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-cyan-300 text-sm sm:text-lg font-medium">
                  <Sparkles size={16} className="sm:w-5 sm:h-5" />
                  <span>Share Your Feedback</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">4.9/5</div>
            <p className="text-gray-400 text-xs sm:text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-1 sm:mb-2">10K+</div>
            <p className="text-gray-400 text-xs sm:text-sm">Happy Users</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 sm:mb-2">1M+</div>
            <p className="text-gray-400 text-xs sm:text-sm">Reels Organized</p>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">99%</div>
            <p className="text-gray-400 text-xs sm:text-sm">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 