import React from 'react';
import { ClipboardPaste, Bot, Library } from 'lucide-react';

const steps = [
  {
    icon: ClipboardPaste,
    title: 'Step 1: Save a Reel',
    description: 'Simply paste the link to any Instagram Reel or YouTube Short you want to save.',
  },
  {
    icon: Bot,
    title: 'Step 2: Let AI Do the Work',
    description: 'Our AI automatically fetches the video, detects its mood, and suggests smart tags for organization.',
  },
  {
    icon: Library,
    title: 'Step 3: Build Your Vault',
    description: 'Enjoy your perfectly organized collection. Search, filter, and rediscover your favorite moments anytime.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Get Started in 3 Easy Steps
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Saving and organizing your favorite content has never been this simple.
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-400/20 hidden md:block" aria-hidden="true"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-800 to-slate-800 border-2 border-cyan-400/50 shadow-lg">
                      <step.icon className="w-10 h-10 text-cyan-400" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 