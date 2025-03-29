// App.js with HashRouter (recommended for GitHub Pages)
import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Resume from './components/Resume';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/jinfeng-he-142080302" target="_blank" rel="noopener noreferrer">in</a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">gh</a>
        <a href="#" target="_blank" rel="noopener noreferrer">ig</a>
      </div>

      <header>
        <h1>JINFENG HE</h1>
      </header>
      
      <nav>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>ABOUT</NavLink>
        <NavLink to="/experience" className={({ isActive }) => isActive ? "active" : ""}>EXPERIENCE</NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>PROJECTS</NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? "active" : ""}>SERVICES</NavLink>
        <NavLink to="/resume" className={({ isActive }) => isActive ? "active" : ""}>RESUME</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>CONTACT</NavLink>
      </nav>
      
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Navigate replace to="/about" />} />
        </Routes>
      </main>
      
      <footer>
        <p>© JinFeng He. All Rights Reserved. 2025</p>
      </footer>
    </Router>
  );
}

export default App;
