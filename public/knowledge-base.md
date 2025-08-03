# Jinfeng He - Knowledge Base

## Personal Information

**Name:** Jinfeng He  
**Location:** Ithaca, USA  
**Education:** Master of Engineering, Cornell University  
**Email:** jeffreyhe406@gmail.com  
**Phone:** (+1) 607-280-7880  
**LinkedIn:** https://www.linkedin.com/in/jinfeng-he-142080302  
**GitHub:** https://github.com/GGCav  

## Professional Summary

Jinfeng He is a passionate full-stack developer and researcher currently pursuing his Master of Engineering at Cornell University. He specializes in building innovative solutions that bridge the gap between cutting-edge technology and real-world applications. His expertise spans across biomedical AI research, distributed systems architecture, and cross-platform development.

## Work Experience

### Montaura.tech - Founder & Full-Stack Developer
**Period:** July 2025 - Present  
**Location:** China (remote)  
**Role:** Founder & Full-Stack Developer

**Key Achievements:**
- Engineered a full-stack cross-platform basketball-court-focused application using Flutter and Go
- Implemented Riverpod state management for efficient app state handling
- Built RESTful APIs using Gin framework deployed in Dockerized environment on Alibaba Cloud
- Served over 10,000 daily active users with high performance and reliability
- Implemented low-latency, real-time interactive features including live court check-ins and instant messaging
- Developed dynamic game updates using WebSocket-based pub/sub system
- Leveraged PostGIS for efficient geospatial queries to power location-based check-in functionality
- Integrated AMap for geofencing capabilities within defined geographic boundaries

**Technologies Used:** Flutter, Dart, Go, Gin, PostGIS, WebSocket, Docker, Alibaba Cloud, Riverpod, AMap

### Vosyn.AI - Backend/ML Engineer Intern
**Period:** June 2025 - Present  
**Location:** Etobicoke, Canada  
**Role:** Backend/ML Engineer Intern

**Key Achievements:**
- Engineered core component of event-driven video processing pipeline on Google Cloud Platform
- Handled transcription, speaker diarization, and audio segmentation for video content
- Provisioned entire infrastructure as code using Terraform for scalability and reproducibility
- Deployed transcription models (Faster Whisper) and diarization models (NeMo MSDD) on Vertex AI
- Developed temporal alignment algorithm in Python to merge outputs by mapping word-level timestamps to speaker time segments
- Implemented data processing workflow using regex and Pydub to clean transcripts and segment audio
- Improved data quality for downstream translation and Text-to-Speech (TTS) models
- Developed and containerized scalable Python microservice with FastAPI and Docker
- Exposed RESTful API to trigger asynchronous ML inference jobs on Google Cloud Run

**Technologies Used:** Python, FastAPI, GCP, Terraform, Vertex AI, Docker, Faster Whisper, NeMo MSDD, ML/AI Pipelines

### Alibaba Group - Software Engineer Intern
**Period:** December 2023 - February 2024  
**Location:** Hangzhou, China  
**Role:** Software Engineer Intern

**Key Achievements:**
- Owned end-to-end development of new "flash sale" feature from API design to deployment
- Implemented PostgreSQL GiST index to accelerate complex geospatial-temporal queries by 40%
- Engineered Redis cache-aside layer to handle high-throughput reads and reduce database load
- Enhanced service observability by instrumenting application with custom Micrometer metrics
- Developed Counters for promotion redemption events and Timers for API endpoint performance
- Created Grafana dashboard to visualize metrics and track critical KPIs like P99 latency and error rates
- Proactively addressed post-launch performance issues and optimized system efficiency

**Technologies Used:** Java, Spring Boot, PostgreSQL, Redis, Micrometer, Grafana, Performance Optimization

### USoustenir - Startup Co-founder & Lead Full-Stack Developer
**Period:** April 2023 - December 2023  
**Location:** Scarborough, Canada  
**Role:** Startup Co-founder & Lead Full-Stack Developer

**Key Achievements:**
- Co-founded and developed scalable web application using React with Redux for state management
- Built platform connecting users with sustainable brands using TypeScript, Node.js, and Express.js
- Managed data storage using MongoDB with Mongoose ODM for efficient data modeling
- Deployed backend on AWS EC2 instances behind AWS Application Load Balancer
- Utilized Auto Scaling Groups for dynamic scaling based on traffic demands
- Implemented interactive map using Mapbox GL JS and GeoJSON for location-based features
- Integrated geospatial queries with MongoDB's 2dsphere indexes to visualize local recycling facilities
- Deployed frontend using AWS Amplify and configured AWS CloudFront CDN for global content delivery
- Enhanced load times and user experience through optimized content delivery

**Technologies Used:** React, Redux, Node.js, TypeScript, MongoDB, AWS, Mapbox, Express.js, Mongoose

## Research Projects

### REBL: Enhanced Chemical-Disease Relation Extraction
**Type:** Research Project  
**Repository:** https://github.com/GGCav/REBL  
**Status:** Published Research

**Project Description:**
Developed an advanced transformer-based system for extracting chemical-induced disease (CID) relations from biomedical literature. This project addresses key limitations of existing models through knowledge integration and document-level processing.

**Key Innovations:**
- Enhanced BioBERT with Comparative Toxicogenomics Database (CTD) integration
- Implemented Longformer architecture for extended context windows (4,096 tokens)
- Engineered sophisticated recall optimization techniques including focal loss and class weighting
- Achieved 10.33% absolute F1 score improvement over baseline BioBERT
- Implemented comprehensive data augmentation pipeline with entity swapping and synonym replacement
- Built robust evaluation framework with ablation studies and detailed error analysis

**Performance Results:**
- Precision: 68.70%
- Recall: 51.20%
- F1 Score: 58.70%
- 39.47% reduction in total errors
- 56.80% reduction in implicit relation errors

**Technologies Used:** Python, PyTorch, BioBERT, Longformer, Transformers, NLP, Biomedical AI, Knowledge Graphs

### Multi-Modal Clinical RAG System
**Type:** Research Project  
**Repository:** https://github.com/GGCav/mcrag-system  
**Status:** Advanced Research Implementation

**Project Description:**
Designed and implemented a multi-modal retrieval framework processing clinical guidelines, research papers, and electronic health records for healthcare decision support.

**Key Features:**
- Engineered four distinct retrieval strategies (similarity-based, diversity-focused, evidence-level, and random)
- Integrated large language models (LLaMA2/MedLLaMA) with clinical domain-adapted embeddings (ClinicalBERT)
- Implemented comprehensive evaluation framework with 5-fold cross-validation
- Processed large-scale clinical datasets (MIMIC-III/IV, PubMed literature) with metadata enrichment
- Developed citation management system ensuring traceability of recommendations
- Built strict data hygiene protocols to prevent overfitting

**Technologies Used:** Python, PyTorch, Hugging Face, LLaMA2, ClinicalBERT, MIMIC-III/IV, RAG

## Technical Projects

### Warehouse Management System
**Type:** High-Performance System  
**Status:** Production-Ready Implementation

**Project Description:**
Architected and developed a high-performance, distributed warehouse management system using C++14 with advanced multi-threading and concurrency control mechanisms.

**Key Features:**
- Implemented microservices architecture with gRPC for efficient inter-service communication
- Enabled real-time inventory tracking and order processing across multiple warehouse locations
- Designed custom thread pool with work-stealing algorithms achieving 40% performance improvement
- Built robust transaction management system with ACID compliance using optimistic locking
- Integrated with external logistics APIs and implemented sophisticated caching layer using Redis
- Deployed using Docker containers orchestrated by Kubernetes with horizontal pod autoscaling
- Implemented comprehensive monitoring and alerting using Prometheus and Grafana

**Technologies Used:** C++14, gRPC, Docker, Kubernetes, Multi-threading, Redis, Prometheus, Grafana

### Webtama
**Type:** Real-time Gaming Backend  
**Status:** Production Implementation

**Project Description:**
Engineered sophisticated real-time gaming backend system in Go for strategic board game Onitama, featuring 3D interactive board interface.

**Key Features:**
- Implemented advanced concurrency primitives including goroutines, channels, and mutexes
- Handled thousands of concurrent game sessions with sub-100ms latency
- Built custom game state management system using finite state machines for rule compliance
- Developed WebSocket-based real-time communication layer with automatic reconnection handling
- Implemented sophisticated matchmaking algorithm considering player skill levels and geographic proximity
- Created comprehensive game analytics system tracking player behavior and performance metrics
- Designed scalable architecture with horizontal scaling capabilities and load balancing
- Integrated with external authentication services and implemented rate limiting for fair gameplay

**Technologies Used:** Go, WebSocket, Real-time, Game Logic, Concurrency, Finite State Machines, Analytics, Load Balancing

## Technical Skills

### Programming Languages
- **Python:** Advanced proficiency in AI/ML, data processing, web development
- **Java:** Enterprise development, Spring Boot, microservices architecture
- **C++14:** High-performance computing, system programming, concurrency
- **Go:** Backend development, microservices, real-time applications
- **JavaScript/TypeScript:** Full-stack development, React, Node.js
- **Dart:** Cross-platform mobile development with Flutter
- **SQL:** Database design, optimization, complex queries
- **Shell/Bash:** System administration, automation, DevOps
- **HTML/CSS:** Frontend development, responsive design
- **Rust:** Systems programming, performance-critical applications
- **Scala:** Functional programming, big data processing
- **R:** Statistical analysis, data science

### AI & Machine Learning
- **PyTorch:** Deep learning, neural networks, custom model development
- **TensorFlow:** Machine learning, model training, deployment
- **Transformers:** Natural language processing, pre-trained models
- **BioBERT:** Biomedical text processing, domain-specific NLP
- **Longformer:** Long document processing, attention mechanisms
- **LLaMA2:** Large language models, text generation
- **ClinicalBERT:** Clinical text analysis, medical NLP
- **Hugging Face:** Model hub, transformers library, fine-tuning
- **Scikit-learn:** Traditional machine learning, data preprocessing
- **NLTK:** Natural language processing, text analysis
- **SpaCy:** Industrial-strength NLP, entity recognition
- **Faster Whisper:** Speech recognition, transcription
- **NeMo MSDD:** Speaker diarization, audio processing
- **Vertex AI:** Google Cloud ML platform, model deployment

### Frontend & UI/UX
- **React.js:** Component-based UI development, state management
- **Redux:** State management, predictable state container
- **TypeScript:** Type-safe JavaScript development
- **Vue.js:** Progressive JavaScript framework
- **Flutter:** Cross-platform mobile development
- **Material-UI:** React component library
- **Tailwind CSS:** Utility-first CSS framework
- **Responsive Design:** Mobile-first, adaptive layouts
- **Progressive Web Apps:** Offline functionality, app-like experience
- **Mapbox GL JS:** Interactive mapping, geospatial visualization

### Backend & APIs
- **Spring Boot:** Java microservices, enterprise applications
- **Node.js:** JavaScript runtime, server-side development
- **Express.js:** Web application framework for Node.js
- **FastAPI:** Modern Python web framework, high performance
- **Gin:** Go web framework, high-performance APIs
- **gRPC:** High-performance RPC framework
- **REST APIs:** Standard web service architecture
- **GraphQL:** Query language for APIs
- **WebSocket:** Real-time bidirectional communication
- **Microservices:** Distributed system architecture
- **Micrometer:** Application metrics, monitoring
- **Observability:** Performance monitoring, debugging

### Databases & Storage
- **PostgreSQL:** Relational database, ACID compliance
- **MongoDB:** NoSQL document database
- **Redis:** In-memory data structure store, caching
- **MySQL:** Relational database management system
- **Elasticsearch:** Search and analytics engine
- **Cassandra:** Distributed NoSQL database
- **HBase:** Distributed, scalable big data store
- **Neo4j:** Graph database, relationship modeling
- **InfluxDB:** Time series database
- **Vector Databases:** Embedding storage, similarity search
- **PostGIS:** Geospatial database extension
- **Geospatial Databases:** Location-based data storage
- **2dsphere Indexes:** MongoDB geospatial indexing

### Cloud & Infrastructure
- **AWS:** Amazon Web Services, cloud computing
- **GCP:** Google Cloud Platform, cloud services
- **Alibaba Cloud:** Cloud computing platform
- **Docker:** Containerization, application packaging
- **Kubernetes:** Container orchestration, scaling
- **Terraform:** Infrastructure as Code, provisioning
- **Jenkins:** Continuous integration, automation
- **GitLab CI/CD:** DevOps pipeline automation
- **ArgoCD:** GitOps continuous delivery
- **Helm:** Kubernetes package manager
- **AWS EC2:** Elastic Compute Cloud
- **AWS Amplify:** Full-stack development platform
- **AWS CloudFront:** Content delivery network
- **AWS Application Load Balancer:** Traffic distribution
- **Google Cloud Run:** Serverless container platform
- **Vertex AI:** Machine learning platform
- **Cloud Storage:** Object storage services

### DevOps & Monitoring
- **Prometheus:** Monitoring system, metrics collection
- **Grafana:** Data visualization, dashboards
- **ELK Stack:** Log management, analytics
- **Jaeger:** Distributed tracing, observability
- **Istio:** Service mesh, traffic management
- **Ansible:** Configuration management, automation
- **Puppet:** Infrastructure automation
- **Vault:** Secrets management, security
- **Consul:** Service discovery, configuration
- **Service Mesh:** Microservices communication
- **Micrometer:** Application metrics
- **Custom Metrics:** Business-specific monitoring
- **Performance Dashboards:** Real-time system monitoring
- **Error Tracking:** Application error monitoring

### Distributed Systems
- **High Performance Computing:** Parallel processing, optimization
- **Concurrency Control:** Thread safety, synchronization
- **Load Balancing:** Traffic distribution, high availability
- **Database Sharding:** Horizontal scaling, data partitioning
- **Event-Driven Architecture:** Asynchronous processing
- **Message Queues:** Reliable message delivery
- **Caching Strategies:** Performance optimization
- **Auto Scaling Groups:** Dynamic resource allocation
- **Horizontal Scaling:** System capacity expansion
- **Distributed Caching:** Shared cache across services

### Geospatial & Location Services
- **PostGIS:** Geospatial database extension
- **Mapbox GL JS:** Interactive mapping library
- **GeoJSON:** Geographic data format
- **Geospatial Queries:** Location-based data retrieval
- **Location-based Services:** GPS, positioning
- **Geofencing:** Geographic boundary detection
- **AMap Integration:** Chinese mapping services
- **2dsphere Indexes:** MongoDB geospatial indexing
- **Spatial Data Processing:** Geographic data analysis
- **Real-time Location Tracking:** Live position updates

### Security & Compliance
- **OAuth 2.0:** Authorization framework
- **JWT:** JSON Web Tokens, authentication
- **HTTPS/TLS:** Secure communication protocols
- **Data Encryption:** Information security
- **HIPAA Compliance:** Healthcare data protection
- **GDPR:** Data privacy regulation compliance
- **Security Auditing:** Vulnerability assessment
- **Penetration Testing:** Security testing
- **Zero Trust Architecture:** Security model

### Data Engineering
- **Apache Spark:** Big data processing
- **Apache Airflow:** Workflow orchestration
- **ETL Pipelines:** Data extraction, transformation, loading
- **Data Warehousing:** Centralized data storage
- **Real-time Streaming:** Live data processing
- **Data Lake:** Raw data storage
- **Feature Engineering:** ML feature preparation
- **MLOps:** Machine learning operations
- **Video Processing:** Multimedia data handling
- **Audio Segmentation:** Sound data analysis
- **Speaker Diarization:** Voice identification
- **Transcription:** Speech-to-text conversion

### Specialized Expertise
- **System Architecture Design:** Scalable system planning
- **Performance Optimization:** Speed and efficiency improvement
- **Scalability Engineering:** System growth planning
- **Real-time Systems:** Immediate response systems
- **Game Development:** Interactive entertainment software
- **Biomedical Informatics:** Healthcare technology
- **Clinical Decision Support:** Medical assistance systems
- **Flash Sale Systems:** High-traffic e-commerce
- **High-throughput Processing:** Large-scale data handling
- **Database Optimization:** Query performance tuning
- **GiST Indexes:** PostgreSQL spatial indexing

## Education

### Cornell University
**Degree:** Master of Engineering  
**Field:** Systems Engineering  
**Location:** Ithaca, USA  
**Status:** Currently Enrolled

**Specializations:**
- Systems Engineering
- Biomedical AI Research
- Distributed Systems
- Performance Engineering

**Research Contributions:**
- Advanced transformer-based chemical-disease relation extraction
- Multi-modal clinical retrieval systems
- Biomedical natural language processing
- Healthcare decision support systems

## Personal Background

### Professional Philosophy
Jinfeng believes that exceptional software development combines technical excellence with creative problem-solving. His approach emphasizes understanding business requirements while introducing innovative technical solutions that not only meet expectations but exceed them. He's passionate about creating systems that provide real value and positive impact through well-architected, scalable solutions.

### Leadership Experience
As a startup co-founder and technical leader, Jinfeng has demonstrated the ability to architect scalable solutions from concept to deployment. His experience includes founding Montaura.tech, a basketball-focused cross-platform application serving 10,000+ daily users, and co-founding USoustenir, a sustainable fashion platform connecting users with eco-friendly brands.

### Technical Approach
Jinfeng's expertise spans across biomedical AI research, distributed systems architecture, and cross-platform development. He's led the development of advanced systems including a multi-modal clinical RAG system for healthcare decision support, enhanced transformer-based chemical-disease relation extraction, and high-performance warehouse management systems serving thousands of concurrent users.

## Personal Interests

### Fitness & Sports
- **Working Out:** Fitness enthusiast focused on strength training and maintaining a healthy lifestyle
- **Basketball:** Passionate basketball player and fan, which inspired the creation of Montaura.tech startup

### Entertainment & Media
- **Movies:** Avid movie watcher, especially sci-fi, action, and thought-provoking films
- **Games:** Gaming enthusiast, particularly strategic and competitive games
- **Anime:** Anime fan, appreciating storytelling and artistic expression

### Travel & Culture
- **Travel:** Love exploring new cultures, cuisines, and experiences around the world
- **Jubensha:** Enthusiast of Chinese mystery role-playing games and interactive storytelling

## Contact Information

### Professional Contact
- **Email:** jeffreyhe406@gmail.com
- **Phone:** (+1) 607-280-7880
- **LinkedIn:** https://www.linkedin.com/in/jinfeng-he-142080302
- **GitHub:** https://github.com/GGCav

### Location
- **Current:** Ithaca, USA
- **University:** Cornell University
- **Timezone:** Eastern Time (ET)

## Technical Achievements

### Performance Improvements
- **40% query performance improvement** at Alibaba Group through PostgreSQL GiST index optimization
- **10.33% F1 score improvement** in REBL research project over baseline BioBERT
- **39.47% reduction in total errors** in biomedical relation extraction
- **56.80% reduction in implicit relation errors** through advanced NLP techniques

### Scale & Impact
- **10,000+ daily active users** served by Montaura.tech basketball application
- **1,500 PubMed abstracts** processed in REBL research project
- **4,409 chemicals and 5,818 diseases** analyzed in biomedical research
- **Thousands of concurrent game sessions** handled by Webtama gaming backend

### Research Contributions
- **Published research** on enhanced transformer-based chemical-disease relation extraction
- **Advanced biomedical NLP** techniques for healthcare applications
- **Multi-modal clinical systems** for decision support
- **Knowledge graph integration** with transformer models

## Project Repositories

### Research Projects
- **REBL:** https://github.com/GGCav/REBL
- **Multi-Modal Clinical RAG:** https://github.com/GGCav/mcrag-system

### Technical Projects
- **Warehouse Management System:** High-performance C++ implementation
- **Webtama:** Real-time gaming backend in Go
- **Montaura.tech:** Cross-platform basketball application
- **USoustenir:** Sustainable fashion platform

## Professional Development

### Continuous Learning
Jinfeng maintains a strong commitment to continuous learning and staying current with emerging technologies. His research work demonstrates ongoing engagement with cutting-edge AI/ML techniques, while his practical projects showcase application of modern software engineering principles.

### Industry Engagement
Through his work at major tech companies (Alibaba Group) and innovative startups (Vosyn.AI, Montaura.tech, USoustenir), Jinfeng has gained diverse experience across different industry sectors and company sizes.

### Academic Excellence
His research contributions at Cornell University demonstrate strong academic capabilities and the ability to bridge theoretical knowledge with practical applications in real-world systems. 