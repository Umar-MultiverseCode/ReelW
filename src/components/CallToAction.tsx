import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-white/10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
            Ready to Build Your Ultimate Reel Library?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Stop losing track of amazing content. Sign up for free and start building your personal vault of inspiration, knowledge, and fun.
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-full shadow-xl hover:scale-105 transition-transform duration-300 font-bold"
            >
              Sign Up for Free - It's Quick!
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 