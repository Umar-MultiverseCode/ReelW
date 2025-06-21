import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, MessageSquarePlus, User, Info, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
        <Button variant="outline" size="icon" className="md:hidden bg-white/10 border-cyan-400/30 text-cyan-300 h-10 w-10 sm:h-12 sm:w-12">
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-slate-900 border-l-cyan-400/20 text-white w-[280px] sm:w-[320px]">
        <div className="flex flex-col h-full pt-16 sm:pt-20">
          <div className="flex-grow">
            <nav className="flex flex-col gap-1 sm:gap-2">
            {user ? (
                <Button onClick={handleShowFeedback} variant="ghost" className="w-full justify-start text-base sm:text-lg py-4 sm:py-5 hover:bg-white/10 rounded-lg">
                  <MessageSquarePlus className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  Share Feedback
                </Button>
            ) : (
                loggedOutLinks.map(link => (
                    <Button key={link.name} onClick={() => handleNavigation(link.href)} variant="ghost" className="w-full justify-start text-base sm:text-lg py-4 sm:py-5 hover:bg-white/10 rounded-lg">
                        <link.icon className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                        {link.name}
                    </Button>
                ))
            )}
            </nav>
          </div>
          <div className="mt-auto pb-6 sm:pb-8">
            {user ? (
              <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start text-base sm:text-lg py-4 sm:py-5 text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 rounded-lg">
                <LogOut className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Sign Out
              </Button>
            ) : (
                <Button onClick={() => handleNavigation('/auth')} className="w-full bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform py-4 sm:py-6 text-base sm:text-lg">
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