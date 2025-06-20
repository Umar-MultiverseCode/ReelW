import React, { useState, useEffect } from 'react';
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

  const handleAddReel = async (newReel: { url: string; description: string; tags: string[]; notes?: string }) => {
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ReelVault
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Save, organize, and discover your favorite Instagram Reels and YouTube Shorts with AI-powered tagging and mood detection
            </p>
            
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                ✨ Get Started
              </Button>
            </Link>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg sm:text-xl mb-4">Please sign in to start saving your reels</p>
            <p className="text-gray-500">Create an account to access AI-powered features</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              ReelVault
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate AI-powered vault for your favorite Instagram Reels and YouTube Shorts.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold"
            >
              <Plus className="mr-2 h-6 w-6" />
              Add New Reel
            </Button>
          </section>

          {/* Search and Mood Filter Bar */}
          <section className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/10">
              <div className="relative w-full sm:w-2/3">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search reels by description, tags, or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-base bg-transparent border-cyan-400/20 text-white placeholder-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/50"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center w-full sm:w-1/3">
                <Button
                  variant={selectedMood === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMood('')}
                  className={`rounded-full text-xs px-4 py-2 font-semibold shadow-sm transition-all duration-200
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
                    className={`rounded-full text-xs px-4 py-2 font-semibold shadow-sm transition-all duration-200
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
            <section className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-wrap items-center justify-center gap-6 text-cyan-200 text-base font-medium bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow border border-white/10">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>{reels.length} Total Reels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-400" />
                  <span>{reels.filter(r => r.is_liked).length} Liked</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-cyan-400" />
                  <span>{reels.reduce((acc, r) => acc + (r.view_count || 0), 0)} Total Views</span>
                </div>
              </div>
            </section>
          )}

          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && !searchTerm && !selectedMood && (
            <section className="max-w-4xl mx-auto mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">Recently Viewed</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyViewed.map((reel) => (
                  <div key={reel.id} className="bg-white/10 backdrop-blur-md border border-cyan-400/10 rounded-xl p-4 shadow">
                    <p className="text-white text-sm font-semibold mb-2 line-clamp-2">{reel.description}</p>
                    <div className="flex items-center justify-between text-cyan-200 text-xs">
                      <span>Views: {reel.view_count || 0}</span>
                      <span>{new Date(reel.last_viewed!).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Add Reel Form */}
          {showForm && (
            <ReelForm
              onSubmit={handleAddReel}
              onCancel={() => setShowForm(false)}
              suggestTags={suggestTags}
              detectMood={detectMood}
            />
          )}

          {/* Loading State */}
          {reelsLoading && (
            <div className="text-center py-12">
              <p className="text-cyan-200 text-xl">Loading your reels...</p>
            </div>
          )}

          {/* Empty States */}
          {!reelsLoading && filteredReels.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-cyan-200 text-xl">No reels found matching "{searchTerm}"</p>
            </div>
          )}

          {!reelsLoading && filteredReels.length === 0 && selectedMood && (
            <div className="text-center py-12">
              <p className="text-cyan-200 text-xl">No reels found with "{selectedMood}" mood</p>
            </div>
          )}

          {!reelsLoading && filteredReels.length === 0 && !searchTerm && !selectedMood && !showForm && (
            <div className="text-center py-12">
              <p className="text-cyan-200 text-xl mb-4">Your ReelVault is empty</p>
              <p className="text-cyan-400">Start by adding your first reel with AI-powered features!</p>
            </div>
          )}

          {/* Reels Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={{
                  ...reel,
                  dateSaved: reel.date_saved,
                  isLiked: reel.is_liked
                }}
                onToggleLike={toggleLike}
                onDelete={deleteReel}
                onView={incrementViewCount}
                onUpdateNotes={updateNotes}
                searchTerm={searchTerm}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
