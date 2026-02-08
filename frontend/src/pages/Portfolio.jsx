import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { Toaster } from '../components/ui/toaster';
import { portfolioData } from '../data/mock';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative">
      <ParticleBackground />
      <Header activeSection={activeSection} />
      <main className="relative z-10">
        <section id="home">
          <Hero data={portfolioData.hero} />
        </section>
        <section id="about">
          <About data={portfolioData.about} />
        </section>
        <section id="skills">
          <Skills data={portfolioData.skills} />
        </section>
        <section id="experience">
          <Experience data={portfolioData.experience} />
        </section>
        <section id="projects">
          <Projects 
            featuredProjects={portfolioData.featuredProjects} 
            allProjects={portfolioData.allProjects} 
          />
        </section>
        <section id="certifications">
          <Certifications data={portfolioData.certifications} />
        </section>
        <section id="education">
          <Education data={portfolioData.education} />
        </section>
        <section id="contact">
          <Contact data={portfolioData.hero.contact} />
        </section>
      </main>
      <Footer data={portfolioData.hero.contact} />
      <Toaster />
    </div>
  );
};

export default Portfolio;
