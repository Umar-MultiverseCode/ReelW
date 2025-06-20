
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
}

export const useReels = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

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
        is_liked: reel.is_liked
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

  const addReel = async (newReel: Omit<Reel, 'id' | 'date_saved' | 'is_liked'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reels')
        .insert([{
          user_id: user.id,
          url: newReel.url,
          description: newReel.description,
          tags: newReel.tags,
          is_liked: false
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
        is_liked: data.is_liked
      };

      setReels(prev => [formattedReel, ...prev]);
      
      toast({
        title: "Reel saved successfully!",
        description: "Your reel has been added to ReelVault.",
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

  useEffect(() => {
    fetchReels();
  }, [user]);

  return {
    reels,
    loading,
    addReel,
    toggleLike,
    deleteReel,
    refetch: fetchReels
  };
};
