import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-white py-12 px-6 lg:px-12 border-t border-teal-500/30 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3">Garvit Mathur</h3>
            <p className="text-gray-400">
              Data Analyst turning data into actionable insights
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-400 hover:text-teal-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 rounded-lg hover:bg-teal-500 transition-all duration-300 hover:scale-110 border border-teal-500/30 hover:border-teal-400"
              >
                <Github size={20} />
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 rounded-lg hover:bg-teal-500 transition-all duration-300 hover:scale-110 border border-teal-500/30 hover:border-teal-400"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={data.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 rounded-lg hover:bg-teal-500 transition-all duration-300 hover:scale-110 border border-teal-500/30 hover:border-teal-400"
              >
                <Twitter size={20} />
              </a>
              <a
                href={`mailto:${data.email}`}
                className="p-3 bg-slate-800 rounded-lg hover:bg-teal-500 transition-all duration-300 hover:scale-110 border border-teal-500/30 hover:border-teal-400"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-teal-500/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Garvit Mathur. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Built with <Heart className="text-teal-400" size={16} fill="currentColor" /> using React & AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
