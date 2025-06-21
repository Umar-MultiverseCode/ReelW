import React from 'react';
import { Github, Heart, LogOut, User, Film, Sun, Moon, MessageSquarePlus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import { useFeedback } from '@/hooks/useFeedback';
import MobileMenu from './MobileMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
];

const SimpleMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden bg-white/10 border-cyan-400/30 text-cyan-300">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-slate-900 border-l-cyan-400/20 text-white w-[250px] sm:w-[300px]">
        <div className="flex flex-col h-full pt-12">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-lg p-2"
                  >
                    {link.name}
                  </a>
              ))}
            </nav>
            <div className="mt-auto">
                <Link to="/auth">
                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform py-6 text-lg">
                      Sign In
                    </Button>
                </Link>
            </div>
        </div>
      </SheetContent>
    </Sheet>
);

const Header = () => {
  const { user, signOut } = useAuth();
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const { addFeedback } = useFeedback();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              ReelVault
            </span>
          </Link>

          {user ? (
            <>
              <div className="hidden md:flex items-center gap-4">
                <Button onClick={() => setIsFeedbackFormOpen(true)} variant="outline" size="sm" className="bg-white/10 text-cyan-300 border-cyan-400/30 hover:bg-cyan-400/20 hover:text-white">
                  <MessageSquarePlus className="h-4 w-4 mr-2" />
                  Share Feedback
                </Button>
                <Button onClick={signOut} variant="outline" size="sm" className="bg-white/10 text-pink-400 border-pink-400/30 hover:bg-pink-400/20 hover:text-pink-300">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
              <MobileMenu onSignOut={signOut} onShowFeedbackForm={() => setIsFeedbackFormOpen(true)} />
              <FeedbackForm
                isOpen={isFeedbackFormOpen}
                onClose={() => setIsFeedbackFormOpen(false)}
                onSubmit={addFeedback}
              />
            </>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
               <Link to="/auth">
                <Button className="bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
                  Sign In
                </Button>
              </Link>
            </nav>
          )}
          <SimpleMobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
