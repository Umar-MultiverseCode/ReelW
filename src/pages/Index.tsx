
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, TrendingUp, Clock } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ReelVault
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered reel organization with smart tagging and mood detection
          </p>
          
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Reel
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search reels by description, tags, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 sm:py-4 text-base bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50"
            />
          </div>

          {/* Mood Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedMood === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMood('')}
              className={`rounded-full text-xs ${
                selectedMood === '' 
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
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
                className={`rounded-full text-xs ${
                  selectedMood === mood
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {mood} ({count})
              </Button>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && !searchTerm && !selectedMood && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Recently Viewed</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyViewed.map((reel) => (
                <div key={reel.id} className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                  <p className="text-white text-sm font-medium mb-2 line-clamp-2">{reel.description}</p>
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>Views: {reel.view_count || 0}</span>
                    <span>{new Date(reel.last_viewed!).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <p className="text-gray-400 text-xl">Loading your reels...</p>
          </div>
        )}

        {/* Empty States */}
        {!reelsLoading && filteredReels.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No reels found matching "{searchTerm}"</p>
          </div>
        )}

        {!reelsLoading && filteredReels.length === 0 && selectedMood && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No reels found with "{selectedMood}" mood</p>
          </div>
        )}

        {!reelsLoading && filteredReels.length === 0 && !searchTerm && !selectedMood && !showForm && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl mb-4">Your ReelVault is empty</p>
            <p className="text-gray-500">Start by adding your first reel with AI-powered features!</p>
          </div>
        )}

        {/* Stats Bar */}
        {reels.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>{reels.length} Total Reels</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{reels.filter(r => r.is_liked).length} Liked</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{reels.reduce((acc, r) => acc + (r.view_count || 0), 0)} Total Views</span>
              </div>
            </div>
          </div>
        )}

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
