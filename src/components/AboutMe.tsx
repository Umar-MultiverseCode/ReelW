import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Umar-MultiverseCode',
    icon: Github,
    ariaLabel: "Umar Mulla's GitHub Profile",
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/Umar-Mulla/',
    icon: Linkedin,
    ariaLabel: "Umar Mulla's LinkedIn Profile",
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/u_m_a_r_74/',
    icon: Instagram,
    ariaLabel: "Umar Mulla's Instagram Profile",
  },
];

const AboutMe = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="container mx-auto px-3 sm:px-4">
        <Card className="bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-purple-900/50 to-slate-900/50">
              <div className="relative">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 border-cyan-400 shadow-lg">
                  <AvatarImage src="/profile.png" alt="Umar Mulla" />
                  <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl bg-purple-800">UM</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-1 sm:bottom-2 -right-1 sm:-right-2 bg-gradient-to-tr from-cyan-400 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  Creator
                </span>
              </div>
            </div>
            <div className="md:w-2/3 p-6 sm:p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                About the Creator
              </h2>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Umar Mulla</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                A passionate developer exploring new technologies and building useful applications. This project was created to showcase skills in modern web development and AI integration.
              </p>
              <div className="flex items-center space-x-3 sm:space-x-4">
                {socialLinks.map(({ name, url, icon: Icon, ariaLabel }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 h-10 w-10 sm:h-12 sm:w-12"
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AboutMe; 