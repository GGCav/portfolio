// components/Projects.js
import React from 'react';
import { FaWarehouse, FaGamepad, FaBrain, FaGithub, FaFlask } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: "REBL: Enhanced Chemical-Disease Relation Extraction",
      icon: <FaFlask />,
      description: "Developed an advanced transformer-based system for extracting chemical-induced disease (CID) relations from biomedical literature, addressing key limitations of existing models through knowledge integration and document-level processing. Enhanced BioBERT with Comparative Toxicogenomics Database (CTD) integration, implementing Longformer architecture for extended context windows (4,096 tokens) to handle cross-sentence relations. Engineered sophisticated recall optimization techniques including focal loss, class weighting, and dynamic threshold tuning, achieving 10.33% absolute F1 score improvement over baseline BioBERT. Implemented comprehensive data augmentation pipeline with entity swapping, synonym replacement, and CTD-based weak supervision. Built robust evaluation framework with ablation studies and detailed error analysis, achieving 68.70% precision, 51.20% recall, and 58.70% F1 score on the BioCreative V CDR corpus. Processed 1,500 PubMed abstracts with 4,409 chemicals and 5,818 diseases, demonstrating 39.47% reduction in total errors and 56.80% reduction in implicit relation errors.",
      tech: ["Python", "PyTorch", "BioBERT", "Longformer", "Transformers", "NLP", "Biomedical AI", "Knowledge Graphs"],
      github: "https://github.com/GGCav/REBL"
    },
    {
      title: "Multi-Modal Clinical RAG System",
      icon: <FaBrain />,
      description: "Designed and implemented a multi-modal retrieval framework processing clinical guidelines, research papers, and electronic health records using Python, PyTorch, and Hugging Face Transformers. Engineered four distinct retrieval strategies (similarity-based, diversity-focused, evidence-level, and random) optimized for clinical contexts. Integrated large language models (LLaMA2/MedLLaMA) with clinical domain-adapted embeddings (ClinicalBERT) for generating clinically valid recommendations. Implemented comprehensive evaluation framework with 5-fold cross-validation and strict data hygiene protocols to prevent overfitting. Processed and chunked large-scale clinical datasets (MIMIC-III/IV, PubMed literature) with metadata enrichment for improved retrieval accuracy. Developed citation management system ensuring traceability of recommendations to authoritative clinical guidelines.",
      tech: ["Python", "PyTorch", "Hugging Face", "LLaMA2", "ClinicalBERT", "MIMIC-III/IV", "RAG"],
      github: "https://github.com/GGCav/mcrag-system"
    },
    {
      title: "Warehouse Management System",
      icon: <FaWarehouse />,
      description: "Architected and developed a high-performance, distributed warehouse management system using C++14 with advanced multi-threading and concurrency control mechanisms. Implemented a microservices architecture with gRPC for efficient inter-service communication, enabling real-time inventory tracking and order processing across multiple warehouse locations. Designed a custom thread pool with work-stealing algorithms to handle concurrent operations, achieving 40% performance improvement over traditional approaches. Built a robust transaction management system with ACID compliance using optimistic locking and conflict resolution strategies. Integrated with external logistics APIs and implemented a sophisticated caching layer using Redis for frequently accessed inventory data. Deployed the system using Docker containers orchestrated by Kubernetes, with horizontal pod autoscaling based on CPU and memory metrics. Implemented comprehensive monitoring and alerting using Prometheus and Grafana for real-time system health tracking.",
      tech: ["C++14", "gRPC", "Docker", "Kubernetes", "Multi-threading", "Redis", "Prometheus", "Grafana"]
    },
    {
      title: "Webtama",
      icon: <FaGamepad />,
      description: "Engineered a sophisticated real-time gaming backend system in Go (Golang) for the strategic board game Onitama, featuring a 3D interactive board interface. Implemented advanced concurrency primitives including goroutines, channels, and mutexes to handle thousands of concurrent game sessions with sub-100ms latency. Built a custom game state management system using finite state machines to ensure game rule compliance and prevent invalid moves. Developed a WebSocket-based real-time communication layer with automatic reconnection handling and message queuing for reliable gameplay. Implemented a sophisticated matchmaking algorithm considering player skill levels, wait times, and geographic proximity for optimal game pairing. Created a comprehensive game analytics system tracking player behavior, game outcomes, and performance metrics for continuous improvement. Designed a scalable architecture with horizontal scaling capabilities, load balancing, and database sharding to support growing user base. Integrated with external authentication services and implemented rate limiting to prevent abuse and ensure fair gameplay.",
      tech: ["Go", "WebSocket", "Real-time", "Game Logic", "Concurrency", "Finite State Machines", "Analytics", "Load Balancing"]
    }
  ];

  return (
    <div className="manga-container">
      <div className="projects-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / 3' }}>
        <h2 className="about-title">PROJECTS</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '30px'
        }}>
          {projects.map((project, index) => (
            <div key={index} className="project-item" style={{
              background: '#fff',
              border: '3px solid #000',
              padding: '25px',
              position: 'relative',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: project.github ? 'pointer' : 'default',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              if (project.github) {
                window.open(project.github, '_blank', 'noopener,noreferrer');
              }
            }}
            onMouseEnter={(e) => {
              if (project.github) {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (project.github) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div className="project-icon" style={{ fontSize: '3rem', textAlign: 'center' }}>
                {project.icon}
                </div>
                {project.github && (
                  <div style={{ fontSize: '1.5rem', color: '#000' }}>
                    <FaGithub />
                  </div>
                )}
              </div>
              <div className="project-title" style={{ 
                fontSize: '1.2rem', 
                marginBottom: '15px',
                textAlign: 'center',
                fontFamily: 'Orbitron, monospace',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                {project.title}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                lineHeight: '1.6',
                marginBottom: '20px',
                flex: '1'
              }}>
                {project.description}
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center'
              }}>
                {project.tech.map((tech, techIndex) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
