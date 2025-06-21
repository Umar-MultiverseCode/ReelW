import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, CreditCard, Lock, Play, Save, Share2, Star, Users, Wand2, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { AnimatedBg } from './AnimatedBg';

const FuturisticHero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!user) {
      navigate('/auth');
    } else {
      // Logic for logged-in user
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-2 pt-20 sm:p-4 sm:pt-24">
      <AnimatedBg />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-400/20 rounded-3xl shadow-2xl shadow-cyan-500/10 p-3 sm:p-6 md:p-8 text-center">
          <div className="flex flex-col items-center">

            <Badge variant="outline" className="text-cyan-300 border-cyan-300/30 text-xs sm:text-sm py-1 px-2 sm:px-4 tracking-widest uppercase">
              The #1 AI Vault for Creators
            </Badge>
            
            <Button className="mt-3 sm:mt-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-1.5 px-3 text-xs sm:py-2 sm:px-6 sm:text-base rounded-full shadow-lg hover:scale-105 transition-transform">
              Join 10,000+ Creators
            </Button>

            <div className="mt-3 sm:mt-4 flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-6 gap-y-1 sm:gap-y-2 text-xs sm:text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" /> Trusted by 10,000+</span>
              <span className="flex items-center gap-1.5"><Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" /> 4.9/5 rating</span>
              <span className="flex items-center gap-1.5"><CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" /> No credit card required</span>
            </div>

            <h1 className="mt-4 sm:mt-6 text-2xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Ready to Build Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Ultimate Reel Library?
              </span>
            </h1>

            <p className="mt-2 sm:mt-4 text-xs sm:text-base md:text-lg text-gray-300 max-w-3xl">
              Organize, save, and never lose your favorite reels again.
            </p>
            
            <div className="mt-3 sm:mt-4 text-yellow-400 my-1 sm:my-2 text-xs sm:text-base italic">
              "Best tool for organizing reels! Changed my workflow."
            </div>
            
            <div className="mt-4 sm:mt-6 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 text-[10px] sm:text-sm">
              <span className="flex items-center gap-1 sm:gap-2 text-gray-300 bg-white/5 p-1.5 sm:p-2 rounded-lg justify-center"><Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" /> Setup in 30s</span>
              <span className="flex items-center gap-1 sm:gap-2 text-gray-300 bg-white/5 p-1.5 sm:p-2 rounded-lg justify-center"><Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" /> 10K+ happy users</span>
              <span className="flex items-center gap-1 sm:gap-2 text-gray-300 bg-white/5 p-1.5 sm:p-2 rounded-lg justify-center"><CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" /> Free forever</span>
              <span className="flex items-center gap-1 sm:gap-2 text-gray-300 bg-white/5 p-1.5 sm:p-2 rounded-lg justify-center"><Wand2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" /> AI Org</span>
              <span className="flex items-center gap-1 sm:gap-2 text-gray-300 bg-white/5 p-1.5 sm:p-2 rounded-lg justify-center"><Save className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" /> Unlimited</span>
              <span className="flex items-center gap-1 sm:gap-2 text-gray-300 bg-white/5 p-1.5 sm:p-2 rounded-lg justify-center"><Lock className="h-3 w-3 sm:h-4 sm:w-4 text-pink-400" /> Private</span>
            </div>

            <Button
              onClick={handleStartClick}
              className="mt-5 sm:mt-8 bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-bold text-sm sm:text-lg py-2 sm:py-4 px-4 sm:px-8 rounded-full shadow-lg shadow-pink-500/20 hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 ease-in-out transform"
            >
              <Play className="mr-1 sm:mr-3 h-4 w-4 sm:h-6 sm:w-6" />
              Start Building Your Vault
              <ArrowRight className="ml-1 sm:ml-3 h-4 w-4 sm:h-6 sm:w-6" />
            </Button>
            
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FuturisticHero;