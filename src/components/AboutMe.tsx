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
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <Card className="bg-white/5 backdrop-blur-lg border border-white/10 text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 flex items-center justify-center p-8 bg-gradient-to-br from-purple-900/50 to-slate-900/50">
              <div className="relative">
                <Avatar className="w-40 h-40 border-4 border-cyan-400 shadow-lg">
                  <AvatarImage src="/profile.png" alt="Umar Mulla" />
                  <AvatarFallback className="text-4xl bg-purple-800">UM</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-2 -right-2 bg-gradient-to-tr from-cyan-400 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  Creator
                </span>
              </div>
            </div>
            <div className="md:w-2/3 p-8 md:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                About the Creator
              </h2>
              <h3 className="text-2xl font-semibold text-white mb-2">Umar Mulla</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                A passionate developer exploring new technologies and building useful applications. This project was created to showcase skills in modern web development and AI integration.
              </p>
              <div className="flex items-center space-x-4">
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
                      className="bg-white/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Icon className="h-5 w-5" />
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