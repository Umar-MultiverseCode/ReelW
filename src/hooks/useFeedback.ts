import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useFeedback = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getFeedback = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);
      
    if (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Failed to load testimonials.');
    } else {
      setFeedback(data);
    }
    setLoading(false);
  }, []);

  const addFeedback = async (rating: number, comment: string) => {
    if (!user) {
      toast.error('You must be logged in to submit feedback.');
      return;
    }

    const { error } = await supabase.from('feedback').insert({
      user_id: user.id,
      user_name: user.user_metadata?.name || 'Anonymous',
      user_avatar_url: user.user_metadata?.avatar_url,
      rating,
      comment,
    });

    if (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } else {
      toast.success('Thank you for your feedback!');
      getFeedback(); // Refresh feedback list
    }
  };

  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  return { feedback, loading, getFeedback, addFeedback };
}; 