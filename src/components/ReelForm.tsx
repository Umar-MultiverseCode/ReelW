
import React, { useState } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ReelFormProps {
  onSubmit: (reel: { url: string; description: string; tags: string[] }) => void;
  onCancel: () => void;
}

const ReelForm: React.FC<ReelFormProps> = ({ onSubmit, onCancel }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateUrl = (url: string) => {
    const instagramPattern = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|reel)\/([A-Za-z0-9_-]+)/;
    const youtubePattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/shorts\/|youtu\.be\/)([A-Za-z0-9_-]+)/;
    return instagramPattern.test(url) || youtubePattern.test(url);
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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSubmit({
      url: url.trim(),
      description: description.trim(),
      tags: tagArray
    });

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Add New Reel
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-gray-300">
                Reel URL *
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="url"
                  type="url"
                  placeholder="https://instagram.com/reel/... or https://youtube.com/shorts/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="What's interesting about this reel?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium text-gray-300">
                Tags (optional)
              </Label>
              <Input
                id="tags"
                placeholder="cooking, recipe, tutorial (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isLoading ? 'Saving...' : 'Save Reel'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-white/20 text-white hover:bg-white/10"
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
