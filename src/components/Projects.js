// components/Projects.js
import React from 'react';

const Projects = () => {
  return (
    <section>
      <h2 className="section-title">PROJECTS</h2>
      <p><strong>Warehouse Management System</strong></p>
      <p>Developed a high-performance warehouse management system using C++14 for core backend services with multi-threading and concurrency control. Utilized gRPC for communication between distributed services and deployed using Docker and Kubernetes.</p>
      
      <p><strong>Webtama</strong></p>
      <p>Engineered backend services in Go (Golang) for a web application to play Onitama on a 3D board. Implemented advanced concurrency primitives and built a custom game server to manage real-time game logic. Optimized performance using profiling tools.</p>
      
      <p><strong>USoustenir Platform</strong></p>
      <p>Created a platform connecting users with sustainable brands featuring interactive maps and geospatial functionality. Leveraged the MERN stack (MongoDB, Express, React, Node.js) with AWS cloud infrastructure.</p>
    </section>
  );
};

export default Projects;
