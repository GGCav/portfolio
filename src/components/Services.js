// components/Services.js
import React from 'react';
import { FaCode, FaBrain, FaDatabase, FaCloud, FaTools, FaRocket, FaFlask, FaServer, FaNetworkWired, FaShieldAlt, FaMobile, FaMapMarkedAlt, FaPalette, FaStar } from 'react-icons/fa';

const Services = () => {
  const skillCategories = [
    {
      title: "PROGRAMMING LANGUAGES",
      icon: <FaCode />,
      skills: [
        "Python", "Java", "C++14", "Go", "JavaScript", "TypeScript", 
        "SQL", "Shell/Bash", "HTML/CSS", "Rust", "Scala", "R", "Dart"
      ]
    },
    {
      title: "AI & MACHINE LEARNING",
      icon: <FaBrain />,
      skills: [
        "PyTorch", "TensorFlow", "Transformers", "BioBERT", "Longformer", 
        "LLaMA2", "ClinicalBERT", "Hugging Face", "Scikit-learn", "NLTK", "SpaCy",
        "Faster Whisper", "NeMo MSDD", "Vertex AI", "ML/AI Pipelines"
      ]
    },
    {
      title: "MOBILE & CROSS-PLATFORM",
      icon: <FaMobile />,
      skills: [
        "Flutter", "Riverpod", "Dart", "Cross-platform Development", 
        "Mobile App Development", "State Management", "Real-time Features"
      ]
    },
    {
      title: "BIOMEDICAL & CLINICAL AI",
      icon: <FaFlask />,
      skills: [
        "Biomedical NLP", "Clinical RAG", "Knowledge Graphs", "MIMIC-III/IV", 
        "PubMed", "CTD Database", "Medical Entity Recognition", "Clinical Text Mining"
      ]
    },
    {
      title: "FRONTEND & UI/UX",
      icon: <FaPalette />,
      skills: [
        "React.js", "Redux", "TypeScript", "Vue.js", "Flutter", 
        "Material-UI", "Tailwind CSS", "Responsive Design", "Progressive Web Apps",
        "Mapbox GL JS", "Interactive Maps", "Geospatial Visualization"
      ]
    },
    {
      title: "BACKEND & APIs",
      icon: <FaServer />,
      skills: [
        "Spring Boot", "Node.js", "Express.js", "FastAPI", "Gin", 
        "gRPC", "REST APIs", "GraphQL", "WebSocket", "Microservices",
        "Micrometer", "Observability", "Performance Monitoring"
      ]
    },
    {
      title: "DATABASES & STORAGE",
      icon: <FaDatabase />,
      skills: [
        "PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", 
        "Cassandra", "HBase", "Neo4j", "InfluxDB", "Vector Databases",
        "PostGIS", "Geospatial Databases", "2dsphere Indexes"
      ]
    },
    {
      title: "CLOUD & INFRASTRUCTURE",
      icon: <FaCloud />,
      skills: [
        "AWS", "GCP", "Alibaba Cloud", "Docker", "Kubernetes", 
        "Terraform", "Jenkins", "GitLab CI/CD", "ArgoCD", "Helm",
        "AWS EC2", "AWS Amplify", "AWS CloudFront", "AWS Application Load Balancer",
        "Google Cloud Run", "Vertex AI", "Cloud Storage"
      ]
    },
    {
      title: "DEVOPS & MONITORING",
      icon: <FaTools />,
      skills: [
        "Prometheus", "Grafana", "ELK Stack", "Jaeger", "Istio", 
        "Ansible", "Puppet", "Vault", "Consul", "Service Mesh",
        "Micrometer", "Custom Metrics", "Performance Dashboards", "Error Tracking"
      ]
    },
    {
      title: "DISTRIBUTED SYSTEMS",
      icon: <FaNetworkWired />,
      skills: [
        "High Performance Computing", "Concurrency Control", "Load Balancing", 
        "Database Sharding", "Event-Driven Architecture", "Message Queues", "Caching Strategies",
        "Auto Scaling Groups", "Horizontal Scaling", "Distributed Caching"
      ]
    },
    {
      title: "GEOSPATIAL & LOCATION SERVICES",
      icon: <FaMapMarkedAlt />,
      skills: [
        "PostGIS", "Mapbox GL JS", "GeoJSON", "Geospatial Queries", 
        "Location-based Services", "Geofencing", "AMap Integration",
        "2dsphere Indexes", "Spatial Data Processing", "Real-time Location Tracking"
      ]
    },
    {
      title: "SECURITY & COMPLIANCE",
      icon: <FaShieldAlt />,
      skills: [
        "OAuth 2.0", "JWT", "HTTPS/TLS", "Data Encryption", "HIPAA Compliance", 
        "GDPR", "Security Auditing", "Penetration Testing", "Zero Trust Architecture"
      ]
    },
    {
      title: "DATA ENGINEERING",
      icon: <FaRocket />,
      skills: [
        "Apache Spark", "Apache Airflow", "ETL Pipelines", "Data Warehousing", 
        "Real-time Streaming", "Data Lake", "Feature Engineering", "MLOps",
        "Video Processing", "Audio Segmentation", "Speaker Diarization", "Transcription"
      ]
    },
    {
      title: "SPECIALIZED EXPERTISE",
      icon: <FaStar />,
      skills: [
        "System Architecture Design", "Performance Optimization", "Scalability Engineering", 
        "Real-time Systems", "Game Development", "Biomedical Informatics", "Clinical Decision Support",
        "Flash Sale Systems", "High-throughput Processing", "Database Optimization", "GiST Indexes"
      ]
    }
  ];

  return (
    <div className="manga-container">
      <div className="projects-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / 3' }}>
        <h2 className="about-title">TECHNICAL EXPERTISE</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '25px',
          marginTop: '30px'
        }}>
          {skillCategories.map((category, index) => (
            <div key={index} style={{
              border: '3px solid #000',
              padding: '25px',
              background: '#f8f8f8',
              position: 'relative',
              minHeight: '220px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{ 
                  fontSize: '2.5rem',
                  color: '#000'
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: 0
                }}>
                  {category.title}
                </h3>
              </div>
        
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} style={{
                    background: '#000',
                    color: '#fff',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    borderRadius: '3px',
                    border: '2px solid #000',
                    transition: 'all 0.3s ease'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Expertise Level Panel */}
        <div style={{
          marginTop: '30px',
          border: '3px solid #000',
          padding: '30px',
          background: '#000',
          color: '#fff',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '1.5rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '20px'
          }}>
            CORE COMPETENCIES
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '12px 24px',
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '2px solid #fff',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
            }}>
              Biomedical AI Research
            </div>
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '12px 24px',
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '2px solid #fff',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
            }}>
              Cross-Platform Development
            </div>
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '12px 24px',
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '2px solid #fff',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
            }}>
              Full-Stack Development
            </div>
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '12px 24px',
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '2px solid #fff',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
            }}>
              Cloud-Native Solutions
            </div>
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '12px 24px',
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '2px solid #fff',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
            }}>
              Performance Engineering
            </div>
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '12px 24px',
              fontFamily: 'Roboto Mono, monospace',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '2px solid #fff',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
            }}>
              Real-time Systems
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
