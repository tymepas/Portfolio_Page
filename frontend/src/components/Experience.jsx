import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = ({ data }) => {
  return (
    <div className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-teal-400 animate-pulse" size={32} />
            <h2 className="text-5xl md:text-6xl font-light text-white">
              Experience
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
        </div>

        <div className="space-y-12">
          {data.map((job, index) => (
            <div
              key={job.id}
              className="relative pl-8 border-l-2 border-teal-500/30 hover:border-teal-400 transition-colors duration-300"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-teal-500 border-4 border-slate-900 shadow-lg shadow-teal-500/50"></div>
              
              <div className="bg-slate-800/80 rounded-lg p-6 hover:shadow-xl hover:shadow-teal-500/20 transition-shadow duration-300 border border-teal-500/30 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span className="font-medium text-gray-300">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{job.period}</span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 rounded-full text-sm font-medium mt-2 md:mt-0 border border-teal-400/30">
                    {job.type}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{job.description}</p>

                <div className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <p className="text-gray-300">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
