
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
}

const ReelCard: React.FC<ReelCardProps> = ({ 
  reel, 
  onToggleLike, 
  onDelete, 
  onView, 
  onUpdateNotes, 
  searchTerm 
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
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
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
    <Card className="bg-black/30 backdrop-blur-xl border border-white/10 overflow-hidden hover:bg-black/40 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 group">
      <CardContent className="p-0">
        {/* Video Preview */}
        <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 relative overflow-hidden">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleView}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-600/20">
              <p className="text-white text-center p-4 text-sm">Video Preview Not Available</p>
            </div>
          )}
          
          {/* Overlay Controls */}
          <div className="absolute top-3 right-3 flex gap-2">
            {reel.mood && (
              <Badge className={`${getMoodColor(reel.mood)} border text-xs font-medium`}>
                <Brain className="h-3 w-3 mr-1" />
                {getMoodEmoji(reel.mood)} {reel.mood}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleLike(reel.id)}
              className={`${
                reel.is_liked ? 'text-red-400 bg-red-500/20' : 'text-white bg-black/30'
              } hover:text-red-400 hover:bg-red-500/20 backdrop-blur-sm rounded-full transition-all duration-200`}
            >
              <Heart className={`h-4 w-4 ${reel.is_liked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* View Count */}
          {reel.view_count && reel.view_count > 0 && (
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Eye className="h-3 w-3 text-gray-300" />
              <span className="text-xs text-gray-300">{reel.view_count}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-3">
          {/* Description */}
          <p className="text-white text-sm leading-relaxed">
            {highlightText(reel.description, searchTerm)}
          </p>

          {/* Tags */}
          {reel.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {reel.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 text-cyan-300 hover:from-cyan-600/30 hover:to-purple-600/30 text-xs border border-cyan-500/20"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {highlightText(tag, searchTerm)}
                </Badge>
              ))}
            </div>
          )}

          {/* Notes Preview */}
          {reel.notes && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-2">
              <p className="text-gray-300 text-xs line-clamp-2">{reel.notes}</p>
            </div>
          )}

          {/* Date and Last Viewed */}
          <div className="flex items-center justify-between text-gray-400 text-xs">
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
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex-1 min-w-0 border-white/20 text-white hover:bg-white/10 text-xs rounded-lg"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotes(!showNotes)}
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/10 text-xs rounded-lg"
            >
              <StickyNote className="h-3 w-3 mr-1" />
              Notes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(reel.id)}
              className="border-red-400/30 text-red-400 hover:bg-red-500/10 text-xs rounded-lg"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>

          {/* Notes Editor */}
          {showNotes && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <Textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add your thoughts, reminders, or notes..."
                className="bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs rounded-lg min-h-16 resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleNotesUpdate}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-xs rounded-lg"
                >
                  Save Notes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotes(false)}
                  className="border-white/20 text-white hover:bg-white/10 text-xs rounded-lg"
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
