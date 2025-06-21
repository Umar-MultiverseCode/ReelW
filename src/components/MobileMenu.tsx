import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, MessageSquarePlus, User, Info, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedHamburger } from '@/components/ui/AnimatedHamburger';

interface MobileMenuProps {
  onShowFeedbackForm?: () => void;
  onNavigate: (href: string) => void;
}

const loggedOutLinks = [
    { name: 'Features', href: '#features', icon: Sparkles },
    { name: 'How It Works', href: '#how-it-works', icon: Info },
    { name: 'About', href: '#about', icon: User },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ onShowFeedbackForm, onNavigate }) => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (href: string) => {
    onNavigate(href);
    setIsOpen(false);
  };

  const handleSignOut = () => {
    if (signOut) {
      signOut();
    }
    setIsOpen(false);
  };
  
  const handleShowFeedback = () => {
      if (onShowFeedbackForm) {
          onShowFeedbackForm();
      }
      setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden bg-transparent border-none shadow-none p-0 rounded-full hover:bg-transparent active:bg-transparent focus:ring-0 group"
        >
          <AnimatedHamburger open={isOpen} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-cyan-900/80 backdrop-blur-2xl border-l-2 border-cyan-400/30 text-white w-[280px] sm:w-[320px] rounded-l-3xl shadow-2xl">
        <div className="flex flex-col h-full pt-16 sm:pt-20">
          <div className="flex-grow">
            <nav className="flex flex-col gap-1 sm:gap-2">
            {user ? (
                <Button onClick={handleShowFeedback} variant="ghost" className="w-full justify-start text-base sm:text-lg py-3 sm:py-4 bg-transparent hover:bg-cyan-500/10 active:bg-cyan-500/20 focus:bg-transparent outline-none text-cyan-200 font-semibold rounded-xl shadow-none border-none transition">
                  <MessageSquarePlus className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Share Feedback
                </Button>
            ) : (
                loggedOutLinks.map(link => (
                    <Button key={link.name} onClick={() => handleNavigation(link.href)} variant="ghost" className="w-full justify-start text-base sm:text-lg py-3 sm:py-4 bg-transparent hover:bg-cyan-500/10 active:bg-cyan-500/20 focus:bg-transparent outline-none text-cyan-200 font-semibold rounded-xl shadow-none border-none transition">
                        <link.icon className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                        {link.name}
                    </Button>
                ))
            )}
            </nav>
          </div>
          <div className="mt-auto pb-6 sm:pb-8">
            {user ? (
              <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start text-base sm:text-lg py-3 sm:py-4 bg-transparent hover:bg-pink-500/10 active:bg-pink-500/20 focus:bg-transparent outline-none text-pink-200 font-semibold rounded-xl shadow-none border-none transition">
                <LogOut className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Sign Out
              </Button>
            ) : (
                <Button onClick={() => handleNavigation('/auth')} className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold rounded-full shadow-xl hover:scale-105 transition-transform py-4 sm:py-6 text-base sm:text-lg">
                    Sign In / Sign Up
                </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu; 