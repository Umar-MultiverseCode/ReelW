import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Filter, TrendingUp, Clock, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ReelForm from '@/components/ReelForm';
import ReelCard from '@/components/ReelCard';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useReels } from '@/hooks/useReels';
import { Link } from 'react-router-dom';
import AboutMe from '@/components/AboutMe';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import CallToAction from '@/components/CallToAction';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import FeedbackForm from '@/components/FeedbackForm';
import { useFeedback } from '@/hooks/useFeedback';
import MobileMenu from '@/components/MobileMenu';
import AnimatedHero from '@/components/AnimatedHero';
import FuturisticHero from '../components/FuturisticHero';
import { useInView } from 'framer-motion';

// Animated stars background (CSS only)
const StarsBg = () => {
  const stars = Array.from({ length: 48 }).map((_, i) => {
    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = 2.5 + Math.random() * 2;
    return (
      <div
        key={i}
        className="star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });
  return <div className="stars-bg">{stars}</div>;
};

// Improved Count up animation hook (triggers only when in view, returns span for JSX)
const useCountUp = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
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
    }
  }, [isInView, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [filteredReels, setFilteredReels] = useState<any[]>([]);
  const { user, loading: authLoading } = useAuth();
  const { 
    reels, 
    loading: reelsLoading, 
    addReel, 
    toggleLike, 
    deleteReel,
    incrementViewCount,
    updateNotes,
    suggestTags,
    detectMood
  } = useReels();

  const moods = ['Funny', 'Motivational', 'Educational', 'Calm', 'Emotional', 'Creative', 'Energetic'];

  // Filter reels based on search term and mood
  useEffect(() => {
    let filtered = reels;

    if (searchTerm.trim()) {
      filtered = filtered.filter(reel =>
        reel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reel.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reel.notes && reel.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedMood) {
      filtered = filtered.filter(reel => reel.mood === selectedMood);
    }

    setFilteredReels(filtered);
  }, [searchTerm, selectedMood, reels]);

  const handleAddReel = async (newReel: { url: string; description: string; tags: string[]; notes?: string; is_public: boolean; }) => {
    await addReel(newReel);
    setShowForm(false);
  };

  const getMoodStats = () => {
    const stats = moods.map(mood => ({
      mood,
      count: reels.filter(reel => reel.mood === mood).length
    })).filter(stat => stat.count > 0);
    return stats;
  };

  const recentlyViewed = reels
    .filter(reel => reel.last_viewed)
    .sort((a, b) => new Date(b.last_viewed!).getTime() - new Date(a.last_viewed!).getTime())
    .slice(0, 3);

  // For animated metrics
  const animatedTotalReels = useCountUp(reels.length, 1.5);
  const animatedLiked = useCountUp(reels.filter(r => r.is_liked).length, 1.5);
  const animatedTotalViews = useCountUp(reels.reduce((acc, r) => acc + (r.view_count || 0), 0), 1.5);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen animated-gradient-background">
        <Header />
        <main>
          <FuturisticHero />

          <section id="features">
            <Features />
          </section>
          <section id="how-it-works">
            <HowItWorks />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <section id="about">
            <AboutMe />
          </section>

          <CallToAction />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-20 sm:pt-28 pb-8 sm:pb-12">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center mt-6 sm:mt-10 mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-2 text-center px-2">
              ReelVault
            </h1>
            <p className="text-sm sm:text-lg lg:text-2xl text-gray-300 mb-4 sm:mb-6 max-w-2xl text-center font-light px-3">
              The ultimate AI-powered vault for your favorite Instagram Reels and YouTube Shorts.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-xl hover:scale-105 transition font-bold mb-2"
            >
              <Plus className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Add New Reel
            </Button>
          </section>

          {/* Search and Mood Filter Bar */}
          <section className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-xl border border-white/10 transition-all">
              <div className="relative w-full sm:w-2/3">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="text"
                  placeholder="Search reels by description, tags, or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 py-2.5 sm:py-3 text-sm sm:text-base bg-transparent border-cyan-400/20 text-white placeholder-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center w-full sm:w-1/3">
                <Button
                  variant={selectedMood === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMood('')}
                  className={`rounded-full text-xs px-3 sm:px-4 py-2 font-semibold shadow-sm transition-all duration-200
                    ${selectedMood === ''
                      ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white border-0'
                      : 'bg-white/10 border border-cyan-400/20 text-cyan-200 hover:bg-cyan-400/10 hover:text-white backdrop-blur-md'}
                  `}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  All Moods
                </Button>
                {getMoodStats().map(({ mood, count }) => (
                  <Button
                    key={mood}
                    variant={selectedMood === mood ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedMood(mood === selectedMood ? '' : mood)}
                    className={`rounded-full text-xs px-3 sm:px-4 py-2 font-semibold shadow-sm transition-all duration-200
                      ${selectedMood === mood
                        ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white border-0'
                        : 'bg-white/10 border border-cyan-400/20 text-cyan-200 hover:bg-cyan-400/10 hover:text-white backdrop-blur-md'}
                    `}
                  >
                    {mood} ({count})
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          {reels.length > 0 && (
            <section className="max-w-4xl mx-auto mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-cyan-200 text-sm sm:text-base font-medium bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-xl border border-white/10 transition-all">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span><strong className="text-cyan-300">{animatedTotalReels}</strong> Total Reels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
                  <span><strong className="text-pink-300">{animatedLiked}</strong> Liked</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <span><strong className="text-cyan-300">{animatedTotalViews}</strong> Total Views</span>
                </div>
              </div>
            </section>
          )}

          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && !searchTerm && !selectedMood && (
            <section className="max-w-4xl mx-auto mb-8 sm:mb-10">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                <span className="text-cyan-200 font-semibold text-sm sm:text-base">Recently Viewed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentlyViewed.map((reel) => (
                  <ReelCard
                    key={reel.id}
                    reel={reel}
                    onToggleLike={toggleLike}
                    onDelete={deleteReel}
                    onView={incrementViewCount}
                    onUpdateNotes={updateNotes}
                    searchTerm={searchTerm}
                    className="transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl rounded-2xl"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Reel Cards */}
          <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
            {filteredReels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                onToggleLike={toggleLike}
                onDelete={deleteReel}
                onView={incrementViewCount}
                onUpdateNotes={updateNotes}
                searchTerm={searchTerm}
                className="transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl rounded-2xl"
              />
            ))}
          </section>
        </div>
      </main>
      
      {showForm && (
        <ReelForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddReel}
          suggestTags={suggestTags}
          detectMood={detectMood}
        />
      )}
    </div>
  );
};

export default Index;
