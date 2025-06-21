import React, { useState } from 'react';
import { Heart, Copy, Trash2, Calendar, Tag, Eye, StickyNote, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Reel } from '@/hooks/useReels';

interface ReelCardProps {
  reel: Reel;
  onToggleLike: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  searchTerm: string;
  className?: string;
}

const ReelCard: React.FC<ReelCardProps> = ({ 
  reel, 
  onToggleLike, 
  onDelete, 
  onView, 
  onUpdateNotes, 
  searchTerm, 
  className 
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notesText, setNotesText] = useState(reel.notes || '');
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reel.url);
      toast({
        title: "Link copied!",
        description: "The reel link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleView = () => {
    onView(reel.id);
  };

  const handleNotesUpdate = () => {
    onUpdateNotes(reel.id, notesText);
    setShowNotes(false);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-400/30 text-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getVideoEmbedUrl = (url: string) => {
    const instagramMatch = url.match(/(?:instagram\.com|instagr\.am)\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
    if (instagramMatch) {
      return `https://www.instagram.com/p/${instagramMatch[1]}/embed/`;
    }

    const youtubeMatch = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?controls=0&showinfo=0&modestbranding=1`;
    }

    return null;
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      'Funny': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Motivational': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Educational': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Calm': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Emotional': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'Creative': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Energetic': 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const getMoodEmoji = (mood: string) => {
    const emojis = {
      'Funny': '😂',
      'Motivational': '💪',
      'Educational': '🧠',
      'Calm': '🧘',
      'Emotional': '💝',
      'Creative': '🎨',
      'Energetic': '⚡'
    };
    return emojis[mood as keyof typeof emojis] || '✨';
  };

  const embedUrl = getVideoEmbedUrl(reel.url);
  const formattedDate = new Date(reel.date_saved).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className={`bg-gradient-to-br from-purple-800 via-blue-900 to-cyan-900 backdrop-blur-lg rounded-3xl shadow-xl border-none overflow-hidden transition-transform duration-300 hover:scale-105 group ${className || ''}`.trim()}>
      <CardContent className="p-0">
        {/* Video Thumbnail (top, large, uncluttered) */}
        <div className="aspect-video bg-gradient-to-br from-purple-900/60 via-blue-900/50 to-cyan-900/40 relative overflow-hidden rounded-t-3xl flex items-center justify-center">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full rounded-t-3xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleView}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/30 to-pink-600/30">
              <p className="text-white text-center p-4 text-sm">Video Preview Not Available</p>
            </div>
          )}
        </div>

        {/* Title (bold, below thumbnail) */}
        <div className="px-4 pt-4 pb-1">
          <h3 className="text-white text-lg sm:text-xl font-extrabold mb-2 leading-tight">
            {highlightText(reel.description, searchTerm)}
          </h3>
        </div>

        {/* Tag Pills Row (below title) */}
        <div className="flex flex-row gap-2 sm:gap-3 px-4 pb-2">
          {/* Privacy Pill */}
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-700/70 to-purple-700/70 text-cyan-100 shadow-md">
            {reel.is_public ? '🌐 Public' : '🔒 Private'}
          </span>
          {/* Mood Pill */}
          {reel.mood && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-700/70 to-pink-700/70 text-white shadow-md">
              <Brain className="h-3 w-3" /> {getMoodEmoji(reel.mood)} {reel.mood}
            </span>
          )}
          {/* Category/Tags Pills */}
          {reel.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500/70 to-purple-500/70 text-white shadow-md">
              <Tag className="h-3 w-3" /> {tag}
            </span>
          ))}
        </div>

        {/* Notes Preview (optional, below tags) */}
        {reel.notes && !showNotes && (
          <div className="bg-white/10 border border-white/10 rounded-lg p-2 sm:p-3 mx-4 mb-2">
            <p className="text-cyan-100 text-xs line-clamp-2">{reel.notes}</p>
          </div>
        )}

        {/* Metadata (optional, below notes) */}
        <div className="flex items-center justify-between text-cyan-200/80 text-xs px-4 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Saved {formattedDate}</span>
          </div>
          {reel.last_viewed && (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>Last viewed {new Date(reel.last_viewed).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Actions Row (bottom: Copy, Notes, Like, Delete) */}
        <div className="flex flex-row gap-2 sm:gap-3 px-4 pt-2 pb-4">
          <Button onClick={copyToClipboard} variant="outline" className="flex-1 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-lg py-2 px-3 hover:scale-105 hover:shadow-cyan-400/30 transition-all">
            <Copy className="h-4 w-4" /> Copy
          </Button>
          <Button onClick={() => setShowNotes(!showNotes)} variant="outline" className="flex-1 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg py-2 px-3 hover:scale-105 hover:shadow-pink-400/30 transition-all">
            <StickyNote className="h-4 w-4" /> Notes
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleLike(reel.id)}
            className={`flex items-center justify-center transition-all duration-200 shadow-md border-2 border-transparent h-10 w-10 ${reel.is_liked ? 'text-red-400 bg-red-500/20 border-red-400' : 'text-white bg-black/30'} hover:text-red-400 hover:bg-red-500/20 hover:border-red-400 focus:ring-2 focus:ring-red-400`}
            aria-label="Like"
          >
            <Heart className={`h-5 w-5 ${reel.is_liked ? 'fill-current' : ''}`} />
          </Button>
          <Button onClick={() => onDelete(reel.id)} variant="destructive" className="flex-1 flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full shadow-lg py-2 px-3 hover:scale-105 hover:shadow-red-400/30 transition-all">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Notes Editor (if open) */}
        {showNotes && (
          <div className="space-y-2 pt-2 border-t border-white/10 mx-4 mb-4">
            <Textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Add your thoughts, reminders, or notes..."
              className="bg-white/10 border border-cyan-400/20 text-white placeholder-gray-400 text-xs rounded-lg min-h-16 resize-none focus:ring-2 focus:ring-cyan-400/40"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleNotesUpdate}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-xs rounded-lg font-semibold shadow-md"
              >
                Save Notes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotes(false)}
                className="flex-1 bg-[#1a2236] !text-cyan-200 font-bold text-xs rounded-2xl border border-cyan-400/40 py-2 px-3 shadow-md hover:border-cyan-300 hover:bg-[#232b45] transition-all focus-visible:outline-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReelCard;
