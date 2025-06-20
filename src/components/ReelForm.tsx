import React, { useState } from 'react';
import { X, Link as LinkIcon, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ReelFormProps {
  onSubmit: (reel: { url: string; description: string; tags: string[]; notes?: string }) => void;
  onCancel: () => void;
  suggestTags: (description: string) => string[];
  detectMood: (description: string, tags: string[]) => string;
}

const ReelForm: React.FC<ReelFormProps> = ({ onSubmit, onCancel, suggestTags, detectMood }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [detectedMood, setDetectedMood] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateUrl = (url: string) => {
    const instagramPattern = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|reel)\/([A-Za-z0-9_-]+)/;
    const youtubePattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]+)/;
    return instagramPattern.test(url) || youtubePattern.test(url);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    
    if (newDescription.trim().length > 10) {
      const suggestions = suggestTags(newDescription);
      setSuggestedTags(suggestions);
      
      const currentTags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
      const mood = detectMood(newDescription, currentTags);
      setDetectedMood(mood);
    } else {
      setSuggestedTags([]);
      setDetectedMood('');
    }
  };

  const addSuggestedTag = (tag: string) => {
    const currentTags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    if (!currentTags.includes(tag)) {
      const newTags = [...currentTags, tag].join(', ');
      setTags(newTags);
      
      // Update mood with new tags
      const mood = detectMood(description, [...currentTags, tag]);
      setDetectedMood(mood);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a valid Instagram Reel or YouTube Shorts URL.",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Instagram Reel or YouTube Shorts URL.",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please add a description for this reel.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSubmit({
      url: url.trim(),
      description: description.trim(),
      tags: tagArray,
      notes: notes.trim()
    });

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
            ✨ Add New Reel
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Reel URL *
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://instagram.com/reel/... or https://youtube.com/shorts/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 rounded-xl"
              />
            </div>

            {/* Description Input with AI Features */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Description * 
                {detectedMood && (
                  <Badge className={`ml-2 ${getMoodColor(detectedMood)} border text-xs`}>
                    {detectedMood}
                  </Badge>
                )}
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what's interesting about this reel... (AI will suggest tags and detect mood)"
                value={description}
                onChange={handleDescriptionChange}
                className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 rounded-xl min-h-20 resize-none"
              />
            </div>

            {/* AI Suggested Tags */}
            {suggestedTags.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  AI Suggested Tags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSuggestedTag(tag)}
                      className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 text-xs rounded-full px-3 py-1"
                    >
                      + {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Manual Tags Input */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium text-gray-300">
                Tags (optional)
              </Label>
              <Input
                id="tags"
                placeholder="cooking, recipe, tutorial (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 rounded-xl"
              />
            </div>

            {/* Notes Input */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-300">
                Personal Notes (optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Add your thoughts, reminders, or notes about this reel..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 rounded-xl min-h-16 resize-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium rounded-xl py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? 'Saving...' : '✨ Save Reel'}
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                className="bg-black text-white rounded-xl py-2.5 hover:bg-neutral-900 transition-all duration-200"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReelForm;
