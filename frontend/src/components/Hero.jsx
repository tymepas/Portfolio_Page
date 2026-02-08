import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from './ui/button';
import TypewriterText from './TypewriterText';

const Hero = ({ data }) => {
  const { name, title, tagline, description, metrics, contact } = data;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-5xl w-full text-center relative z-10">
        <div className="space-y-8 animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-slow"></div>
              <img
                src="https://customer-assets.emergentagent.com/job_code-showcase-498/artifacts/3enkcsfs_ProfilePic.jpeg"
                alt="Garvit Mathur"
                className="relative w-40 h-40 rounded-full object-cover border-4 border-teal-500 shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 tracking-tight">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide">
              {title}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-2xl md:text-3xl font-light mb-4">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                <TypewriterText text={tagline} delay={50} />
              </span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* AI Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                AI-Powered Data Analytics
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto py-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-100 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => scrollToSection('projects')}
              className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-6 text-base rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 group"
            >
              <span className="relative z-10 flex items-center">
                View Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 text-base rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Download className="mr-2" size={18} />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <div className="relative text-gray-600 hover:text-teal-600 transition-all duration-300 transform group-hover:scale-110">
                <Github size={24} />
              </div>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <div className="relative text-gray-600 hover:text-teal-600 transition-all duration-300 transform group-hover:scale-110">
                <Linkedin size={24} />
              </div>
            </a>
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <div className="relative text-gray-600 hover:text-teal-600 transition-all duration-300 transform group-hover:scale-110">
                <Twitter size={24} />
              </div>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              <div className="relative text-gray-600 hover:text-teal-600 transition-all duration-300 transform group-hover:scale-110">
                <Mail size={24} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
