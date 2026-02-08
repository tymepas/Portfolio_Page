import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = ({ data }) => {
  return (
    <div className="py-24 px-6 lg:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-teal-600"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.map((edu) => (
            <div
              key={edu.id}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-teal-600"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <GraduationCap className="text-teal-600" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-700 font-medium mb-1">
                    {edu.institution}
                  </p>
                  {edu.field && (
                    <p className="text-gray-600 text-sm mb-3">{edu.field}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
