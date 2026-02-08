import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Sparkles, Zap } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Projects = ({ featuredProjects, allProjects }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const categories = ['all', 'GenAI', 'Machine Learning', 'Data Analytics', 'Visualization'];

  const filteredProjects = allProjects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <div className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-teal-600 animate-pulse" size={32} />
            <h2 className="text-5xl md:text-6xl font-light text-gray-900">
              Projects
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600"></div>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 flex items-center gap-2">
            <Sparkles className="text-teal-600" size={28} />
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 hover:border-teal-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-48 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer"></div>
                  <div className="text-white text-center p-6 relative z-10">
                    <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                    <p className="text-teal-100">{project.category}</p>
                  </div>
                </div>
                <div className="p-6 relative">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge
                          key={idx}
                          className="bg-gradient-to-r from-gray-100 to-teal-50 text-gray-700 text-xs border border-teal-200 hover:border-teal-500 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.highlights && (
                    <div className="mb-4 space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-teal-600">✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    {project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors group/link"
                      >
                        <Github size={18} className="group-hover/link:rotate-12 transition-transform" />
                        <span className="text-sm font-medium">View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 md:mb-0">
              All Projects
            </h3>
            
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-lg p-6 shadow-sm hover:shadow-xl transition-all duration-500 border-l-4 border-teal-600 hover:border-cyan-600 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="mb-3">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {project.title}
                    </h4>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 rounded-full text-xs font-medium border border-teal-200">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, idx) => (
                      <Badge
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs hover:bg-teal-50 hover:text-teal-700 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge className="bg-gray-100 text-gray-700 text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{project.date}</span>
                    {project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors group/link"
                      >
                        <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length > 6 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 rounded-lg transition-all duration-300"
              >
                {showAll ? 'Show Less' : `View All ${filteredProjects.length} Projects`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
