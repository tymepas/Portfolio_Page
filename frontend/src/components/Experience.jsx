import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = ({ data }) => {
  return (
    <div className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-teal-600"></div>
        </div>

        <div className="space-y-12">
          {data.map((job, index) => (
            <div
              key={job.id}
              className="relative pl-8 border-l-2 border-gray-200 hover:border-teal-600 transition-colors duration-300"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-teal-600 border-4 border-white"></div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span className="font-medium">{job.company}</span>
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
                  <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mt-2 md:mt-0">
                    {job.type}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <p className="text-gray-700">{achievement}</p>
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
