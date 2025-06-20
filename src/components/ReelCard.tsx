
import React from 'react';
import { Heart, Copy, Trash2, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Reel } from '@/pages/Index';

interface ReelCardProps {
  reel: Reel;
  onToggleLike: (id: string) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, onToggleLike, onDelete, searchTerm }) => {
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

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-400 text-black px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getVideoEmbedUrl = (url: string) => {
    // Instagram Reel
    const instagramMatch = url.match(/(?:instagram\.com|instagr\.am)\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
    if (instagramMatch) {
      return `https://www.instagram.com/p/${instagramMatch[1]}/embed/`;
    }

    // YouTube Shorts
    const youtubeMatch = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    return null;
  };

  const embedUrl = getVideoEmbedUrl(reel.url);
  const formattedDate = new Date(reel.dateSaved).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <CardContent className="p-0">
        {/* Video Preview */}
        <div className="aspect-video bg-gray-800 relative overflow-hidden">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
              <p className="text-white text-center p-4">Video Preview Not Available</p>
            </div>
          )}
          
          {/* Like button overlay */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleLike(reel.id)}
            className={`absolute top-3 right-3 ${
              reel.isLiked ? 'text-red-500' : 'text-white'
            } hover:text-red-400 bg-black/30 backdrop-blur-sm`}
          >
            <Heart className={`h-5 w-5 ${reel.isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Description */}
          <p className="text-white text-sm leading-relaxed">
            {highlightText(reel.description, searchTerm)}
          </p>

          {/* Tags */}
          {reel.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {reel.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-600/30 text-purple-300 hover:bg-purple-600/40 text-xs"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {highlightText(tag, searchTerm)}
                </Badge>
              ))}
            </div>
          )}

          {/* Date */}
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Saved on {formattedDate}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(reel.id)}
              className="border-red-400/30 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReelCard;
