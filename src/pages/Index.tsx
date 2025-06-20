
import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReelForm from '@/components/ReelForm';
import ReelCard from '@/components/ReelCard';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useReels } from '@/hooks/useReels';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filteredReels, setFilteredReels] = useState<any[]>([]);
  const { user, loading: authLoading } = useAuth();
  const { reels, loading: reelsLoading, addReel, toggleLike, deleteReel } = useReels();

  // Filter reels based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReels(reels);
    } else {
      const filtered = reels.filter(reel =>
        reel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reel.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredReels(filtered);
    }
  }, [searchTerm, reels]);

  const handleAddReel = async (newReel: { url: string; description: string; tags: string[] }) => {
    await addReel(newReel);
    setShowForm(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ReelVault
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Save, organize, and discover your favorite Instagram Reels and YouTube Shorts in one beautiful place
            </p>
            
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl mb-4">Please sign in to start saving your reels</p>
            <p className="text-gray-500">Create an account to access all features</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ReelVault
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Save, organize, and discover your favorite Instagram Reels and YouTube Shorts in one beautiful place
          </p>
          
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Reel
          </Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search reels by description or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Add Reel Form */}
        {showForm && (
          <ReelForm
            onSubmit={handleAddReel}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Loading State */}
        {reelsLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">Loading your reels...</p>
          </div>
        )}

        {/* Reels Grid */}
        {!reelsLoading && filteredReels.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No reels found matching "{searchTerm}"</p>
          </div>
        )}

        {!reelsLoading && filteredReels.length === 0 && !searchTerm && !showForm && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl mb-4">Your ReelVault is empty</p>
            <p className="text-gray-500">Start by adding your first reel!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              searchTerm={searchTerm}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
