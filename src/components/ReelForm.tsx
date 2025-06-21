import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface ReelFormProps {
  onClose: () => void;
  onSubmit: (reel: { url: string; description: string; tags: string[]; notes?: string; is_public: boolean }) => Promise<void>;
}

const ReelForm: React.FC<ReelFormProps> = ({ onClose, onSubmit }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !description.trim()) {
      alert('URL and description are required.');
      return;
    }
    setIsSubmitting(true);
    await onSubmit({ url, description, tags, notes, is_public: isPublic });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div>
        <Label htmlFor="url">Reel URL</Label>
        <Input id="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://www.instagram.com/reel/..." required className="bg-slate-800 border-slate-700"/>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="A creative description..." required className="bg-slate-800 border-slate-700"/>
      </div>
      <div>
        <Label htmlFor="tags">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2 min-h-[28px]">
            {tags.map(tag => (
                <div key={tag} className="flex items-center gap-1 bg-cyan-800/50 text-cyan-300 px-2 py-1 rounded-md text-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-cyan-200 hover:text-white font-bold text-lg leading-none">&times;</button>
                </div>
            ))}
        </div>
        <Input id="tags" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Type a tag and press Enter" className="bg-slate-800 border-slate-700"/>
      </div>
       <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add personal notes here..." className="bg-slate-800 border-slate-700"/>
      </div>
      <div className="flex items-center space-x-3 pt-2">
        <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
        <Label htmlFor="is-public">Make this reel public</Label>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-cyan-600 to-pink-600">
          {isSubmitting ? 'Saving...' : 'Save Reel'}
        </Button>
      </div>
    </form>
  );
};

export default ReelForm;
