const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
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
  model: "text-embedding-004",
});

// Knowledge base chunks (complete 29 chunks)
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
  
  // Programming Languages - Complete
  {
    id: 11,
    content: "My programming language expertise includes Python (advanced proficiency in AI/ML, data processing, web development), Java (enterprise development, Spring Boot, microservices architecture), C++14 (high-performance computing, system programming), Go (concurrent programming, microservices, cloud-native applications), JavaScript/TypeScript (frontend development, Node.js backend), and SQL (database design, optimization, PostgreSQL, MongoDB). I have extensive experience with Python for machine learning, data analysis, and web development using frameworks like FastAPI, Django, and Flask. With Go, I've built high-performance concurrent systems including real-time gaming backends, RESTful APIs using Gin framework, and microservices with goroutines and channels for efficient concurrency management.",
    category: "skills",
    keywords: ["python", "programming", "language", "expertise", "ai", "ml", "data", "processing", "web", "development", "java", "spring", "boot", "microservices", "c++14", "go", "javascript", "typescript", "sql", "fastapi", "django", "flask", "gin", "goroutines", "channels", "concurrency"]
  },
  
  // AI & Machine Learning - Complete
  {
    id: 12,
    content: "My AI & Machine Learning expertise includes PyTorch (deep learning, neural networks, custom model development), TensorFlow (production ML pipelines, model serving), Scikit-learn (traditional ML algorithms, data preprocessing), Transformers (BERT, GPT, custom transformer architectures), Computer Vision (OpenCV, image processing, object detection), Natural Language Processing (spaCy, NLTK, text analysis), and MLOps (model versioning, deployment, monitoring). I've worked extensively with transformer models for biomedical NLP, implemented custom architectures like Longformer for document-level processing, and built comprehensive evaluation frameworks for clinical AI systems.",
    category: "skills",
    keywords: ["ai", "machine", "learning", "pytorch", "deep", "neural", "networks", "tensorflow", "ml", "pipelines", "scikit-learn", "algorithms", "transformers", "bert", "gpt", "computer", "vision", "opencv", "nlp", "spacy", "nltk", "mlops", "longformer", "biomedical", "clinical"]
  },
  
  // Backend & APIs - Complete
  {
    id: 13,
    content: "My backend and APIs expertise includes Spring Boot (Java microservices, enterprise applications), Node.js (JavaScript runtime, server-side development), Express.js (web application framework for Node.js), FastAPI (Python web framework, automatic API documentation), Gin (Go web framework, high-performance REST APIs), gRPC (high-performance RPC framework, microservices communication), GraphQL (flexible data querying, API design), and RESTful APIs (standard HTTP-based APIs, best practices). I've built scalable microservices architectures, implemented real-time communication systems using WebSockets, and designed high-performance APIs handling thousands of concurrent requests.",
    category: "skills",
    keywords: ["backend", "apis", "spring", "boot", "java", "microservices", "node.js", "express", "fastapi", "python", "gin", "go", "grpc", "graphql", "restful", "websockets", "concurrent", "requests"]
  },
  
  // Cloud & DevOps - Complete
  {
    id: 14,
    content: "My cloud and DevOps expertise includes AWS (EC2, S3, Lambda, CloudFormation), Google Cloud Platform (Compute Engine, Cloud Storage, Vertex AI), Docker (containerization, microservices deployment), Kubernetes (container orchestration, scaling), Terraform (infrastructure as code, multi-cloud deployment), CI/CD (GitHub Actions, Jenkins, automated testing), and Monitoring (Prometheus, Grafana, application observability). I've deployed production systems on multiple cloud platforms, implemented infrastructure as code for reproducible deployments, and built comprehensive monitoring and alerting systems for high-availability applications.",
    category: "skills",
    keywords: ["cloud", "devops", "aws", "ec2", "s3", "lambda", "cloudformation", "gcp", "compute", "engine", "storage", "vertex", "ai", "docker", "kubernetes", "terraform", "ci", "cd", "github", "actions", "jenkins", "prometheus", "grafana", "monitoring"]
  },
  
  // Databases - Complete
  {
    id: 15,
    content: "My database expertise includes PostgreSQL (relational database, advanced queries, optimization), MongoDB (NoSQL database, document storage, aggregation), Redis (in-memory caching, session management), MySQL (relational database, web applications), and Database Design (schema design, normalization, indexing). I've implemented complex geospatial queries using PostGIS, built high-performance caching layers with Redis, and designed scalable database architectures for applications serving thousands of users.",
    category: "skills",
    keywords: ["databases", "postgresql", "mongodb", "redis", "mysql", "nosql", "relational", "queries", "optimization", "caching", "geospatial", "postgis", "schema", "design", "indexing"]
  },
  
  // Frontend Development - Complete
  {
    id: 16,
    content: "My frontend development expertise includes React (component-based UI development, state management), Vue.js (progressive JavaScript framework, reactive interfaces), Angular (TypeScript-based framework, enterprise applications), HTML5/CSS3 (semantic markup, responsive design), JavaScript/TypeScript (modern ES6+ features, type safety), and UI/UX Design (user experience, responsive layouts, accessibility). I've built cross-platform applications using Flutter, implemented complex state management with Redux and Riverpod, and created responsive web interfaces optimized for various devices.",
    category: "skills",
    keywords: ["frontend", "development", "react", "vue", "angular", "html5", "css3", "javascript", "typescript", "ui", "ux", "design", "flutter", "redux", "riverpod", "responsive", "accessibility"]
  },
  
  // Education - Complete
  {
    id: 17,
    content: "I'm currently pursuing my Master of Engineering at Cornell University in Ithaca, USA, focusing on computer science and software engineering. My academic background includes strong foundations in algorithms, data structures, software engineering principles, and computer systems. I've taken advanced courses in machine learning, distributed systems, database systems, and software architecture. My research work at Cornell has focused on biomedical AI and healthcare technology, allowing me to apply theoretical knowledge to real-world problems in the healthcare domain.",
    category: "education",
    keywords: ["education", "master", "engineering", "cornell", "university", "ithaca", "computer", "science", "software", "engineering", "algorithms", "data", "structures", "machine", "learning", "distributed", "systems", "database", "architecture", "biomedical", "ai", "healthcare", "research"]
  },
  
  // Personal Background - Complete
  {
    id: 18,
    content: "I'm originally from China and have lived in multiple countries including Canada and the United States, giving me a global perspective on technology and software development. I'm passionate about creating technology that makes a positive impact on people's lives, whether through healthcare applications, educational tools, or innovative business solutions. I enjoy collaborating with diverse teams and learning from different perspectives, which has helped me develop strong communication and leadership skills. My multicultural background has also given me insights into how technology can be adapted for different markets and user needs.",
    category: "background",
    keywords: ["personal", "background", "china", "canada", "united", "states", "global", "perspective", "technology", "software", "development", "healthcare", "educational", "business", "solutions", "collaboration", "communication", "leadership", "multicultural", "markets", "user", "needs"]
  },
  
  // Personal Interests - Complete
  {
    id: 19,
    content: "My personal interests include basketball (both playing and following the sport), technology innovation, reading about emerging technologies and their applications, and contributing to open-source projects. I enjoy staying active and find that physical activities like basketball help me maintain focus and creativity in my technical work. I'm also interested in sustainable technology and how it can be used to address environmental challenges. When I'm not coding, I like to explore new technologies, contribute to the developer community, and mentor other developers.",
    category: "interests",
    keywords: ["personal", "interests", "basketball", "technology", "innovation", "reading", "emerging", "technologies", "open-source", "projects", "physical", "activities", "sustainable", "technology", "environmental", "challenges", "coding", "developer", "community", "mentoring"]
  },
  
  // Contact Information - Complete
  {
    id: 20,
    content: "You can reach me at jeffreyhe406@gmail.com or call me at (+1) 607-280-7880. I'm active on LinkedIn at https://www.linkedin.com/in/jinfeng-he-142080302 where I share insights about technology and software development. My GitHub profile is https://github.com/GGCav where you can see my open-source contributions and project repositories. I'm always open to discussing new opportunities, collaborations, or interesting technical challenges. Feel free to connect with me on any of these platforms or reach out directly via email.",
    category: "contact",
    keywords: ["contact", "information", "email", "jeffreyhe406", "phone", "607-280-7880", "linkedin", "github", "ggcav", "opportunities", "collaborations", "technical", "challenges", "platforms"]
  },
  
  // Technical Achievements - Complete
  {
    id: 21,
    content: "My technical achievements include developing systems that serve over 10,000 daily active users with high performance and reliability, achieving 40% performance improvement through custom thread pool optimization, implementing geospatial-temporal queries that are 40% faster using PostgreSQL GiST indexes, building transformer-based NLP systems that achieve 68.70% precision and 58.70% F1 score, processing large-scale clinical datasets with 1,500 PubMed abstracts and 4,409 chemicals, handling thousands of concurrent game sessions with sub-100ms latency, and contributing to open-source projects that have been used by the developer community.",
    category: "achievements",
    keywords: ["technical", "achievements", "10000", "daily", "active", "users", "40%", "performance", "improvement", "thread", "pool", "geospatial", "temporal", "queries", "postgresql", "gist", "68.70%", "precision", "58.70%", "f1", "1500", "pubmed", "4409", "chemicals", "thousands", "concurrent", "sessions", "sub-100ms", "latency", "open-source", "projects"]
  },
  
  // Problem-Solving Approach - Complete
  {
    id: 22,
    content: "My problem-solving approach involves understanding the root cause of issues, breaking down complex problems into manageable components, and implementing systematic solutions. I believe in data-driven decision making and always validate my solutions through testing and metrics. I enjoy tackling challenging technical problems, whether it's optimizing database queries for better performance, designing scalable architectures for high-traffic applications, or implementing complex algorithms for AI/ML systems. I'm comfortable working with uncertainty and enjoy the iterative process of refining solutions based on feedback and real-world usage.",
    category: "approach",
    keywords: ["problem-solving", "approach", "root", "cause", "complex", "problems", "systematic", "solutions", "data-driven", "decision", "making", "testing", "metrics", "challenging", "technical", "optimizing", "database", "queries", "scalable", "architectures", "algorithms", "ai", "ml", "uncertainty", "iterative", "feedback"]
  },
  
  // Leadership Experience - Complete
  {
    id: 23,
    content: "My leadership experience includes founding and leading Montaura.tech as the technical founder, co-founding USoustenir and serving as the lead full-stack developer, and leading development teams in various projects. I've mentored junior developers, conducted code reviews, and established best practices for software development. I believe in leading by example, fostering collaborative environments, and empowering team members to take ownership of their work. I've successfully managed projects from conception to deployment, ensuring high code quality and timely delivery while maintaining team morale and productivity.",
    category: "leadership",
    keywords: ["leadership", "experience", "founding", "montaura", "usoustenir", "lead", "full-stack", "developer", "mentoring", "junior", "developers", "code", "reviews", "best", "practices", "software", "development", "collaborative", "environments", "ownership", "projects", "conception", "deployment", "quality", "delivery", "productivity"]
  },
  
  // Innovation & Research - Complete
  {
    id: 24,
    content: "My innovation and research work focuses on advancing AI/ML technologies for healthcare applications, particularly in biomedical NLP and clinical decision support systems. I've published research on enhanced transformer-based chemical-disease relation extraction, developed novel approaches for multi-modal clinical retrieval, and contributed to the development of healthcare AI systems. My research combines theoretical advances with practical applications, ensuring that innovations can be translated into real-world healthcare solutions. I'm passionate about pushing the boundaries of what's possible with AI and creating technology that can improve patient outcomes.",
    category: "research",
    keywords: ["innovation", "research", "ai", "ml", "healthcare", "biomedical", "nlp", "clinical", "decision", "support", "systems", "published", "transformer", "chemical", "disease", "relation", "extraction", "multi-modal", "retrieval", "theoretical", "advances", "practical", "applications", "patient", "outcomes"]
  },
  
  // Industry Experience - Complete
  {
    id: 25,
    content: "My industry experience spans across different sectors and company sizes, from major tech companies like Alibaba Group to innovative startups like Vosyn.AI, Montaura.tech, and USoustenir. I've worked on e-commerce platforms handling high-traffic flash sales, video processing pipelines for AI applications, cross-platform mobile applications, and sustainable technology platforms. This diverse experience has given me insights into different business models, technical challenges, and user needs across various industries. I've learned to adapt quickly to new technologies and business requirements while maintaining high code quality and performance standards.",
    category: "industry",
    keywords: ["industry", "experience", "sectors", "company", "sizes", "alibaba", "group", "vosyn", "montaura", "usoustenir", "e-commerce", "platforms", "high-traffic", "flash", "sales", "video", "processing", "pipelines", "ai", "applications", "cross-platform", "mobile", "sustainable", "technology", "business", "models", "technical", "challenges", "user", "needs", "industries", "code", "quality", "performance", "standards"]
  },
  
  // Technical Philosophy - Complete
  {
    id: 26,
    content: "My technical philosophy centers around building robust, scalable, and maintainable systems that solve real-world problems. I believe in writing clean, well-documented code that can be easily understood and maintained by other developers. I prioritize performance optimization, security best practices, and user experience in all my projects. I'm a strong advocate for testing, code reviews, and continuous integration to ensure code quality. I believe that great software comes from understanding both the technical requirements and the business context, and I always strive to create solutions that not only work technically but also provide value to users and stakeholders.",
    category: "philosophy",
    keywords: ["technical", "philosophy", "robust", "scalable", "maintainable", "systems", "real-world", "problems", "clean", "well-documented", "code", "performance", "optimization", "security", "best", "practices", "user", "experience", "testing", "code", "reviews", "continuous", "integration", "quality", "business", "context", "value", "stakeholders"]
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
  console.log('🚀 Starting manual knowledge base ingestion...');
  console.log(`📊 Processing ${knowledgeChunks.length} chunks...`);

  try {
    // Test embedding creation first
    console.log('🧪 Testing Google embedding model...');
    const testText = "Hello, this is a test for Google embeddings.";
    const testEmbedding = await embeddings.embedQuery(testText);
    console.log('✅ Test embedding created successfully');
    console.log(`📏 Embedding dimensions: ${testEmbedding.length}`);
    console.log(`🔢 First few values: [${testEmbedding.slice(0, 5).join(', ')}...]`);

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

    // Process each chunk manually
    console.log('⏳ Creating embeddings and storing manually...');
    let processed = 0;

    for (const chunk of knowledgeChunks) {
      try {
        // Create embedding for this chunk
        const embedding = await embeddings.embedQuery(chunk.content);
        
        // Store as proper PostgreSQL vector
        const { error: insertError } = await supabase
          .from('knowledge_chunks')
          .insert({
            id: chunk.id,
            content: chunk.content,
            metadata: {
              id: chunk.id,
              category: chunk.category,
              keywords: chunk.keywords
            },
            embedding: `[${embedding.join(',')}]` // Proper PostgreSQL vector format
          });

        if (insertError) {
          console.error(`❌ Error inserting chunk ${chunk.id}:`, insertError);
        } else {
          processed++;
          console.log(`✅ Processed chunk ${chunk.id}/${knowledgeChunks.length}`);
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (chunkError) {
        console.error(`❌ Error processing chunk ${chunk.id}:`, chunkError);
      }
    }

    console.log('🎉 Manual ingestion completed successfully!');
    console.log(`📊 Total chunks processed: ${processed}/${knowledgeChunks.length}`);
    console.log('🔍 Using Google text-embedding-004 model (768 dimensions)');
    console.log('💡 Your AI assistant is now ready with semantic search capabilities!');

  } catch (error) {
    console.error('❌ Error during ingestion:', error);
    console.error('Error details:', error.message);
  }
}

// Run the ingestion
ingestKnowledgeBase(); 