// App.js with Manga-Style Panel Layout
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import './App.css';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Chatbox from './components/Chatbox';

function App() {
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
    <Router>
      {/* Navigation Panel - Full Height Left Sidebar */}
      <div className="nav-panel">
        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('home')}
          >
            HOME
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('about')}
          >
            ABOUT
          </NavLink>
          <NavLink 
            to="/experience" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('experience')}
          >
            EXPERIENCE
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('projects')}
          >
            PROJECTS
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('services')}
          >
            SKILLS
          </NavLink>
          <NavLink 
            to="/resume" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('resume')}
          >
            RESUME
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentSection('contact')}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
