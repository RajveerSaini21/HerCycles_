import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { X, Send } from 'lucide-react';
const CATEGORIES = ["general_health", "period_questions", "birth_control", "pregnancy", "menopause", "mental_health", "nutrition", "exercise", "relationships", "work_life"];
const ANONYMOUS_NAMES = ["StarlightSeeker", "Moonflower", "OceanWhisper", "Sunbeam", "WillowGrace", "RiverSong", "EchoSoul", "ForestHeart", "CosmicDreamer"];

export default function PostForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    anonymous_name: ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="border-b border-violet-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">Create a New Post</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}><X className="w-5 h-5" /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-3 bg-violet-50 rounded-lg text-sm text-violet-700">
            You are posting anonymously as: <span className="font-semibold">{formData.anonymous_name}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="font-medium">Title *</Label>
            <Input id="title" value={formData.title} onChange={e => handleChange('title', e.target.value)} required placeholder="A clear and concise title" className="border-violet-200 focus:border-violet-400" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="font-medium">Category *</Label>
            <Select value={formData.category} onValueChange={v => handleChange('category', v)} required>
              <SelectTrigger className="border-violet-200 focus:border-violet-400"><SelectValue placeholder="Select a category..." /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">{cat.replace(/_/g, ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="font-medium">Content *</Label>
            <Textarea id="content" value={formData.content} onChange={e => handleChange('content', e.target.value)} required placeholder="Share your story or ask a question..." className="border-violet-200 focus:border-violet-400 h-32" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-gray-200">Cancel</Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-600 hover:from-violet-600 hover:to-cyan-700">
              <Send className="w-4 h-4 mr-2" />
              Post Anonymously
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}