import React from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const Certifications = ({ data }) => {
  return (
    <div className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-teal-400 animate-pulse" size={32} />
            <h2 className="text-5xl md:text-6xl font-light text-white">
              Certifications
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-slate-800/80 rounded-lg p-6 border-t-4 border-teal-500 hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <Award className="text-teal-400" size={32} />
                  {cert.badge && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                      {cert.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {cert.title}
                </h3>
                
                <p className="text-gray-300 font-medium mb-3">{cert.issuer}</p>
                
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
