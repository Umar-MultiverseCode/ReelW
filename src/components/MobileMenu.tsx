import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
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
  return (
    <Sheet>
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
              <SheetClose asChild>
                <Button onClick={onShowFeedbackForm} variant="ghost" className="w-full justify-start text-lg py-4">
                  <MessageSquarePlus className="mr-3 h-5 w-5" />
                  Share Feedback
                </Button>
              </SheetClose>
            ) : (
                loggedOutLinks.map(link => (
                    <SheetClose asChild key={link.name}>
                        <Button onClick={() => onNavigate(link.href)} variant="ghost" className="w-full justify-start text-lg py-4">
                            <link.icon className="mr-3 h-5 w-5" />
                            {link.name}
                        </Button>
                    </SheetClose>
                ))
            )}
            </nav>
          </div>
          <div className="mt-auto">
            <SheetClose asChild>
            {isLoggedIn ? (
              <Button onClick={onSignOut} variant="ghost" className="w-full justify-start text-lg py-4 text-pink-400 hover:text-pink-300">
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            ) : (
                <Button onClick={() => onNavigate('/auth')} className="w-full bg-gradient-to-r from-cyan-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform py-6 text-lg">
                    Sign In / Sign Up
                </Button>
            )}
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu; 