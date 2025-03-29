// components/Resume.js
import React from 'react';

const Resume = () => {
  return (
    <section>
      <h2 className="section-title">RESUME</h2>
      <div className="resume-container">
        <div className="resume-header">
          <div className="resume-name">JINFENG HE</div>
          <div className="resume-contact">
            <div>(+1) 6072807880</div>
            <div>jeffreyhe406@gmail.com</div>
            <div>linkedin.com/in/jinfeng-he-142080302</div>
            <div>Ithaca, USA</div>
          </div>
        </div>
        
        <div className="resume-section">
          <div className="resume-section-title">EDUCATION</div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div className="resume-entry-title">Cornell University</div>
              <div className="resume-entry-location">Aug. 2024 – Dec. 2025 (Expected)</div>
            </div>
            <div className="resume-entry-details">Master of Engineering in System Engineering (Software System Engineering Pathway)</div>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div className="resume-entry-title">University of Toronto</div>
              <div className="resume-entry-location">Sep. 2021 – Jun. 2024</div>
            </div>
            <div className="resume-entry-details">Bachelor of Science in Computer Science (Specializing in Entrepreneurship Stream)</div>
          </div>
        </div>
        
        <div className="resume-section">
          <div className="resume-section-title">WORK EXPERIENCE</div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div className="resume-entry-title">Alibaba Group</div>
              <div className="resume-entry-location">Dec. 2023 – Feb. 2024</div>
            </div>
            <div className="resume-entry-details">Software Engineer Intern • Hangzhou, China</div>
            <div className="resume-entry-description">
              <ul>
                <li>Delivered and maintained server-side applications in distributed microservices architecture using Java, Spring Boot, and Spring Cloud Netflix (Eureka, Ribbon, Hystrix), serving over 10,000 daily active users.</li>
                <li>Led the re-architecture and optimization of PostgreSQL databases, implementing advanced indexing like GiST, table partitioning, and query optimization using EXPLAIN ANALYZE that reduced response times by 40%.</li>
                <li>Enhanced backend performance by integrating a Redis Cluster using the cache-aside pattern, leveraging Redis Sentinel for high availability, achieving a 71% increase in data access efficiency.</li>
                <li>Achieved over 90% test coverage by implementing TDD using JUnit, Mockito, and TestContainers, integrating with Jenkins for CI/CD pipelines and utilizing SonarQube for static code analysis and quality gate enforcement.</li>
              </ul>
            </div>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div className="resume-entry-title">USoustenir</div>
              <div className="resume-entry-location">Apr. 2023 – Dec. 2023</div>
            </div>
            <div className="resume-entry-details">Startup Co-founder & Lead Full-Stack Developer • Scarborough, Canada</div>
            <div className="resume-entry-description">
              <ul>
                <li>Co-founded and developed a scalable web application using React, with Redux for state management, TypeScript, Node.js, and Express.js, providing a platform for users to discover and connect with sustainable brands.</li>
                <li>Managed data storage using MongoDB with Mongoose ODM, deploying the backend on AWS EC2 instances behind an AWS Application Load Balancer, utilizing Auto Scaling Groups for dynamic scaling.</li>
                <li>Implemented an interactive map using Mapbox GL JS and GeoJSON, integrating geospatial queries with MongoDB's 2dsphere indexes to visualize local recycling facilities and sustainable clothing drop-off points.</li>
                <li>Deployed the frontend using AWS Amplify and configured AWS CloudFront CDN for global content delivery, enhancing load times and user experience.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="resume-section">
          <div className="resume-section-title">PROJECTS</div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div className="resume-entry-title">Warehouse Management System</div>
            </div>
            <div className="resume-entry-description">
              <ul>
                <li>Developed a high-performance warehouse management system using C++14 for core backend services, ensuring optimal performance.</li>
                <li>Implemented multi-threading and concurrency control using C++ Standard Library features (std::thread, std::mutex, std::atomic) to handle simultaneous warehouse operations, improving throughput by 50%.</li>
                <li>Utilized gRPC and Protocol Buffers for efficient communication between distributed services.</li>
                <li>Deployed the application using Docker and Kubernetes, ensuring high availability and scalability across multiple locations.</li>
              </ul>
            </div>
          </div>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div className="resume-entry-title">Webtama</div>
            </div>
            <div className="resume-entry-description">
              <ul>
                <li>Engineered backend services in Go (Golang), leveraging advanced concurrency primitives (goroutines, channels, sync.Pool, context.Context) to build a high-performance P2P matchmaking system.</li>
                <li>Built a custom game server in Go to manage real-time game logic, including move validation and turn-based state transitions.</li>
                <li>Architected a scalable worker pool pattern with buffered channels to parallelize AI move calculations (MiniMax algorithm) for future bot integrations.</li>
                <li>Profiled and optimized garbage collection bottlenecks using pprof and go-torch, improving P99 latency.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="resume-section">
          <div className="resume-section-title">TECHNICAL SKILLS</div>
          <div className="skills-list">
            <div><span className="skills-category">Languages:</span> Java, Python, C/C++, JavaScript, TypeScript, SQL, Shell, HTML, CSS, Go, MATLAB, R, Ruby, Haskell, Rust, Scala, Kotlin</div>
            <div><span className="skills-category">Frameworks & Libraries:</span> Express.js, React.js, Node.js, Redux, Three.js, GIN, Spring Cloud, Spring Boot, Auth0, Stripe API, Socket.io, SendGrid API, gRPC, RESTful APIs, Apache Airflow, PySpark, Web Audio API</div>
            <div><span className="skills-category">Database:</span> PostgreSQL (with PostGIS), MongoDB, Redis, HBase, SQLite, MySQL</div>
            <div><span className="skills-category">Cloud Platforms:</span> AWS (EC2, S3, RDS, Lambda, CloudFront), GCP (GKE, Compute Engine)</div>
            <div><span className="skills-category">Others:</span> Linux, Kubernetes, Istio, Docker, Git, JUnit, SonarQube, Snyk, Jenkins, Mockito, Prometheus, Grafana, Elasticsearch, Logstash, Kibana, Jira, Agile, CI/CD, OAuth 2.0</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
