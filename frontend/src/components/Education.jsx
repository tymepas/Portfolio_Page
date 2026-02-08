import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = ({ data }) => {
  return (
    <div className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="text-teal-400 animate-pulse" size={32} />
            <h2 className="text-5xl md:text-6xl font-light text-white">
              Education
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.map((edu) => (
            <div
              key={edu.id}
              className="group relative bg-slate-800/80 rounded-lg p-8 shadow-sm hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300 border-l-4 border-teal-500 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-400/30">
                    <GraduationCap className="text-teal-400" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-300 font-medium mb-1">
                      {edu.institution}
                    </p>
                    {edu.field && (
                      <p className="text-gray-400 text-sm mb-3">{edu.field}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
