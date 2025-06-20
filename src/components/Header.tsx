import React from 'react';
import { Github, Heart, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Heart className="h-6 w-6 text-white drop-shadow-lg" />
          </div>
          <span className="text-white font-extrabold text-2xl tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:brightness-125 transition-all">ReelVault</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <a href="#features" className="text-gray-200 hover:text-white font-medium transition-colors">Features</a>
          <a href="#about" className="text-gray-200 hover:text-white font-medium transition-colors">About</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </a>
          {user ? (
            <div className="flex items-center space-x-4 ml-4">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-lg">
                <User className="h-4 w-4 text-cyan-300" />
                <span className="text-cyan-100 text-sm font-semibold">{user.email}</span>
              </div>
              <Button
                onClick={signOut}
                variant="ghost"
                size="sm"
                className="text-pink-400 hover:text-white hover:bg-pink-500/20 rounded-full px-3 py-1"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/10 rounded-full px-5 py-1 font-semibold shadow-sm"
              >
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
