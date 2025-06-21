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
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-800/30 to-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 py-2 text-purple-300 text-sm font-medium mb-6">
            <Heart size={16} />
            <span>User Testimonials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-6">
            Loved by Creators Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied creators who have transformed their content organization with ReelVault.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="bg-white/5 p-6 rounded-2xl border border-white/10">
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
                  <CardContent className="pt-6">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-purple-400/50 group-hover:text-purple-400 transition-colors" />
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-gray-300 leading-relaxed italic text-lg mb-6">
                      "{testimonial.comment}"
                    </blockquote>

                    {/* User Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <Avatar className="w-12 h-12 ring-2 ring-purple-400/30 group-hover:ring-purple-400/50 transition-all">
                        <AvatarImage src={testimonial.user_avatar_url} alt={testimonial.user_name} />
                        <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold">
                          {testimonial.user_name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white">{testimonial.user_name}</p>
                        <p className="text-sm text-gray-400">Verified User</p>
                      </div>
                      <div className="ml-auto">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
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
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-2xl mx-auto">
                <Heart className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Be the First to Share Your Experience!</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Join our community of creators and share how ReelVault has transformed your content organization.
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-3 text-cyan-300 text-lg font-medium">
                  <Sparkles size={20} />
                  <span>Share Your Feedback</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">4.9/5</div>
            <p className="text-gray-400">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">10K+</div>
            <p className="text-gray-400">Happy Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">1M+</div>
            <p className="text-gray-400">Reels Organized</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">99%</div>
            <p className="text-gray-400">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 