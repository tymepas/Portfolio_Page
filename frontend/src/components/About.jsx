import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About = ({ data }) => {
  const { summary, highlights } = data;

  return (
    <div className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-teal-600"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {summary}
            </p>
            <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                What drives me?
              </h3>
              <p className="text-gray-700">
                The opportunity to transform messy, complex data into clear, actionable narratives—helping organizations make smarter decisions and shaping the future of AI applications.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Key Highlights
            </h3>
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors duration-300"
              >
                <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                <p className="text-gray-700 leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
