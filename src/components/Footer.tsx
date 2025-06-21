import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/Umar-MultiverseCode', icon: Github },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/Umar-Mulla/', icon: Linkedin },
        { name: 'Instagram', url: 'https://www.instagram.com/u_m_a_r_74/', icon: Instagram },
    ];

    return (
        <footer className="bg-slate-950/50 border-t border-white/10">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">ReelVault</h3>
                        <p className="text-gray-400 mt-1">&copy; {new Date().getFullYear()} Umar Mulla. All Rights Reserved.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ name, url, icon: Icon }) => (
                            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="bg-white/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 hover:text-white rounded-full transition-all"
                                >
                                    <Icon className="h-5 w-5" />
                                </Button>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 