export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  stack: string;
  from: string;
  to: string | "Present";
  githubUrl?: string;
  demoUrl?: string;
  customer?: string;
  teamSize?: number;
}

interface SheetResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

const SHEET_API_URL = 
  "https://sheets.googleapis.com/v4/spreadsheets/15E7USHGwcvn9Kin2ZxLU57rqnk0V1X88vaVkWTRBrdg/values/projects?key=AIzaSyCWTVBMgpwsQFzxtltRQXTlka4FeMmA1-g";

/**
 * Fetch projects from Google Sheets
 */
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(SHEET_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    
    const data: SheetResponse = await response.json();
    
    // Skip header row (first row) and transform data
    const projects = data.values.slice(1).map((row) => {
      return {
        id: row[0] || "",
        title: row[1] || "",
        description: row[2] || "",
        fullDescription: row[3] || row[2] || "",
        stack: row[4] || "",
        from: row[5] || "",
        to: row[6] || "Present",
        githubUrl: row[7] || "",
        demoUrl: row[8] || "",
        customer: row[9] || "",
        teamSize: row[10] ? parseInt(row[10], 10) : undefined,
      };
    });
    console.log("Fetched projects:", projects);
    
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Return fallback data on error
    return fallbackProjects;
  }
};

// Fallback data for development or if API fails
export const fallbackProjects: Project[] = [
  {
    id: "ecommerce-rest-api",
    title: "E-commerce REST API",
    description:
      "A fully-featured REST API for an e-commerce platform with product management, cart operations, and order processing.",
    fullDescription:
      "A comprehensive RESTful API built for a modern e-commerce platform. The system handles product catalog management, shopping cart operations, order processing, and payment integration. Implemented with Spring Boot following best practices for microservices architecture, with Redis caching layer for improved performance and PostgreSQL for reliable data persistence. The API supports real-time inventory management, order tracking, and comprehensive reporting features.",
    stack: "Java, Spring Boot, PostgreSQL, Redis, Docker",
    from: "2024-10",
    to: "Present",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    customer: "TechCorp Solutions",
    teamSize: 5,
  },
  {
    id: "jwt-authentication-system",
    title: "JWT Authentication System",
    description:
      "Secure authentication & authorization microservice with JWT tokens, refresh flows, and role-based access control.",
    fullDescription:
      "A robust authentication and authorization microservice designed for enterprise applications. The system implements JWT-based authentication with secure token refresh mechanisms, role-based access control (RBAC), and multi-factor authentication support. Built with Spring Security, the service provides OAuth2 integration, password encryption using BCrypt, and comprehensive audit logging. Features include session management, token revocation, and seamless integration with existing systems.",
    stack: "Java, Spring Security, JWT, MySQL, Redis",
    from: "2024-07",
    to: "2024-09",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    customer: "FinanceHub Inc",
    teamSize: 3,
  },
  {
    id: "dockerized-microservice",
    title: "Dockerized Microservice",
    description:
      "A containerized microservice architecture with service discovery, API gateway, and centralized logging.",
    fullDescription:
      "A production-ready microservices architecture built with Docker and Spring Cloud. The system features automated service discovery using Eureka, intelligent routing through Spring Cloud Gateway, centralized configuration management, and distributed tracing. Implements circuit breaker patterns for fault tolerance, implements health checks, and provides comprehensive monitoring through centralized logging with ELK stack. The architecture ensures high availability and scalability for enterprise workloads.",
    stack: "Docker, Spring Cloud, Nginx, PostgreSQL, Kubernetes",
    from: "2024-04",
    to: "2024-06",
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    customer: "CloudTech Systems",
    teamSize: 8,
  },
  {
    id: "memory-leak-investigation",
    title: "Memory Leak Investigation",
    description:
      "An educational demo showcasing common Java memory leak patterns, profiling techniques, and resolution strategies.",
    fullDescription:
      "An educational project demonstrating various Java memory leak scenarios and their solutions. The demo includes practical examples of OutOfMemoryErrors, heap analysis, thread dumps, and GC behavior analysis. Utilizes VisualVM and JProfiler for heap dump analysis, memory profiling, and performance monitoring. Includes detailed documentation on identifying memory leaks through metrics, implementing proper resource management, and optimizing JVM parameters for production environments.",
    stack: "Java, JVM, VisualVM, JProfiler, Grafana",
    from: "2024-01",
    to: "2024-03",
    githubUrl: "https://github.com",
    customer: "Internal R&D",
    teamSize: 2,
  },
];

export const getProjectById = (id: string, projects: Project[] = fallbackProjects): Project | undefined => {
  return projects.find((project) => project.id === id);
};
