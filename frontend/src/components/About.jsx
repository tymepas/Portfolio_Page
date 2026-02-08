import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const About = ({ data }) => {
  const { summary, highlights } = data;

  return (
    <div className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-teal-600 animate-pulse" size={32} />
            <h2 className="text-5xl md:text-6xl font-light text-gray-900">
              About Me
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Photo + Summary */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img
                src="https://customer-assets.emergentagent.com/job_code-showcase-498/artifacts/3enkcsfs_ProfilePic.jpeg"
                alt="Garvit Mathur"
                className="relative w-full rounded-2xl shadow-xl border-4 border-white transform group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {summary}
            </p>
            
            <div className="relative overflow-hidden p-6 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10 rounded-lg border border-teal-500/20 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-2xl"></div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                What drives me?
              </h3>
              <p className="text-gray-700">
                The opportunity to transform messy, complex data into clear, actionable narratives—helping organizations make smarter decisions and shaping the future of AI applications.
              </p>
            </div>
          </div>

          {/* Right Column: Highlights */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              Key Highlights
            </h3>
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                <div className="relative flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
                  <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 leading-relaxed">{highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
