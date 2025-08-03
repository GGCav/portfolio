// components/Experience.js
import React from 'react';
import { FaBasketballBall, FaBrain, FaShoppingCart, FaTshirt } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      company: "Montaura.tech",
      position: "Founder & Full-Stack Developer",
      period: "Jul 2025 - Present",
      location: "China (remote)",
      icon: <FaBasketballBall />,
      description: "Engineered a full-stack cross-platform basketball-court-focused application in Flutter (using Riverpod state management) and Go (Gin framework) via RESTful APIs deployed in a Dockerized environment on Alibaba Cloud serving daily users of 10000+. Implemented low-latency, real-time interactive features including live court check-ins, instant messaging, and dynamic game updates using a WebSocket-based pub/sub system; leveraged PostGIS for efficient geospatial queries to power location-based check-in functionality within a defined geofence with integrating AMap.",
      tech: ["Flutter", "Go", "Gin", "PostGIS", "WebSocket", "Docker", "Alibaba Cloud"]
    },
    {
      company: "Vosyn.AI",
      position: "Backend/ML Engineer Intern",
      period: "Jun 2025 - Present",
      location: "Etobicoke, Canada",
      icon: <FaBrain />,
      description: "Engineered a core component of an event-driven video processing pipeline on GCP, to handle transcription, speaker diarization, and audio segmentation. The entire infrastructure was provisioned as code using Terraform. Deployed transcription (Faster Whisper) and diarization (NeMo MSDD) models on Vertex AI, and developed a temporal alignment algorithm in Python to merge their outputs by mapping word-level timestamps to speaker time segments. Implemented a data processing workflow using regex and Pydub to clean transcripts and segment audio, improving the data quality for downstream translation and Text-to-Speech (TTS) models. Developed and containerized a scalable Python microservice with FastAPI and Docker, exposing a RESTful API to trigger asynchronous ML inference jobs on Google Cloud Run.",
      tech: ["Python", "FastAPI", "GCP", "Terraform", "Vertex AI", "Docker", "ML/AI"]
    },
    {
      company: "Alibaba Group",
      position: "Software Engineer Intern",
      period: "Dec 2023 - Feb 2024",
      location: "Hangzhou, China",
      icon: <FaShoppingCart />,
      description: "Owned the end-to-end development of a new 'flash sale' feature, from API design in Java Spring Boot to deployment. Proactively addressed post-launch performance by first implementing a PostgreSQL GiST index to accelerate complex geospatial-temporal queries by 40%, and engineered a Redis cache-aside layer to handle high-throughput reads, further reducing database load under peak traffic. Enhanced service observability by instrumenting the application with custom Micrometer metrics, including Counters for promotion redemption events and Timers to measure API endpoint performance. Developed a Grafana dashboard to visualize these metrics, tracking critical KPIs like P99 latency and error rates.",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Micrometer", "Grafana"]
    },
    {
      company: "USoustenir",
      position: "Startup Co-founder & Lead Full-Stack Developer",
      period: "Apr 2023 - Dec 2023",
      location: "Scarborough, Canada",
      icon: <FaTshirt />,
      description: "Co-founded and developed a scalable web application using React, with Redux for state management, TypeScript, Node.js, and Express.js, providing a platform for users to discover and connect with sustainable brands. Managed data storage using MongoDB with Mongoose ODM, deploying the backend on AWS EC2 instances behind an AWS Application Load Balancer, utilizing Auto Scaling Groups for dynamic scaling. Implemented an interactive map using Mapbox GL JS and GeoJSON, integrating geospatial queries with MongoDB's 2dsphere indexes to visualize local recycling facilities and sustainable clothing drop-off points. Deployed the frontend using AWS Amplify and configured AWS CloudFront CDN for global content delivery, enhancing load times and user experience.",
      tech: ["React", "Redux", "Node.js", "TypeScript", "MongoDB", "AWS", "Mapbox"]
    }
  ];

  return (
    <div className="manga-container">
      <div className="about-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / 3' }}>
        <div className="about-content">
          <h2 className="about-title">EXPERIENCE</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '30px' }}>
            {experiences.map((exp, index) => (
              <div key={index} style={{
                border: '3px solid #000',
                padding: '25px',
                position: 'relative',
                background: '#f8f8f8',
                marginLeft: index % 2 === 0 ? '0' : '50px'
              }}>
                {/* Timeline connector */}
                <div style={{
                  position: 'absolute',
                  left: index % 2 === 0 ? '-20px' : 'auto',
                  right: index % 2 === 0 ? 'auto' : '-20px',
                  top: '30px',
                  width: '20px',
                  height: '3px',
                  background: '#000'
                }}></div>
                
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{
                    fontSize: '3rem',
                    width: '80px',
                    textAlign: 'center',
                    flexShrink: 0
                  }}>
                    {exp.icon}
                  </div>
                  
                  <div style={{ flex: '1' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: 'Orbitron, monospace',
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          marginBottom: '5px'
                        }}>
                          {exp.company}
                        </h3>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#333',
                          marginBottom: '5px'
                        }}>
                          {exp.position}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#666',
                          fontStyle: 'italic'
                        }}>
                          {exp.location}
                        </div>
                      </div>
                      
                      <div style={{
                        textAlign: 'right',
                        fontSize: '0.8rem',
                        fontFamily: 'Roboto Mono, monospace',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#000',
                        background: '#fff',
                        padding: '5px 10px',
                        border: '2px solid #000'
                      }}>
                        {exp.period}
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      {exp.description}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {exp.tech.map((tech, techIndex) => (
                        <span key={techIndex} style={{
                          background: '#000',
                          color: '#fff',
                          padding: '4px 8px',
                          fontSize: '0.7rem',
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
