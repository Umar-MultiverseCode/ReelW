import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Reel {
  id: string;
  url: string;
  description: string;
  tags: string[];
  date_saved: string;
  is_liked: boolean;
  mood?: string;
  view_count?: number;
  last_viewed?: string;
  notes?: string;
  is_public: boolean;
}

export const useReels = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const suggestTags = (description: string): string[] => {
    const keywords = description.toLowerCase();
    const suggestions: string[] = [];
    
    // Smart tag suggestions based on common patterns
    const tagMappings = {
      'cook': ['cooking', 'recipe'],
      'food': ['food', 'recipe'],
      'dance': ['dance', 'music'],
      'workout': ['fitness', 'health'],
      'travel': ['travel', 'explore'],
      'makeup': ['beauty', 'tutorial'],
      'funny': ['comedy', 'humor'],
      'motivat': ['motivation', 'inspire'],
      'learn': ['education', 'tips'],
      'art': ['creative', 'design'],
      'music': ['music', 'audio'],
      'tech': ['technology', 'gadgets'],
      'fashion': ['style', 'outfit'],
      'pet': ['animals', 'cute'],
      'nature': ['outdoors', 'scenic']
    };

    Object.entries(tagMappings).forEach(([key, tags]) => {
      if (keywords.includes(key)) {
        suggestions.push(...tags);
      }
    });

    return [...new Set(suggestions)].slice(0, 5);
  };

  const detectMood = (description: string, tags: string[]): string => {
    const text = `${description} ${tags.join(' ')}`.toLowerCase();
    
    const moodKeywords = {
      'Funny': ['funny', 'comedy', 'humor', 'laugh', 'joke', 'hilarious', 'meme'],
      'Motivational': ['motivat', 'inspire', 'success', 'achieve', 'goal', 'dream', 'power'],
      'Educational': ['learn', 'tutorial', 'how to', 'tips', 'guide', 'explain', 'teach'],
      'Calm': ['relax', 'peaceful', 'meditation', 'calm', 'zen', 'nature', 'quiet'],
      'Emotional': ['emotional', 'touching', 'heart', 'sad', 'cry', 'love', 'feel'],
      'Creative': ['art', 'creative', 'design', 'craft', 'draw', 'paint', 'music'],
      'Energetic': ['energy', 'dance', 'workout', 'fitness', 'active', 'sport', 'pump']
    };

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return mood;
      }
    }

    return 'Creative'; // Default mood
  };

  const fetchReels = async () => {
    if (!user) {
      setReels([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .order('date_saved', { ascending: false });

      if (error) throw error;

      const formattedReels = data.map(reel => ({
        id: reel.id,
        url: reel.url,
        description: reel.description,
        tags: reel.tags || [],
        date_saved: reel.date_saved,
        is_liked: reel.is_liked,
        mood: reel.mood || detectMood(reel.description, reel.tags || []),
        view_count: reel.view_count || 0,
        last_viewed: reel.last_viewed,
        notes: reel.notes || '',
        is_public: reel.is_public ?? false
      }));

      setReels(formattedReels);
    } catch (error) {
      console.error('Error fetching reels:', error);
      toast({
        title: "Error loading reels",
        description: "Could not load your saved reels.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addReel = async (newReel: Omit<Reel, 'id' | 'date_saved' | 'is_liked' | 'mood' | 'view_count' | 'last_viewed'> & { is_public: boolean }) => {
    if (!user) return;

    const suggestedTags = newReel.tags.length === 0 ? suggestTags(newReel.description) : newReel.tags;
    const mood = detectMood(newReel.description, suggestedTags);

    try {
      const { data, error } = await supabase
        .from('reels')
        .insert([{
          user_id: user.id,
          url: newReel.url,
          description: newReel.description,
          tags: suggestedTags,
          is_liked: false,
          mood: mood,
          view_count: 0,
          notes: newReel.notes || '',
          is_public: newReel.is_public ?? false
        }])
        .select()
        .single();

      if (error) throw error;

      const formattedReel = {
        id: data.id,
        url: data.url,
        description: data.description,
        tags: data.tags || [],
        date_saved: data.date_saved,
        is_liked: data.is_liked,
        mood: data.mood,
        view_count: data.view_count || 0,
        last_viewed: data.last_viewed,
        notes: data.notes || '',
        is_public: data.is_public ?? false
      };

      setReels(prev => [formattedReel, ...prev]);
      
      toast({
        title: "Reel saved successfully!",
        description: `Mood detected: ${mood}. Tags suggested: ${suggestedTags.join(', ')}`,
      });
    } catch (error) {
      console.error('Error adding reel:', error);
      toast({
        title: "Error saving reel",
        description: "Could not save your reel. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleLike = async (id: string) => {
    if (!user) return;

    const reel = reels.find(r => r.id === id);
    if (!reel) return;

    try {
      const { error } = await supabase
        .from('reels')
        .update({ is_liked: !reel.is_liked })
        .eq('id', id);

      if (error) throw error;

      setReels(prev => prev.map(r => 
        r.id === id ? { ...r, is_liked: !r.is_liked } : r
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error updating reel",
        description: "Could not update the reel.",
        variant: "destructive"
      });
    }
  };

  const deleteReel = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reels')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReels(prev => prev.filter(r => r.id !== id));
      
      toast({
        title: "Reel deleted",
        description: "The reel has been removed from your vault.",
      });
    } catch (error) {
      console.error('Error deleting reel:', error);
      toast({
        title: "Error deleting reel",
        description: "Could not delete the reel.",
        variant: "destructive"
      });
    }
  };

  const incrementViewCount = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reels')
        .update({ 
          view_count: supabase.raw('view_count + 1'),
          last_viewed: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setReels(prev => prev.map(r => 
        r.id === id ? { 
          ...r, 
          view_count: (r.view_count || 0) + 1,
          last_viewed: new Date().toISOString()
        } : r
      ));
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reels')
        .update({ notes })
        .eq('id', id);

      if (error) throw error;

      setReels(prev => prev.map(r => 
        r.id === id ? { ...r, notes } : r
      ));
      
      toast({
        title: "Notes updated",
        description: "Your notes have been saved.",
      });
    } catch (error) {
      console.error('Error updating notes:', error);
      toast({
        title: "Error updating notes",
        description: "Could not save your notes.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchReels();
  }, [user]);

  return {
    reels,
    loading,
    addReel,
    toggleLike,
    deleteReel,
    incrementViewCount,
    updateNotes,
    suggestTags,
    detectMood,
    refetch: fetchReels
  };
};
