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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-400/20">
      <nav className="w-full flex justify-between items-center px-3 py-2 sm:container sm:mx-auto sm:px-4 lg:px-8 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 z-0 relative">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <img src="/logo.png" alt="ReelVault Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform" />
            <span className="text-base sm:text-lg lg:text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">ReelVault</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 relative z-50">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={() => setIsFeedbackFormOpen(true)} variant="outline" className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200">
                Share Feedback
              </Button>
              <Button onClick={signOut} className="bg-pink-600/80 text-white hover:bg-pink-700/90">
                Sign Out
              </Button>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" onClick={(e) => { e.preventDefault(); handleNavigate('#features'); }} className="relative text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">Features</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNavigate('#how-it-works'); }} className="relative text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">How It Works</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigate('#about'); }} className="relative text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">About</a>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-bold rounded-full shadow-lg shadow-pink-500/20 hover:scale-105 hover:shadow-pink-500/30 transition-all duration-300 ease-in-out">
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
