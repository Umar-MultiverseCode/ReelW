import React from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, MessageSquarePlus } from 'lucide-react';

interface MobileMenuProps {
  onSignOut: () => void;
  onShowFeedbackForm: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onSignOut, onShowFeedbackForm }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden bg-white/10 border-cyan-400/30 text-cyan-300">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-slate-900 border-l-cyan-400/20 text-white w-[250px] sm:w-[300px]">
        <div className="flex flex-col h-full pt-12">
          <div className="flex-grow">
             <SheetClose asChild>
              <Button
                onClick={onShowFeedbackForm}
                variant="ghost"
                className="w-full justify-start text-lg py-4"
              >
                <MessageSquarePlus className="mr-3 h-5 w-5" />
                Share Feedback
              </Button>
            </SheetClose>
          </div>
          <div className="mt-auto">
             <SheetClose asChild>
              <Button
                onClick={onSignOut}
                variant="ghost"
                className="w-full justify-start text-lg py-4 text-pink-400 hover:text-pink-300"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu; 