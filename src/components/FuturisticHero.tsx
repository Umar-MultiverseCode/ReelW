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
    <section className="relative w-full flex flex-col items-center justify-center pt-24 sm:pt-0">
      <AnimatedBg />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="sm:bg-slate-900/60 sm:backdrop-blur-xl sm:border sm:border-cyan-400/20 sm:rounded-3xl sm:shadow-2xl sm:shadow-cyan-500/10 px-0 sm:px-6 py-0 sm:py-6 lg:py-8 text-center min-h-0 sm:min-h-[370px] flex flex-col justify-center">
          <div className="flex flex-col items-center gap-0.5 sm:gap-6">
            {/* Heading always at the top on mobile */}
            <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight px-1 leading-tight mb-2 sm:mb-0">
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Ready to Build Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Ultimate Reel Library?
              </span>
            </h1>
            {/* 2-row, 3-column perfectly aligned rectangular feature cards on mobile, grid on sm+ */}
            <div className="w-full max-w-xs mx-auto sm:hidden mb-6 grid grid-cols-3 gap-3">
              <span className="w-full h-12 min-w-0 flex flex-col justify-center items-center text-center bg-white/10 rounded-xl text-xs font-semibold text-gray-100 border border-white/10 shadow-sm"><Zap className="h-4 w-4 text-yellow-400 mb-1" />Setup in 30s</span>
              <span className="w-full h-12 min-w-0 flex flex-col justify-center items-center text-center bg-white/10 rounded-xl text-xs font-semibold text-gray-100 border border-white/10 shadow-sm"><Users className="h-4 w-4 text-blue-400 mb-1" />10K+ users</span>
              <span className="w-full h-12 min-w-0 flex flex-col justify-center items-center text-center bg-white/10 rounded-xl text-xs font-semibold text-gray-100 border border-white/10 shadow-sm"><CheckCircle2 className="h-4 w-4 text-green-400 mb-1" />Free forever</span>
              <span className="w-full h-12 min-w-0 flex flex-col justify-center items-center text-center bg-white/10 rounded-xl text-xs font-semibold text-gray-100 border border-white/10 shadow-sm"><Wand2 className="h-4 w-4 text-purple-400 mb-1" />AI Org</span>
              <span className="w-full h-12 min-w-0 flex flex-col justify-center items-center text-center bg-white/10 rounded-xl text-xs font-semibold text-gray-100 border border-white/10 shadow-sm"><Save className="h-4 w-4 text-cyan-400 mb-1" />Unlimited</span>
              <span className="w-full h-12 min-w-0 flex flex-col justify-center items-center text-center bg-white/10 rounded-xl text-xs font-semibold text-gray-100 border border-white/10 shadow-sm"><Lock className="h-4 w-4 text-pink-400 mb-1" />Private</span>
            </div>
            {/* sm+ grid as before */}
            <div className="hidden sm:grid w-full max-w-4xl mx-auto grid-cols-3 gap-3 text-sm px-1 mb-2">
              <span className="flex items-center gap-1 text-gray-300 bg-white/5 p-2 rounded-lg justify-center"><Zap className="h-4 w-4 text-yellow-400" /> Setup in 30s</span>
              <span className="flex items-center gap-1 text-gray-300 bg-white/5 p-2 rounded-lg justify-center"><Users className="h-4 w-4 text-blue-400" /> 10K+ happy users</span>
              <span className="flex items-center gap-1 text-gray-300 bg-white/5 p-2 rounded-lg justify-center"><CheckCircle2 className="h-4 w-4 text-green-400" /> Free forever</span>
              <span className="flex items-center gap-1 text-gray-300 bg-white/5 p-2 rounded-lg justify-center"><Wand2 className="h-4 w-4 text-purple-400" /> AI Org</span>
              <span className="flex items-center gap-1 text-gray-300 bg-white/5 p-2 rounded-lg justify-center"><Save className="h-4 w-4 text-cyan-400" /> Unlimited</span>
              <span className="flex items-center gap-1 text-gray-300 bg-white/5 p-2 rounded-lg justify-center"><Lock className="h-4 w-4 text-pink-400" /> Private</span>
            </div>
            {/* Workflow quote with spacing below */}
            <div className="text-yellow-400 my-2 sm:my-2 text-xs sm:text-base italic px-2 mb-2 sm:mb-0">
              "Best tool for organizing reels! Changed my workflow."
            </div>
            {/* Mobile: Button after feature cards, then badge and trust indicators below */}
            <Button
              onClick={handleStartClick}
              className="mt-2 sm:hidden bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-bold text-base py-2 px-4 rounded-full shadow-lg shadow-pink-500/20 hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 ease-in-out transform w-full max-w-xs mx-auto mb-2"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Building Your Vault
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex flex-col items-center gap-1 mt-2 sm:hidden">
              <Badge variant="outline" className="text-cyan-300 border-cyan-300/30 text-xs py-1 px-2 tracking-widest uppercase bg-transparent border-none">
                The #1 AI Vault for Creators
              </Badge>
              <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-0.5 text-xs text-gray-400">
                <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-400" /> Trusted by 10,000+</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" /> 4.9/5 rating</span>
                <span className="flex items-center gap-1"><CreditCard className="h-3 w-3 text-gray-500" /> No credit card required</span>
              </div>
            </div>
            {/* Desktop/Tablet: Badge and trust indicators above button as before */}
            <div className="hidden sm:flex flex-col items-center gap-0.5">
              <Badge variant="outline" className="text-cyan-300 border-cyan-300/30 text-sm py-1 px-4 tracking-widest uppercase mb-0 bg-inherit border-inherit">
                The #1 AI Vault for Creators
              </Badge>
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-400 mb-0">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> Trusted by 10,000+</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-400" /> 4.9/5 rating</span>
                <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-gray-500" /> No credit card required</span>
              </div>
              <Button
                onClick={handleStartClick}
                className="mt-6 bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-pink-500/20 hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 ease-in-out transform w-auto"
              >
                <Play className="mr-3 h-6 w-6" />
                Start Building Your Vault
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-3xl px-1 mb-0 sm:mb-0">
              Organize, save, and never lose your favorite reels again.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FuturisticHero;