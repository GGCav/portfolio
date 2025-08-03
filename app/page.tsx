'use client';

import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../src/App.css';
import About from '../src/components/About';
import Experience from '../src/components/Experience';
import Projects from '../src/components/Projects';
import Services from '../src/components/Services';
import Resume from '../src/components/Resume';
import Contact from '../src/components/Contact';
import Chatbox from '../src/components/Chatbox';

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState('home');

  const HomePage = () => (
    <div className="manga-container">
      {/* Speed Lines Effect */}
      <div className="speed-lines">
        <div className="speed-line"></div>
        <div className="speed-line"></div>
        <div className="speed-line"></div>
        <div className="speed-line"></div>
      </div>

      {/* Main Hero Panel */}
      <div className="hero-panel">
        <div className="hero-content">
          <h1 className="hero-title">WELCOME</h1>
          <p className="hero-subtitle">JINFENG HE</p>
          <p className="hero-subtitle">FULL-STACK DEVELOPER</p>
        </div>
      </div>

      {/* AI Chatbox Panel */}
      <Chatbox />

      {/* Contact Panel */}
      <div className="contact-panel">
        <div className="contact-content">
          <h2 className="contact-title">GET IN TOUCH</h2>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/jinfeng-he-142080302" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href="mailto:jeffreyhe406@gmail.com" className="social-icon">
              <FaEnvelope />
            </a>
            <a href="tel:+16072807880" className="social-icon">
              <FaPhone />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      {/* Navigation Panel - Full Height Left Sidebar */}
      <div className="nav-panel">
        <div className="nav-links">
          <button 
            className={currentSection === 'home' ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('home')}
          >
            HOME
          </button>
          <button 
            className={currentSection === 'about' ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('about')}
          >
            ABOUT
          </button>
          <button 
            className={currentSection === 'experience' ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('experience')}
          >
            EXPERIENCE
          </button>
          <button 
            className={currentSection === 'projects' ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('projects')}
          >
            PROJECTS
          </button>
          <button 
            className={currentSection === 'services' ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('services')}
          >
            SKILLS
          </button>
          <button 
            className={currentSection === 'resume' ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('resume')}
          >
            RESUME
          </button>
          <button 
            className={currentSection === 'contact' ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('contact')}
          >
            CONTACT
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {currentSection === 'home' && <HomePage />}
        {currentSection === 'about' && <About />}
        {currentSection === 'experience' && <Experience />}
        {currentSection === 'projects' && <Projects />}
        {currentSection === 'services' && <Services />}
        {currentSection === 'resume' && <Resume />}
        {currentSection === 'contact' && <Contact />}
      </div>
    </div>
  );
} 