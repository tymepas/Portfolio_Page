import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = ({ data }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-teal-400 animate-pulse" size={32} />
            <h2 className="text-5xl md:text-6xl font-light text-white">
              Get In Touch
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                I'm always open to discussing new opportunities, interesting projects, or potential collaborations in data analytics and AI.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href={`mailto:${data.email}`}
                className="group flex items-center gap-4 p-4 bg-slate-800/80 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-teal-500/30 hover:border-teal-400"
              >
                <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg group-hover:bg-teal-500 transition-colors duration-300 border border-teal-400/30">
                  <Mail className="text-teal-400 group-hover:text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{data.email}</p>
                </div>
              </a>

              <a
                href={`tel:${data.phone}`}
                className="group flex items-center gap-4 p-4 bg-slate-800/80 rounded-lg hover:bg-slate-700 transition-colors duration-300 border border-teal-500/30 hover:border-teal-400"
              >
                <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg group-hover:bg-teal-500 transition-colors duration-300 border border-teal-400/30">
                  <Phone className="text-teal-400 group-hover:text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">{data.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-slate-800/80 rounded-lg border border-teal-500/30">
                <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-400/30">
                  <MapPin className="text-teal-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">{data.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-gray-400 mb-4">Follow me on:</p>
              <div className="flex gap-4">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/80 text-gray-300 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:scale-110 border border-teal-500/30 hover:border-teal-400"
                >
                  <Github size={20} />
                </a>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/80 text-gray-300 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:scale-110 border border-teal-500/30 hover:border-teal-400"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={data.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/80 text-gray-300 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300 hover:scale-110 border border-teal-500/30 hover:border-teal-400"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/80 rounded-xl p-8 border border-teal-500/30 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-slate-700/50 border-teal-500/30 text-white placeholder:text-gray-500 focus:border-teal-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full bg-slate-700/50 border-teal-500/30 text-white placeholder:text-gray-500 focus:border-teal-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows={5}
                  className="w-full bg-slate-700/50 border-teal-500/30 text-white placeholder:text-gray-500 focus:border-teal-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50"
              >
                <Send className="mr-2" size={18} />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
