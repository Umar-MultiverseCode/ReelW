import React from 'react';
import { Sparkles, BarChart, Film, Search, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Tagging',
    description: 'Our AI automatically analyzes your reels and suggests relevant tags, saving you time and effort.',
    color: 'text-cyan-400',
  },
  {
    icon: Wind,
    title: 'Automatic Mood Detection',
    description: 'Instantly categorize your reels by mood. Find the perfect vibe, whether it\'s funny, motivational, or calm.',
    color: 'text-pink-400',
  },
  {
    icon: Film,
    title: 'Centralized Library',
    description: 'Keep all your favorite Instagram Reels and YouTube Shorts in one beautifully organized place.',
    color: 'text-purple-400',
  },
  {
    icon: Search,
    title: 'Advanced Search & Filter',
    description: 'Quickly find any reel with powerful search that scans descriptions, tags, and even your personal notes.',
    color: 'text-green-400',
  },
];

const Features = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Why You'll Love ReelVault
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the AI-powered features that make managing your reels effortless and fun.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-2xl shadow-xl hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/10 ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 