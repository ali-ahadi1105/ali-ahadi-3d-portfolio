export interface ExperienceItem {
  role: string
  company: string
  period: string
  location: string
  highlights: string[]
  technologies: string[]
  metrics?: string
}

export interface SkillCategory {
  title: string
  icon: string
  description: string
  skills: { name: string; level: 'Production' | 'Advanced' | 'Familiar'; tag?: string }[]
}

export interface ArchitectureNodeData {
  id: string
  name: string
  category: 'client' | 'api' | 'cache' | 'ca' | 'observability' | 'ai'
  description: string
  tech: string
  stats: string
  position: [number, number, number]
}

export const RESUME_DATA = {
  personal: {
    name: 'ALI AHADI',
    role: 'Backend Developer | Node.js | TypeScript',
    location: 'Mashhad, Iran',
    email: 'aliahadi.f1105@gmail.com',
    phone: '09031583914',
    github: 'https://github.com/ali-ahadi1105',
    githubHandle: 'ali-ahadi1105',
    linkedin: 'https://linkedin.com/in/ali-ahadi-112920264',
    linkedinHandle: 'ali-ahadi-112920264',
    education: {
      degree: 'Bachelor of Science in Software Engineering',
      university: 'Khayyam University — Mashhad, Iran',
      year: '2021'
    },
    languages: [
      { name: 'Persian', level: 'Native' },
      { name: 'English', level: 'Intermediate (strong reading and listening)' }
    ],
    interests: [
      'Backend Engineering',
      'Software Architecture',
      'AI Agents',
      'LLM Applications',
      'Distributed Systems',
      'Go'
    ]
  },

  summary: `Backend Developer with 3 years of professional experience maintaining and developing production backend services for the Registration Authority (RA) component of a PKI system used by around 7,000–9,000 daily users. End-to-end ownership of the flow from user registration through verification to certificate issuance (integrated with CA services), covering REST API development and integration using Node.js and TypeScript (custom Node.js-based framework), production troubleshooting, automated testing with Mocha, and GitLab CI/CD Bash deployment in Linux environments. Production experience also includes Redis (session management, shared state across load-balanced instances, pre-persistence staging) and production observability with OpenSearch, SigNoz, and Grafana. Broader familiarity includes NestJS, Express.js, Go, PostgreSQL, Docker, software architecture / SOLID, and AI-assisted development (Google ADK, RAG, MCP, LLM integration).`,

  telemetry: {
    systemStatus: 'ONLINE / PRODUCTION',
    dailyActiveUsers: '7,000 - 9,000',
    redisHitRate: '99.4%',
    avgLatency: '14ms',
    uptime: '99.98%',
    serviceTarget: 'PKI Registration Authority (RA)',
    caIntegration: 'ACTIVE',
    pipelineStatus: 'PASSING (GitLab CI/CD)'
  },

  experience: [
    {
      role: 'Backend Developer',
      company: 'Part Software Group',
      period: 'Sep 2023 – Present',
      location: 'Mashhad, Iran',
      metrics: '7,000–9,000 Daily Active Users',
      technologies: ['Node.js', 'TypeScript', 'Redis', 'GitLab CI/CD', 'Bash', 'Mocha', 'OpenSearch', 'SigNoz', 'Grafana', 'Linux'],
      highlights: [
        'Maintained backend services of the Registration Authority (RA) component in a PKI system, handling the end-to-end flow from user registration and verification to certificate issuance integrated with CA services.',
        'Engineered & maintained high-throughput REST APIs for identity verification workflows and digital certificate request/issuance pipelines.',
        'Leveraged Redis in production for session management and distributed state sharing across load-balanced service instances.',
        'Architected and maintained a signature-image storage and retrieval microservice, using Redis as an in-memory staging layer before persistent filesystem write.',
        'Authored and automated GitLab CI/CD release deployment pipelines with Bash scripts on Linux enterprise servers.',
        'Implemented comprehensive automated test suites (unit, API, functional, integration) with Mocha to guarantee zero regressions in critical cryptographic flows.',
        'Established observability infrastructure using OpenSearch, SigNoz, and Grafana, authoring operational dashboards for live tracing and troubleshooting.',
        'Championed clean code quality, conducting rigorous code reviews via GitLab Merge Requests adhering to Clean and Layered architecture principles.'
      ]
    }
  ] as ExperienceItem[],

  architectureNodes: [
    {
      id: 'client',
      name: 'Client Applications',
      category: 'client',
      description: 'Web & mobile users submitting digital identity verification & cert requests.',
      tech: 'REST / HTTPS',
      stats: '7,000–9,000 Users/Day',
      position: [-3.5, 1.2, 0]
    },
    {
      id: 'ra-core',
      name: 'PKI Registration Authority (RA)',
      category: 'api',
      description: 'Core backend service managing user verification lifecycle and CA delegation.',
      tech: 'Node.js, TypeScript, Custom Framework',
      stats: 'Load Balanced / Multi-Instance',
      position: [0, 1.6, 0]
    },
    {
      id: 'redis',
      name: 'Redis Staging & State Layer',
      category: 'cache',
      description: 'Distributed session management and pre-persistence staging for signature image payloads.',
      tech: 'Redis In-Memory Key-Value',
      stats: 'Low Latency, High Concurrency',
      position: [0, -0.6, 2]
    },
    {
      id: 'ca',
      name: 'Certificate Authority (CA)',
      category: 'ca',
      description: 'Cryptographic authority responsible for issuing X.509 digital certificates.',
      tech: 'Mutual TLS / Internal RPC',
      stats: 'Secure Cryptographic Signing',
      position: [3.5, 1.2, 0]
    },
    {
      id: 'observability',
      name: 'Observability & Telemetry',
      category: 'observability',
      description: 'Continuous distributed tracing, log aggregation, and real-time dashboarding.',
      tech: 'OpenSearch, SigNoz, Grafana',
      stats: 'Real-time Metrics & APM',
      position: [0, -1.8, -1.5]
    },
    {
      id: 'ai-core',
      name: 'AI Agent & Tool Calling Engine',
      category: 'ai',
      description: 'Agentic workflows, Model Context Protocol (MCP), and external tool orchestration.',
      tech: 'Google ADK, MCP, RAG, OpenAI API',
      stats: 'Autonomous System Integration',
      position: [0, 3.2, -1]
    }
  ] as ArchitectureNodeData[],

  skillCategories: [
    {
      title: 'Backend & Languages',
      icon: 'Server',
      description: 'Production-tested microservices and enterprise runtime development.',
      skills: [
        { name: 'TypeScript', level: 'Production', tag: 'Primary' },
        { name: 'Node.js (Custom Framework)', level: 'Production', tag: 'Core' },
        { name: 'REST APIs & Integration', level: 'Production', tag: 'Core' },
        { name: 'Go (Golang)', level: 'Advanced', tag: 'Intermediate' },
        { name: 'NestJS', level: 'Advanced' },
        { name: 'Express.js', level: 'Advanced' },
        { name: 'Bash Scripting', level: 'Production', tag: 'CI/CD' }
      ]
    },
    {
      title: 'Architecture & Engineering',
      icon: 'Layers',
      description: 'Clean architectural patterns for scalable, reliable systems.',
      skills: [
        { name: 'PKI & Certificate Workflows', level: 'Production', tag: 'Specialist' },
        { name: 'Clean Architecture', level: 'Production' },
        { name: 'Layered Architecture', level: 'Production' },
        { name: 'SOLID Principles & Patterns', level: 'Production' },
        { name: 'Automated Testing (Mocha)', level: 'Production', tag: 'Unit/API/Integration' },
        { name: 'Service-Based Architecture', level: 'Production' },
        { name: 'Code Refactoring & Review', level: 'Production' }
      ]
    },
    {
      title: 'Databases & Infrastructure',
      icon: 'Database',
      description: 'In-memory caching, persistence staging, and Linux container operations.',
      skills: [
        { name: 'Redis (Session & Staging)', level: 'Production', tag: 'High-Throughput' },
        { name: 'PostgreSQL & Relational DBs', level: 'Advanced' },
        { name: 'GitLab CI/CD Pipelines', level: 'Production', tag: 'Automation' },
        { name: 'Linux Server Environment', level: 'Production' },
        { name: 'Docker & Containerization', level: 'Advanced' },
        { name: 'Git & Git Workflow', level: 'Production' }
      ]
    },
    {
      title: 'Observability & Monitoring',
      icon: 'Activity',
      description: 'Full-stack distributed tracing and production performance dashboards.',
      skills: [
        { name: 'OpenSearch (Dashboards)', level: 'Production', tag: 'Log Analytics' },
        { name: 'SigNoz (APM & Traces)', level: 'Production', tag: 'Distributed Tracing' },
        { name: 'Grafana', level: 'Production', tag: 'Metrics' }
      ]
    },
    {
      title: 'AI & Agentic Systems',
      icon: 'Cpu',
      description: 'Modern LLM tools, autonomous agents, and system integration.',
      skills: [
        { name: 'Google Agent Dev Kit (ADK)', level: 'Advanced', tag: 'Agentic' },
        { name: 'Model Context Protocol (MCP)', level: 'Advanced', tag: 'Tool Calling' },
        { name: 'RAG & Embeddings', level: 'Advanced' },
        { name: 'Tool / Function Calling', level: 'Advanced' },
        { name: 'System & Prompt Engineering', level: 'Advanced' },
        { name: 'OpenAI-Compatible APIs', level: 'Advanced' }
      ]
    }
  ] as SkillCategory[],

  aiSystems: {
    title: 'AI & Agentic Systems Engineering',
    summary: 'Bridging enterprise backend infrastructure with autonomous LLM agents and standardized tool protocols.',
    capabilities: [
      {
        title: 'Google Agent Development Kit (ADK)',
        desc: 'Constructing multi-turn agent pipelines, declarative workflows, and task-oriented reasoning loops.'
      },
      {
        title: 'Model Context Protocol (MCP)',
        desc: 'Implementing MCP servers and clients to securely expose database queries, logs, and backend endpoints to Claude and LLM systems.'
      },
      {
        title: 'Tool & Function Calling',
        desc: 'Designing strict JSON-schema-validated tool definitions allowing models to safely invoke backend mutations and queries.'
      },
      {
        title: 'RAG & Knowledge Retrieval',
        desc: 'Vector embeddings, chunking strategies, and hybrid semantic search for context-augmented responses.'
      }
    ]
  }
}
