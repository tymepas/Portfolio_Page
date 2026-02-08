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
        <span className="text-gray-700 font-medium">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full transition-all duration-1000"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="py-24 px-6 lg:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-teal-600"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
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
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-300"
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
                  className="p-4 bg-gradient-to-br from-gray-50 to-teal-50 rounded-lg border-l-4 border-teal-600 hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-gray-800 font-medium">{domain}</p>
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
