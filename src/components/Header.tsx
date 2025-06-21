import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Film, LogOut, MessageSquarePlus } from 'lucide-react';
import { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import { useFeedback } from '@/hooks/useFeedback';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const { addFeedback } = useFeedback();
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="ReelVault Logo" className="h-10 w-10 rounded-full object-cover shadow-lg" />
            <span className="text-2xl font-bold text-white hidden sm:inline">ReelVault</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={() => setIsFeedbackFormOpen(true)} className="bg-white/10 border border-cyan-400/30 text-cyan-300 hover:bg-white/20">
                Share Feedback
              </Button>
              <Button onClick={signOut} className="bg-pink-600/80 text-white hover:bg-pink-700/80">
                Sign Out
              </Button>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" onClick={(e) => { e.preventDefault(); handleNavigate('#features'); }} className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNavigate('#how-it-works'); }} className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigate('#about'); }} className="text-gray-300 hover:text-white transition-colors">About</a>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                  Sign In
                </Button>
              </Link>
            </nav>
          )}
          
          <MobileMenu 
            onNavigate={handleNavigate} 
            onShowFeedbackForm={() => setIsFeedbackFormOpen(true)} 
          />
        </div>
      </nav>
      {isFeedbackFormOpen && <FeedbackForm isOpen={isFeedbackFormOpen} onClose={() => setIsFeedbackFormOpen(false)} onSubmit={addFeedback} />}
    </header>
  );
};

export default Header;
