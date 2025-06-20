
import React from 'react';
import { Github, Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">ReelVault</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
