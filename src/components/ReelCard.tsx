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
    <Card className={`bg-gradient-to-br from-slate-900/80 to-purple-950/80 border border-white/10 shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl group ${className || ''}`.trim()}>
      <CardContent className="p-0">
        {/* Video Preview */}
        <div className="aspect-video bg-gradient-to-br from-purple-900/40 to-pink-900/40 relative overflow-hidden">
          {/* Top badges row */}
          <div className="absolute top-4 left-4 z-20 flex gap-2 items-center">
            <Badge className={`px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-lg border-2 rounded-lg ${reel.is_public ? 'bg-green-600 text-white border-green-700' : 'bg-gray-800 text-gray-100 border-gray-600'}`}>{reel.is_public ? 'Private' : 'Private'}</Badge>
            {reel.mood && (
              <Badge className="px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-lg border-2 rounded-lg bg-blue-700 text-white border-blue-300 flex items-center gap-1">
                <Brain className="h-3 w-3 mr-1" />
                {getMoodEmoji(reel.mood)} {reel.mood}
              </Badge>
            )}
          </div>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full rounded-t-2xl"
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

          {/* Overlay Controls */}
          <div className="absolute top-3 right-3 flex gap-2 z-10 items-center">
            {/* Share Button (if public) */}
            {reel.is_public && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {navigator.clipboard.writeText(window.location.origin + '/public/' + reel.id)}}
                className="text-cyan-300 hover:text-cyan-400 bg-black/30 hover:bg-cyan-900/20 border-2 border-transparent shadow-md"
                aria-label="Copy Public Link"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleLike(reel.id)}
              className={`transition-all duration-200 shadow-md border-2 border-transparent ${reel.is_liked ? 'text-red-400 bg-red-500/20 border-red-400' : 'text-white bg-black/30'} hover:text-red-400 hover:bg-red-500/20 hover:border-red-400 focus:ring-2 focus:ring-red-400`}
              aria-label="Like"
            >
              <Heart className={`h-4 w-4 ${reel.is_liked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* View Count */}
          {reel.view_count && reel.view_count > 0 && (
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
              <Eye className="h-3 w-3 text-cyan-300" />
              <span className="text-xs text-cyan-200 font-semibold">{reel.view_count}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 bg-white/10 backdrop-blur-lg rounded-b-2xl">
          {/* Description */}
          <p className="text-white text-base leading-relaxed font-semibold min-h-[40px]">
            {highlightText(reel.description, searchTerm)}
          </p>

          {/* Tags */}
          {reel.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {reel.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-600 text-white font-bold text-xs shadow-md border-0"
                >
                  <Tag className="h-3 w-3 mr-1 text-white" />
                  <span className="drop-shadow-sm">{highlightText(tag, searchTerm)}</span>
                </Badge>
              ))}
            </div>
          )}

          {/* Notes Preview */}
          {reel.notes && !showNotes && (
            <div className="bg-white/10 border border-white/10 rounded-lg p-3">
              <p className="text-cyan-100 text-xs line-clamp-2">{reel.notes}</p>
            </div>
          )}

          {/* Date and Last Viewed */}
          <div className="flex items-center justify-between text-cyan-200 text-xs">
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

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              size="sm"
              onClick={copyToClipboard}
              className="flex-1 min-w-0 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md text-xs rounded-full py-1.5 px-4 transition-all duration-200 flex items-center gap-1"
              aria-label="Copy Link"
            >
              <Copy className="h-4 w-4 text-white" />
              <span>Copy</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setShowNotes(!showNotes)}
              className="flex-1 min-w-0 bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md text-xs rounded-full py-1.5 px-4 transition-all duration-200 flex items-center gap-1"
              aria-label="Notes"
            >
              <StickyNote className="h-4 w-4 text-white" />
              <span>Notes</span>
            </Button>
            <Button
              size="sm"
              onClick={() => onDelete(reel.id)}
              className="flex-1 min-w-0 bg-red-600 hover:bg-red-700 text-white font-medium shadow-md text-xs rounded-full py-1.5 px-4 transition-all duration-200 flex items-center gap-1"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* Notes Editor */}
          {showNotes && (
            <div className="space-y-2 pt-2 border-t border-white/10">
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
                  className="flex-1 border-gray-400/30 text-gray-300 hover:bg-gray-500/10 text-xs rounded-lg font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReelCard;
