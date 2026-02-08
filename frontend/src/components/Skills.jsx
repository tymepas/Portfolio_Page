import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Code2, Database, Brain, Wrench, Target } from 'lucide-react';

const Skills = ({ data }) => {
  const { technical, dataScience, aiTools, tools, domains } = data;
  const [activeTab, setActiveTab] = useState('technical');

  const tabs = [
    { id: 'technical', label: 'Technical Skills' },
    { id: 'dataScience', label: 'Data Science' },
    { id: 'ai', label: 'AI & GenAI' },
    { id: 'tools', label: 'Tools' },
    { id: 'domains', label: 'Domains' }
  ];

  const SkillBar = ({ skill }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <span className="text-sm text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-1000 shadow-lg shadow-teal-500/50"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-teal-400 animate-pulse" size={32} />
            <h2 className="text-5xl md:text-6xl font-light text-white">
              Skills & Expertise
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/50 scale-105'
                  : 'bg-slate-800/80 text-gray-300 hover:bg-slate-700 border border-teal-500/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/80 rounded-xl p-8 shadow-xl border border-teal-500/30 backdrop-blur-sm">
          {activeTab === 'technical' && (
            <div className="space-y-6">
              {technical.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
          )}

          {activeTab === 'dataScience' && (
            <div className="space-y-6">
              {dataScience.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              {aiTools.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-300 border border-teal-400/30 hover:border-teal-400"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          )}

          {activeTab === 'domains' && (
            <div className="grid md:grid-cols-2 gap-4">
              {domains.map((domain, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-slate-700/50 to-teal-500/10 rounded-lg border-l-4 border-teal-400 hover:shadow-md hover:shadow-teal-500/30 transition-shadow duration-300"
                >
                  <p className="text-gray-300 font-medium">{domain}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
