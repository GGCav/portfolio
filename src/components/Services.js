// components/Services.js
import React from 'react';

const Services = () => {
  return (
    <section>
      <h2 className="section-title">SERVICES</h2>
      <div className="services-container">
        <div className="service-column">
          <div className="column-title">DEVELOPMENT</div>
          <ul className="service-list">
            <li>Full-Stack Development</li>
            <li>Backend Architecture</li>
            <li>API Development</li>
            <li>Microservices Design</li>
            <li>Database Engineering</li>
            <li>Cloud Architecture</li>
          </ul>
        </div>
        
        <div className="service-column">
          <div className="column-title">TECHNOLOGY</div>
          <ul className="service-list">
            <li>Java/Spring Ecosystem</li>
            <li>Node.js/Express.js</li>
            <li>React/Redux</li>
            <li>Go Development</li>
            <li>C++ Applications</li>
            <li>SQL & NoSQL Databases</li>
          </ul>
        </div>
        
        <div className="service-column">
          <div className="column-title">SOLUTIONS</div>
          <ul className="service-list">
            <li>Distributed Systems</li>
            <li>High-Performance Apps</li>
            <li>Cloud Deployment</li>
            <li>System Optimization</li>
            <li>DevOps Integration</li>
            <li>Technical Consulting</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
