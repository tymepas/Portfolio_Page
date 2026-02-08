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
    <div className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-teal-600"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                I'm always open to discussing new opportunities, interesting projects, or potential collaborations in data analytics and AI.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors duration-300 group"
              >
                <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                  <Mail className="text-teal-600 group-hover:text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">{data.email}</p>
                </div>
              </a>

              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors duration-300 group"
              >
                <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-600 transition-colors duration-300">
                  <Phone className="text-teal-600 group-hover:text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-gray-900 font-medium">{data.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <MapPin className="text-teal-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-gray-900 font-medium">{data.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-gray-600 mb-4">Follow me on:</p>
              <div className="flex gap-4">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={data.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 hover:scale-110"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg transition-all duration-300 hover:scale-105"
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
