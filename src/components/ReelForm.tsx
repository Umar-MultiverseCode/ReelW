import React, { useState, useEffect, useRef } from 'react';
import { X, Link as LinkIcon, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from './ui/switch';

interface ReelFormProps {
  onClose: () => void;
  onSubmit: (reel: { url: string; description: string; tags: string[]; notes?: string; is_public: boolean }) => Promise<void>;
  suggestTags: (description: string) => string[];
  detectMood: (description: string, tags: string[]) => string;
}

const ReelForm: React.FC<ReelFormProps> = ({ onClose, onSubmit, suggestTags, detectMood }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [detectedMood, setDetectedMood] = useState('');

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    if (newDescription.trim().length > 10) {
      const suggestions = suggestTags(newDescription);
      setSuggestedTags(suggestions);
      const mood = detectMood(newDescription, tags);
      setDetectedMood(mood);
    } else {
      setSuggestedTags([]);
      setDetectedMood('');
    }
  };

  const addSuggestedTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
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
    if (!url.trim() || !description.trim()) {
      alert("URL and description are required.");
      return;
    }
    setIsSubmitting(true);
    await onSubmit({ url, description, tags, notes, is_public: isPublic });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 z-50">
      <Card ref={formRef} className="w-full max-w-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
            ✨ Add New Reel
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-gray-300 flex items-center gap-2"><LinkIcon className="h-4 w-4" />Reel URL *</Label>
              <Input id="url" type="url" placeholder="https://instagram.com/reel/... or https://youtube.com/shorts/..." value={url} onChange={(e) => setUrl(e.target.value)} className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Brain className="h-4 w-4" />Description * 
                {detectedMood && <Badge className={`ml-2 ${getMoodColor(detectedMood)} border text-xs`}>{detectedMood}</Badge>}
              </Label>
              <Textarea id="description" placeholder="Describe the reel... (AI will suggest tags and detect mood)" value={description} onChange={handleDescriptionChange} className="bg-white/5 border-white/10 min-h-20" />
            </div>

            {suggestedTags.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-400" />AI Suggested Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag, index) => (
                    <Button key={index} type="button" variant="outline" size="sm" onClick={() => addSuggestedTag(tag)} className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 text-xs rounded-full">
                      + {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium text-gray-300">Your Tags (comma separated)</Label>
              <Input id="tags" placeholder="e.g. cooking, recipe, tutorial" value={tags.join(', ')} onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()))} className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Personal Notes (optional)</Label>
                <Textarea id="notes" placeholder="Add your thoughts or reminders..." value={notes} onChange={(e) => setNotes(e.target.value)} className="bg-white/5 border-white/10 min-h-16" />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="is-public">Make this reel public</Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 text-white font-medium rounded-xl py-2.5">
                {isSubmitting ? 'Saving...' : '✨ Save Reel'}
              </Button>
              <Button type="button" onClick={onClose} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5">
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
