import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from './ui/button';

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
    <div className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20">
      <div className="max-w-5xl w-full text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 tracking-tight">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide">
              {title}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-light text-teal-600 mb-4">
              {tagline}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto py-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:bg-teal-50 transition-colors duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-base rounded-lg transition-all duration-300 hover:scale-105"
            >
              View Projects
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 text-base rounded-lg transition-all duration-300"
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
              className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110"
            >
              <Twitter size={24} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
