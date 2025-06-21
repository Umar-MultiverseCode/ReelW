import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      alert('Please provide a rating and a comment.');
      return;
    }
    setIsSubmitting(true);
    await onSubmit(rating, comment);
    setIsSubmitting(false);
    onClose();
    setRating(0);
    setComment('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#181F3A] via-[#3B1F5E] to-[#0E223F] bg-opacity-95 border-2 border-cyan-400/60 rounded-3xl shadow-2xl shadow-cyan-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Share Your Feedback</DialogTitle>
          <DialogDescription className="text-cyan-100">
            We'd love to hear what you think about ReelVault.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <label className="text-cyan-200 font-bold mb-2 block">Your Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                    (hoverRating || rating) >= star ? 'text-yellow-400 fill-current drop-shadow-[0_0_12px_#fde68a]' : 'text-gray-700'
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="text-cyan-200 font-bold mb-2 block">Your Comments</label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you loved or what we can improve..."
              className="bg-[#232946] border-2 border-cyan-400/30 text-cyan-100 focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 rounded-lg"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="rounded-xl border-cyan-400/30 text-cyan-200 font-semibold bg-[#232946] hover:bg-cyan-500/10 transition">Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || rating === 0 || !comment.trim()} className="w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition font-bold">
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm; 