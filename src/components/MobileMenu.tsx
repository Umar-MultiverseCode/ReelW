import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, MessageSquarePlus, User, Home, Info, Sparkles } from 'lucide-react';

interface MobileMenuProps {
  isLoggedIn: boolean;
  onSignOut?: () => void;
  onShowFeedbackForm?: () => void;
  onNavigate: (href: string) => void;
}

const loggedOutLinks = [
    { name: 'Features', href: '#features', icon: Sparkles },
    { name: 'How It Works', href: '#how-it-works', icon: Info },
    { name: 'About', href: '#about', icon: User },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isLoggedIn, onSignOut, onShowFeedbackForm, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (href: string) => {
    onNavigate(href);
    setIsOpen(false);
  };

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
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
        <Button variant="outline" size="icon" className="md:hidden bg-white/10 border-cyan-400/30 text-cyan-300">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-slate-900 border-l-cyan-400/20 text-white w-[280px] sm:w-[320px]">
        <div className="flex flex-col h-full pt-12">
          <div className="flex-grow">
            <nav className="flex flex-col gap-2">
            {isLoggedIn ? (
                <Button onClick={handleShowFeedback} variant="ghost" className="w-full justify-start text-lg py-4">
                  <MessageSquarePlus className="mr-3 h-5 w-5" />
                  Share Feedback
                </Button>
            ) : (
                loggedOutLinks.map(link => (
                    <Button key={link.name} onClick={() => handleNavigation(link.href)} variant="ghost" className="w-full justify-start text-lg py-4">
                        <link.icon className="mr-3 h-5 w-5" />
                        {link.name}
                    </Button>
                ))
            )}
            </nav>
          </div>
          <div className="mt-auto">
            {isLoggedIn ? (
              <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start text-lg py-4 text-pink-400 hover:text-pink-300">
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            ) : (
                <Button onClick={() => handleNavigation('/auth')} className="w-full bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform py-6 text-lg">
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