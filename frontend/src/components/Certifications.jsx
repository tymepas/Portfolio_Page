import React from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const Certifications = ({ data }) => {
  return (
    <div className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-teal-600"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((cert) => (
            <div
              key={cert.id}
              className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-lg p-6 border-t-4 border-teal-600 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="text-teal-600" size={32} />
                {cert.badge && (
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full">
                    {cert.badge}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {cert.title}
              </h3>
              
              <p className="text-gray-700 font-medium mb-3">{cert.issuer}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={14} />
                <span>{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
