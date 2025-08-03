const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { SupabaseVectorStore } = require('@langchain/community/vectorstores/supabase');
const { Document } = require('langchain/document');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004", // Free Google embedding model
});

// Knowledge base chunks from your comprehensive data
const knowledgeChunks = [
  // Personal Information - Complete Details
  {
    id: 1,
    content: "I'm Jinfeng He, a passionate full-stack developer and researcher currently pursuing my Master of Engineering at Cornell University in Ithaca, USA. My email is jeffreyhe406@gmail.com, phone is (+1) 607-280-7880. I'm active on LinkedIn at https://www.linkedin.com/in/jinfeng-he-142080302 and GitHub at https://github.com/GGCav. I specialize in building innovative solutions that bridge the gap between cutting-edge technology and real-world applications, with expertise spanning across biomedical AI research, distributed systems architecture, and cross-platform development.",
    category: "personal",
    keywords: ["jinFeng", "he", "developer", "researcher", "cornell", "university", "full-stack", "ithaca", "master", "engineering", "jeffreyhe406", "linkedin", "github", "ggcav", "phone", "email"]
  },
  
  // Professional Summary - Complete
  {
    id: 2,
    content: "I'm a passionate full-stack developer and researcher currently pursuing my Master of Engineering at Cornell University. I specialize in building innovative solutions that bridge the gap between cutting-edge technology and real-world applications. My expertise spans across biomedical AI research, distributed systems architecture, and cross-platform development. I believe that exceptional software development combines technical excellence with creative problem-solving, emphasizing understanding business requirements while introducing innovative technical solutions that not only meet expectations but exceed them.",
    category: "summary",
    keywords: ["passionate", "full-stack", "developer", "researcher", "cornell", "university", "innovative", "solutions", "biomedical", "ai", "distributed", "systems", "cross-platform", "excellence", "problem-solving", "business", "requirements"]
  },
  
  // Montaura.tech Experience - Complete Details
  {
    id: 3,
    content: "At Montaura.tech, I'm the Founder & Full-Stack Developer (July 2025 - Present) in China (remote). I engineered a full-stack cross-platform basketball-court-focused application using Flutter and Go. We've served over 10,000 daily active users with high performance and reliability. I implemented Riverpod state management for efficient app state handling, built RESTful APIs using Gin framework deployed in Dockerized environment on Alibaba Cloud. I developed low-latency, real-time interactive features including live court check-ins and instant messaging, dynamic game updates using WebSocket-based pub/sub system, leveraged PostGIS for efficient geospatial queries to power location-based check-in functionality, and integrated AMap for geofencing capabilities within defined geographic boundaries.",
    category: "experience",
    keywords: ["montaura", "founder", "full-stack", "developer", "july", "2025", "present", "china", "remote", "flutter", "go", "basketball", "10000", "daily", "active", "users", "riverpod", "gin", "alibaba", "cloud", "websocket", "postgis", "geospatial", "amap", "geofencing"]
  },
  
  // Vosyn.AI Experience - Complete Details
  {
    id: 4,
    content: "I'm currently working as a Backend/ML Engineer Intern at Vosyn.AI (June 2025 - Present) in Etobicoke, Canada. I engineered the core component of an event-driven video processing pipeline on Google Cloud Platform, handling transcription, speaker diarization, and audio segmentation for video content. I provisioned entire infrastructure as code using Terraform for scalability and reproducibility, deployed transcription models (Faster Whisper) and diarization models (NeMo MSDD) on Vertex AI, developed temporal alignment algorithm in Python to merge outputs by mapping word-level timestamps to speaker time segments, implemented data processing workflow using regex and Pydub to clean transcripts and segment audio, improved data quality for downstream translation and Text-to-Speech (TTS) models, developed and containerized scalable Python microservice with FastAPI and Docker, and exposed RESTful API to trigger asynchronous ML inference jobs on Google Cloud Run.",
    category: "experience",
    keywords: ["vosyn", "backend", "ml", "engineer", "intern", "june", "2025", "present", "etobicoke", "canada", "video", "processing", "pipeline", "gcp", "transcription", "speaker", "diarization", "audio", "segmentation", "terraform", "faster", "whisper", "nemo", "msdd", "vertex", "ai", "temporal", "alignment", "python", "regex", "pydub", "tts", "fastapi", "docker", "cloud", "run"]
  },
  
  // Alibaba Group Experience - Complete Details
  {
    id: 5,
    content: "During my internship at Alibaba Group (December 2023 - February 2024) in Hangzhou, China as a Software Engineer Intern, I owned end-to-end development of new 'flash sale' feature from API design to deployment. I implemented PostgreSQL GiST index to accelerate complex geospatial-temporal queries by 40%, engineered Redis cache-aside layer to handle high-throughput reads and reduce database load, enhanced service observability by instrumenting application with custom Micrometer metrics, developed Counters for promotion redemption events and Timers for API endpoint performance, created Grafana dashboard to visualize metrics and track critical KPIs like P99 latency and error rates, and proactively addressed post-launch performance issues and optimized system efficiency.",
    category: "experience",
    keywords: ["alibaba", "group", "software", "engineer", "intern", "december", "2023", "february", "2024", "hangzhou", "china", "flash", "sale", "postgresql", "gist", "index", "40%", "redis", "cache", "micrometer", "grafana", "p99", "latency", "performance"]
  },
  
  // USoustenir Experience - Complete Details
  {
    id: 6,
    content: "I co-founded USoustenir (April 2023 - December 2023) in Scarborough, Canada as Startup Co-founder & Lead Full-Stack Developer. I developed scalable web application using React with Redux for state management, built platform connecting users with sustainable brands using TypeScript, Node.js, and Express.js, managed data storage using MongoDB with Mongoose ODM for efficient data modeling, deployed backend on AWS EC2 instances behind AWS Application Load Balancer, utilized Auto Scaling Groups for dynamic scaling based on traffic demands, implemented interactive map using Mapbox GL JS and GeoJSON for location-based features, integrated geospatial queries with MongoDB's 2dsphere indexes to visualize local recycling facilities, deployed frontend using AWS Amplify and configured AWS CloudFront CDN for global content delivery, and enhanced load times and user experience through optimized content delivery.",
    category: "experience",
    keywords: ["usoustenir", "co-founder", "lead", "full-stack", "developer", "april", "2023", "december", "2023", "scarborough", "canada", "react", "redux", "typescript", "node.js", "express", "mongodb", "mongoose", "aws", "ec2", "load", "balancer", "auto", "scaling", "mapbox", "geojson", "2dsphere", "amplify", "cloudfront", "cdn"]
  },
  
  // REBL Research Project - Complete Details
  {
    id: 7,
    content: "My REBL project (Enhanced Chemical-Disease Relation Extraction) is an advanced transformer-based system for extracting chemical-induced disease (CID) relations from biomedical literature, addressing key limitations of existing models through knowledge integration and document-level processing. I enhanced BioBERT with Comparative Toxicogenomics Database (CTD) integration, implemented Longformer architecture for extended context windows (4,096 tokens) to handle cross-sentence relations, engineered sophisticated recall optimization techniques including focal loss, class weighting, and dynamic threshold tuning, achieved 10.33% absolute F1 score improvement over baseline BioBERT, implemented comprehensive data augmentation pipeline with entity swapping, synonym replacement, and CTD-based weak supervision, built robust evaluation framework with ablation studies and detailed error analysis, achieved 68.70% precision, 51.20% recall, and 58.70% F1 score on the BioCreative V CDR corpus, processed 1,500 PubMed abstracts with 4,409 chemicals and 5,818 diseases, demonstrating 39.47% reduction in total errors and 56.80% reduction in implicit relation errors. Repository: https://github.com/GGCav/REBL",
    category: "projects",
    keywords: ["rebl", "chemical", "disease", "relation", "extraction", "transformer", "biomedical", "literature", "cid", "biobert", "ctd", "longformer", "4096", "tokens", "focal", "loss", "10.33%", "f1", "68.70%", "precision", "51.20%", "recall", "58.70%", "1500", "pubmed", "4409", "chemicals", "5818", "diseases", "39.47%", "56.80%", "github", "ggcav"]
  },
  
  // Multi-Modal Clinical RAG System - Complete Details
  {
    id: 8,
    content: "I designed and implemented a Multi-Modal Clinical RAG System that processes clinical guidelines, research papers, and electronic health records for healthcare decision support. I engineered four distinct retrieval strategies (similarity-based, diversity-focused, evidence-level, and random), integrated large language models (LLaMA2/MedLLaMA) with clinical domain-adapted embeddings (ClinicalBERT), implemented comprehensive evaluation framework with 5-fold cross-validation, processed large-scale clinical datasets (MIMIC-III/IV, PubMed literature) with metadata enrichment, developed citation management system ensuring traceability of recommendations, and built strict data hygiene protocols to prevent overfitting. Repository: https://github.com/GGCav/mcrag-system",
    category: "projects",
    keywords: ["multi-modal", "clinical", "rag", "system", "guidelines", "research", "papers", "electronic", "health", "records", "healthcare", "decision", "support", "retrieval", "strategies", "llama2", "medllama", "clinicalbert", "5-fold", "cross-validation", "mimic", "pubmed", "citation", "management", "github", "mcrag"]
  },
  
  // Warehouse Management System - Complete Details
  {
    id: 9,
    content: "I architected and developed a high-performance, distributed warehouse management system using C++14 with advanced multi-threading and concurrency control mechanisms. I implemented microservices architecture with gRPC for efficient inter-service communication, enabled real-time inventory tracking and order processing across multiple warehouse locations, designed custom thread pool with work-stealing algorithms achieving 40% performance improvement, built robust transaction management system with ACID compliance using optimistic locking, integrated with external logistics APIs and implemented sophisticated caching layer using Redis, deployed using Docker containers orchestrated by Kubernetes with horizontal pod autoscaling, and implemented comprehensive monitoring and alerting using Prometheus and Grafana.",
    category: "projects",
    keywords: ["warehouse", "management", "system", "c++14", "multi-threading", "concurrency", "microservices", "grpc", "inventory", "tracking", "order", "processing", "thread", "pool", "work-stealing", "40%", "performance", "acid", "optimistic", "locking", "logistics", "redis", "docker", "kubernetes", "autoscaling", "prometheus", "grafana"]
  },
  
  // Webtama Project - Complete Details
  {
    id: 10,
    content: "I engineered Webtama, a sophisticated real-time gaming backend system in Go for strategic board game Onitama, featuring 3D interactive board interface. I implemented advanced concurrency primitives including goroutines, channels, and mutexes, handled thousands of concurrent game sessions with sub-100ms latency, built custom game state management system using finite state machines for rule compliance, developed WebSocket-based real-time communication layer with automatic reconnection handling, implemented sophisticated matchmaking algorithm considering player skill levels and geographic proximity, created comprehensive game analytics system tracking player behavior and performance metrics, designed scalable architecture with horizontal scaling capabilities and load balancing, and integrated with external authentication services and implemented rate limiting for fair gameplay.",
    category: "projects",
    keywords: ["webtama", "gaming", "backend", "go", "onitama", "3d", "interactive", "board", "goroutines", "channels", "mutexes", "concurrent", "sessions", "sub-100ms", "latency", "finite", "state", "machines", "websocket", "matchmaking", "analytics", "horizontal", "scaling", "load", "balancing", "authentication", "rate", "limiting"]
  },
  
  // Programming Languages Skills - Complete
  {
    id: 11,
    content: "My programming language expertise includes Python (advanced proficiency in AI/ML, data processing, web development), Java (enterprise development, Spring Boot, microservices architecture), C++14 (high-performance computing, system programming, concurrency), Go (backend development, microservices, real-time applications), JavaScript/TypeScript (full-stack development, React, Node.js), Dart (cross-platform mobile development with Flutter), SQL (database design, optimization, complex queries), Shell/Bash (system administration, automation, DevOps), HTML/CSS (frontend development, responsive design), Rust (systems programming, performance-critical applications), Scala (functional programming, big data processing), and R (statistical analysis, data science).",
    category: "skills",
    keywords: ["python", "java", "c++14", "go", "javascript", "typescript", "dart", "sql", "shell", "bash", "html", "css", "rust", "scala", "r", "ai", "ml", "spring", "boot", "microservices", "concurrency", "react", "node.js", "flutter", "database", "devops", "responsive", "design", "functional", "programming", "statistical", "analysis"]
  },
  
  // AI & Machine Learning Skills - Complete
  {
    id: 12,
    content: "My AI & Machine Learning expertise includes PyTorch (deep learning, neural networks, custom model development), TensorFlow (machine learning, model training, deployment), Transformers (natural language processing, pre-trained models), BioBERT (biomedical text processing, domain-specific NLP), Longformer (long document processing, attention mechanisms), LLaMA2 (large language models, text generation), ClinicalBERT (clinical text analysis, medical NLP), Hugging Face (model hub, transformers library, fine-tuning), Scikit-learn (traditional machine learning, data preprocessing), NLTK (natural language processing, text analysis), SpaCy (industrial-strength NLP, entity recognition), Faster Whisper (speech recognition, transcription), NeMo MSDD (speaker diarization, audio processing), and Vertex AI (Google Cloud ML platform, model deployment).",
    category: "skills",
    keywords: ["pytorch", "tensorflow", "transformers", "biobert", "longformer", "llama2", "clinicalbert", "hugging", "face", "scikit-learn", "nltk", "spacy", "faster", "whisper", "nemo", "msdd", "vertex", "ai", "deep", "learning", "neural", "networks", "nlp", "speech", "recognition", "transcription", "diarization"]
  },
  
  // Frontend & UI/UX Skills - Complete
  {
    id: 13,
    content: "My frontend and UI/UX expertise includes React.js (component-based UI development, state management), Redux (state management, predictable state container), TypeScript (type-safe JavaScript development), Vue.js (progressive JavaScript framework), Flutter (cross-platform mobile development), Material-UI (React component library), Tailwind CSS (utility-first CSS framework), Responsive Design (mobile-first, adaptive layouts), Progressive Web Apps (offline functionality, app-like experience), and Mapbox GL JS (interactive mapping, geospatial visualization).",
    category: "skills",
    keywords: ["react.js", "redux", "typescript", "vue.js", "flutter", "material-ui", "tailwind", "css", "responsive", "design", "progressive", "web", "apps", "mapbox", "gl", "js", "component", "state", "management", "mobile", "cross-platform", "geospatial", "visualization"]
  },
  
  // Backend & APIs Skills - Complete
  {
    id: 14,
    content: "My backend and APIs expertise includes Spring Boot (Java microservices, enterprise applications), Node.js (JavaScript runtime, server-side development), Express.js (web application framework for Node.js), FastAPI (modern Python web framework, high performance), Gin (Go web framework, high-performance APIs), gRPC (high-performance RPC framework), REST APIs (standard web service architecture), GraphQL (query language for APIs), WebSocket (real-time bidirectional communication), Microservices (distributed system architecture), Micrometer (application metrics, monitoring), and Observability (performance monitoring, debugging).",
    category: "skills",
    keywords: ["spring", "boot", "node.js", "express.js", "fastapi", "gin", "grpc", "rest", "apis", "graphql", "websocket", "microservices", "micrometer", "observability", "java", "javascript", "python", "go", "rpc", "real-time", "metrics", "monitoring", "debugging"]
  },
  
  // Databases & Storage Skills - Complete
  {
    id: 15,
    content: "My databases and storage expertise includes PostgreSQL (relational database, ACID compliance), MongoDB (NoSQL document database), Redis (in-memory data structure store, caching), MySQL (relational database management system), Elasticsearch (search and analytics engine), Cassandra (distributed NoSQL database), HBase (distributed, scalable big data store), Neo4j (graph database, relationship modeling), InfluxDB (time series database), Vector Databases (embedding storage, similarity search), PostGIS (geospatial database extension), Geospatial Databases (location-based data storage), and 2dsphere Indexes (MongoDB geospatial indexing).",
    category: "skills",
    keywords: ["postgresql", "mongodb", "redis", "mysql", "elasticsearch", "cassandra", "hbase", "neo4j", "influxdb", "vector", "databases", "postgis", "geospatial", "2dsphere", "indexes", "relational", "nosql", "acid", "caching", "search", "analytics", "graph", "time", "series", "embedding", "similarity"]
  },
  
  // Cloud & Infrastructure Skills - Complete
  {
    id: 16,
    content: "My cloud and infrastructure expertise includes AWS (Amazon Web Services, cloud computing), GCP (Google Cloud Platform, cloud services), Alibaba Cloud (cloud computing platform), Docker (containerization, application packaging), Kubernetes (container orchestration, scaling), Terraform (Infrastructure as Code, provisioning), Jenkins (continuous integration, automation), GitLab CI/CD (DevOps pipeline automation), ArgoCD (GitOps continuous delivery), Helm (Kubernetes package manager), AWS EC2 (Elastic Compute Cloud), AWS Amplify (full-stack development platform), AWS CloudFront (content delivery network), AWS Application Load Balancer (traffic distribution), Google Cloud Run (serverless container platform), Vertex AI (machine learning platform), and Cloud Storage (object storage services).",
    category: "skills",
    keywords: ["aws", "gcp", "alibaba", "cloud", "docker", "kubernetes", "terraform", "jenkins", "gitlab", "ci/cd", "argocd", "gitops", "helm", "ec2", "amplify", "cloudfront", "load", "balancer", "cloud", "run", "vertex", "ai", "storage", "containerization", "orchestration", "scaling", "infrastructure", "code", "automation"]
  },
  
  // DevOps & Monitoring Skills - Complete
  {
    id: 17,
    content: "My DevOps and monitoring expertise includes Prometheus (monitoring system, metrics collection), Grafana (data visualization, dashboards), ELK Stack (log management, analytics), Jaeger (distributed tracing, observability), Istio (service mesh, traffic management), Ansible (configuration management, automation), Puppet (infrastructure automation), Vault (secrets management, security), Consul (service discovery, configuration), Service Mesh (microservices communication), Micrometer (application metrics), Custom Metrics (business-specific monitoring), Performance Dashboards (real-time system monitoring), and Error Tracking (application error monitoring).",
    category: "skills",
    keywords: ["prometheus", "grafana", "elk", "stack", "jaeger", "istio", "ansible", "puppet", "vault", "consul", "service", "mesh", "micrometer", "custom", "metrics", "performance", "dashboards", "error", "tracking", "monitoring", "visualization", "tracing", "observability", "automation", "secrets", "management"]
  },
  
  // Distributed Systems Skills - Complete
  {
    id: 18,
    content: "My distributed systems expertise includes High Performance Computing (parallel processing, optimization), Concurrency Control (thread safety, synchronization), Load Balancing (traffic distribution, high availability), Database Sharding (horizontal scaling, data partitioning), Event-Driven Architecture (asynchronous processing), Message Queues (reliable message delivery), Caching Strategies (performance optimization), Auto Scaling Groups (dynamic resource allocation), Horizontal Scaling (system capacity expansion), and Distributed Caching (shared cache across services).",
    category: "skills",
    keywords: ["high", "performance", "computing", "concurrency", "control", "load", "balancing", "database", "sharding", "event-driven", "architecture", "message", "queues", "caching", "strategies", "auto", "scaling", "groups", "horizontal", "scaling", "distributed", "caching", "parallel", "processing", "optimization", "thread", "safety", "synchronization"]
  },
  
  // Geospatial & Location Services Skills - Complete
  {
    id: 19,
    content: "My geospatial and location services expertise includes PostGIS (geospatial database extension), Mapbox GL JS (interactive mapping library), GeoJSON (geographic data format), Geospatial Queries (location-based data retrieval), Location-based Services (GPS, positioning), Geofencing (geographic boundary detection), AMap Integration (Chinese mapping services), 2dsphere Indexes (MongoDB geospatial indexing), Spatial Data Processing (geographic data analysis), and Real-time Location Tracking (live position updates).",
    category: "skills",
    keywords: ["postgis", "mapbox", "gl", "js", "geojson", "geospatial", "queries", "location-based", "services", "gps", "positioning", "geofencing", "amap", "integration", "2dsphere", "indexes", "spatial", "data", "processing", "real-time", "location", "tracking", "geographic", "boundary", "detection"]
  },
  
  // Security & Compliance Skills - Complete
  {
    id: 20,
    content: "My security and compliance expertise includes OAuth 2.0 (authorization framework), JWT (JSON Web Tokens, authentication), HTTPS/TLS (secure communication protocols), Data Encryption (information security), HIPAA Compliance (healthcare data protection), GDPR (data privacy regulation compliance), Security Auditing (vulnerability assessment), Penetration Testing (security testing), and Zero Trust Architecture (security model).",
    category: "skills",
    keywords: ["oauth", "2.0", "jwt", "https", "tls", "data", "encryption", "hipaa", "compliance", "gdpr", "security", "auditing", "penetration", "testing", "zero", "trust", "architecture", "authorization", "authentication", "secure", "communication", "privacy", "vulnerability", "assessment"]
  },
  
  // Data Engineering Skills - Complete
  {
    id: 21,
    content: "My data engineering expertise includes Apache Spark (big data processing), Apache Airflow (workflow orchestration), ETL Pipelines (data extraction, transformation, loading), Data Warehousing (centralized data storage), Real-time Streaming (live data processing), Data Lake (raw data storage), Feature Engineering (ML feature preparation), MLOps (machine learning operations), Video Processing (multimedia data handling), Audio Segmentation (sound data analysis), Speaker Diarization (voice identification), and Transcription (speech-to-text conversion).",
    category: "skills",
    keywords: ["apache", "spark", "airflow", "etl", "pipelines", "data", "warehousing", "real-time", "streaming", "data", "lake", "feature", "engineering", "mlops", "video", "processing", "audio", "segmentation", "speaker", "diarization", "transcription", "big", "data", "workflow", "orchestration", "speech-to-text"]
  },
  
  // Education - Complete Details
  {
    id: 22,
    content: "I'm currently pursuing my Master of Engineering at Cornell University in Ithaca, USA, specializing in Systems Engineering. My research contributions include advanced transformer-based chemical-disease relation extraction, multi-modal clinical retrieval systems, biomedical natural language processing, and healthcare decision support systems. I've demonstrated strong academic performance with research contributions in biomedical AI and distributed systems, focusing on advanced transformer-based systems, multi-modal clinical retrieval, and healthcare decision support systems.",
    category: "education",
    keywords: ["cornell", "university", "master", "engineering", "ithaca", "usa", "systems", "engineering", "research", "transformer", "chemical", "disease", "multi-modal", "clinical", "biomedical", "nlp", "healthcare", "decision", "support", "academic", "performance"]
  },
  
  // Personal Background - Complete
  {
    id: 23,
    content: "My professional philosophy is that exceptional software development combines technical excellence with creative problem-solving. My approach emphasizes understanding business requirements while introducing innovative technical solutions that not only meet expectations but exceed them. I'm passionate about creating systems that provide real value and positive impact through well-architected, scalable solutions. As a startup co-founder and technical leader, I've demonstrated the ability to architect scalable solutions from concept to deployment, including founding Montaura.tech serving 10,000+ daily users and co-founding USoustenir sustainable fashion platform. My technical approach spans across biomedical AI research, distributed systems architecture, and cross-platform development.",
    category: "background",
    keywords: ["philosophy", "excellence", "problem-solving", "business", "requirements", "innovative", "technical", "solutions", "value", "impact", "scalable", "startup", "co-founder", "technical", "leader", "architect", "deployment", "montaura", "usoustenir", "biomedical", "ai", "distributed", "systems"]
  },
  
  // Personal Interests - Complete Details
  {
    id: 24,
    content: "My personal interests include fitness and sports - I'm a fitness enthusiast focused on strength training and maintaining a healthy lifestyle, and I'm passionate about basketball (which actually inspired my Montaura.tech startup). I love entertainment and media - I'm an avid movie watcher, especially sci-fi, action, and thought-provoking films, a gaming enthusiast particularly strategic and competitive games, and an anime fan appreciating storytelling and artistic expression. I enjoy travel and culture - I love exploring new cultures, cuisines, and experiences around the world, and I'm an enthusiast of Chinese mystery role-playing games (Jubensha) and interactive storytelling. These interests help me maintain work-life balance and often inspire creative solutions in my technical work.",
    category: "interests",
    keywords: ["fitness", "sports", "strength", "training", "healthy", "lifestyle", "basketball", "montaura", "startup", "movies", "sci-fi", "action", "thought-provoking", "gaming", "strategic", "competitive", "anime", "storytelling", "artistic", "expression", "travel", "culture", "cuisines", "jubensha", "role-playing", "work-life", "balance", "creative", "solutions"]
  },
  
  // Contact Information - Complete
  {
    id: 25,
    content: "You can reach me at jeffreyhe406@gmail.com or call me at (+1) 607-280-7880. I'm also active on LinkedIn at https://www.linkedin.com/in/jinfeng-he-142080302 and GitHub at https://github.com/GGCav. I'm currently located in Ithaca, USA at Cornell University in the Eastern Time (ET) timezone. I love connecting with fellow developers and researchers!",
    category: "contact",
    keywords: ["email", "jeffreyhe406", "phone", "607-280-7880", "linkedin", "jinfeng-he-142080302", "github", "ggcav", "ithaca", "usa", "cornell", "university", "eastern", "time", "et", "timezone", "developers", "researchers"]
  },
  
  // Technical Achievements - Complete Details
  {
    id: 26,
    content: "My proudest technical achievements include achieving a 40% query performance improvement at Alibaba Group through PostgreSQL GiST index optimization, a 10.33% F1 score improvement in my REBL research project over baseline BioBERT, a 39.47% reduction in total errors in biomedical relation extraction, and a 56.80% reduction in implicit relation errors through advanced NLP techniques. I've also successfully scaled systems to handle 10,000+ daily active users at Montaura.tech, processed 1,500 PubMed abstracts with 4,409 chemicals and 5,818 diseases in REBL research, and handled thousands of concurrent game sessions in Webtama gaming backend.",
    category: "achievements",
    keywords: ["40%", "performance", "improvement", "alibaba", "postgresql", "gist", "10.33%", "f1", "score", "rebl", "biobert", "39.47%", "reduction", "errors", "56.80%", "implicit", "nlp", "10000", "daily", "active", "users", "montaura", "1500", "pubmed", "4409", "chemicals", "5818", "diseases", "thousands", "concurrent", "sessions", "webtama"]
  },
  
  // Research Contributions - Complete
  {
    id: 27,
    content: "My research contributions include published research on enhanced transformer-based chemical-disease relation extraction, advanced biomedical NLP techniques for healthcare applications, multi-modal clinical systems for decision support, and knowledge graph integration with transformer models. I've made significant contributions to the field of biomedical AI and healthcare technology, with research focusing on advanced transformer-based systems, multi-modal clinical retrieval, and healthcare decision support systems.",
    category: "research",
    keywords: ["published", "research", "transformer", "chemical", "disease", "relation", "extraction", "biomedical", "nlp", "healthcare", "multi-modal", "clinical", "systems", "decision", "support", "knowledge", "graph", "integration", "ai", "technology"]
  },
  
  // Project Repositories - Complete
  {
    id: 28,
    content: "My project repositories include REBL (https://github.com/GGCav/REBL) for enhanced chemical-disease relation extraction, Multi-Modal Clinical RAG System (https://github.com/GGCav/mcrag-system) for healthcare decision support, Warehouse Management System (high-performance C++ implementation), Webtama (real-time gaming backend in Go), Montaura.tech (cross-platform basketball application), and USoustenir (sustainable fashion platform). All my research and technical projects are available on GitHub for collaboration and review.",
    category: "repositories",
    keywords: ["repositories", "rebl", "github", "ggcav", "chemical", "disease", "multi-modal", "clinical", "rag", "mcrag", "warehouse", "management", "webtama", "gaming", "montaura", "usoustenir", "sustainable", "fashion", "research", "technical", "projects", "collaboration"]
  },
  
  // Professional Development - Complete
  {
    id: 29,
    content: "I maintain a strong commitment to continuous learning and staying current with emerging technologies. My research work demonstrates ongoing engagement with cutting-edge AI/ML techniques, while my practical projects showcase application of modern software engineering principles. Through my work at major tech companies (Alibaba Group) and innovative startups (Vosyn.AI, Montaura.tech, USoustenir), I've gained diverse experience across different industry sectors and company sizes. My academic excellence is demonstrated through research contributions at Cornell University, showing strong academic capabilities and the ability to bridge theoretical knowledge with practical applications in real-world systems.",
    category: "development",
    keywords: ["continuous", "learning", "emerging", "technologies", "research", "ai", "ml", "software", "engineering", "alibaba", "group", "vosyn", "montaura", "usoustenir", "industry", "sectors", "academic", "excellence", "cornell", "university", "theoretical", "knowledge", "practical", "applications", "real-world", "systems"]
  }
];

async function ingestKnowledgeBase() {
  console.log('🚀 Starting knowledge base ingestion with Google text-embedding-004...');
  console.log(`📊 Processing ${knowledgeChunks.length} chunks...`);

  try {
    // Test embedding creation first
    console.log('🧪 Testing Google embedding model...');
    const testText = "Hello, this is a test for Google embeddings.";
    const testEmbedding = await embeddings.embedQuery(testText);
    console.log('✅ Test embedding created successfully');
    console.log(`📏 Embedding dimensions: ${testEmbedding.length}`);
    console.log(`🔢 First few values: [${testEmbedding.slice(0, 5).join(', ')}...]`);
    
    if (testEmbedding.length === 0) {
      throw new Error('Google embedding model returned empty vector');
    }

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    const { error: deleteError } = await supabase
      .from('knowledge_chunks')
      .delete()
      .neq('id', 0);

    if (deleteError) {
      console.error('Error clearing data:', deleteError);
      return;
    }

    console.log('✅ Existing data cleared');

    // Convert chunks to LangChain Documents
    const documents = knowledgeChunks.map(chunk => new Document({
      pageContent: chunk.content,
      metadata: {
        id: chunk.id,
        category: chunk.category,
        keywords: chunk.keywords
      }
    }));

    console.log('📝 Converted chunks to LangChain documents');

    // Create vector store and ingest documents
    console.log('⏳ Creating embeddings and storing in vector database...');
    await SupabaseVectorStore.fromDocuments(documents, embeddings, {
      client: supabase,
      tableName: "knowledge_chunks",
    });

    console.log('🎉 Knowledge base ingestion completed successfully!');
    console.log(`📊 Total chunks processed: ${knowledgeChunks.length}`);
    console.log('🔍 Using Google text-embedding-004 model (768 dimensions)');
    console.log('💡 Your AI assistant is now ready with semantic search capabilities!');

  } catch (error) {
    console.error('❌ Error during ingestion:', error);
    console.error('Error details:', error.message);
    
    // Additional debugging for embedding errors
    if (error.message.includes('vector must have at least 1 dimension')) {
      console.error('🔍 This error suggests the Google embedding model is not working correctly.');
      console.error('🔍 Please check:');
      console.error('   1. Your GOOGLE_API_KEY is valid and has access to text-embedding-004');
      console.error('   2. You have sufficient quota for the embedding model');
      console.error('   3. The model name "text-embedding-004" is correct');
    }
  }
}

// Run the ingestion
ingestKnowledgeBase(); 