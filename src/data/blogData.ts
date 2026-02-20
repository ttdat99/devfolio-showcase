export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding JVM Garbage Collection",
    description:
      "A deep dive into how the JVM manages memory, different GC algorithms, and tuning strategies for production systems.",
    content: `
# Understanding JVM Garbage Collection

The Java Virtual Machine (JVM) is a marvel of engineering, and one of its most critical components is the Garbage Collector (GC). Understanding how GC works is essential for building high-performance Java applications.

## What is Garbage Collection?

Garbage Collection is the process of automatically freeing memory by reclaiming space from objects that are no longer in use. Unlike languages like C or C++, where developers must manually manage memory, Java handles this automatically.

## Common GC Algorithms

### 1. Serial GC
The Serial GC is the simplest garbage collector, using a single thread for garbage collection. It's best suited for small applications with heap sizes up to approximately 100MB.

### 2. Parallel GC
Also known as the throughput collector, Parallel GC uses multiple threads for young generation garbage collection, making it suitable for multi-core systems.

### 3. G1 GC
The Garbage-First (G1) garbage collector is designed for applications running on multi-processor machines with large memory. It divides the heap into regions and prioritizes garbage collection in regions with the most garbage.

### 4. ZGC
Z Garbage Collector is a scalable low-latency garbage collector that performs all expensive work concurrently, without stopping the execution of application threads for more than a few milliseconds.

## Best Practices

1. **Monitor GC logs** - Always enable and monitor GC logging in production
2. **Choose the right GC** - Select a garbage collector based on your application's needs
3. **Tune heap size** - Set appropriate initial and maximum heap sizes
4. **Avoid memory leaks** - Even with GC, memory leaks can occur if objects are unintentionally retained

## Conclusion

Understanding garbage collection is crucial for Java developers. By selecting the appropriate GC algorithm and tuning it correctly, you can significantly improve your application's performance and reliability.
    `,
    createdAt: "2025-01-15",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Building REST APIs with Spring Boot 3",
    description:
      "Best practices for structuring, documenting, and securing production-grade REST APIs using modern Spring Boot.",
    content: `
# Building REST APIs with Spring Boot 3

Spring Boot 3 brings numerous improvements and new features that make building REST APIs easier and more efficient than ever before. This guide covers the essential practices for creating production-ready APIs.

## Project Setup

Start with Spring Initializr and include these dependencies:
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Validation
- SpringDoc OpenAPI (for documentation)

## Project Structure

Organize your project with a clear separation of concerns:

\`\`\`
src/main/java/com/yourapp/
├── config/         # Configuration classes
├── controller/     # REST controllers
├── service/        # Business logic
├── repository/     # Data access
├── model/          # Domain entities
├── dto/            # Data transfer objects
└── exception/      # Exception handling
\`\`\`

## Controller Best Practices

### 1. Use Proper HTTP Methods
- GET for retrieving data
- POST for creating resources
- PUT for updating entire resources
- PATCH for partial updates
- DELETE for removing resources

### 2. Implement Proper Status Codes
Return appropriate HTTP status codes for different scenarios.

### 3. Validate Input
Always validate incoming data using Bean Validation annotations.

## Security Considerations

1. **Authentication & Authorization** - Implement JWT-based authentication
2. **CORS Configuration** - Configure CORS properly for frontend access
3. **Rate Limiting** - Protect your API from abuse
4. **Input Sanitization** - Always sanitize user input

## API Documentation

Use SpringDoc OpenAPI to automatically generate interactive API documentation. It provides a Swagger UI interface for testing your endpoints.

## Testing

Write comprehensive tests:
- Unit tests for services
- Integration tests for controllers
- End-to-end tests for critical flows

## Conclusion

Building REST APIs with Spring Boot 3 is straightforward when following best practices. Focus on clean architecture, proper validation, security, and comprehensive testing to create robust APIs.
    `,
    createdAt: "2024-12-10",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Docker for Java Developers",
    description:
      "From Dockerfile basics to multi-stage builds — everything you need to containerize your Java applications.",
    content: `
# Docker for Java Developers

Containerization has revolutionized how we build, ship, and run applications. Docker is the leading platform for containerization, and it's essential for modern Java developers to understand how to use it effectively.

## Why Docker for Java?

1. **Consistency** - Same environment everywhere (dev, test, prod)
2. **Isolation** - Each container runs independently
3. **Portability** - Run anywhere Docker is installed
4. **Scalability** - Easy to scale horizontally

## Creating Your First Dockerfile

A basic Dockerfile for a Spring Boot application:

\`\`\`dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Multi-Stage Builds

Multi-stage builds help reduce image size by separating build and runtime environments:

\`\`\`dockerfile
# Build stage
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Docker Compose

For applications with multiple services (app, database, cache), use Docker Compose:

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
\`\`\`

## Best Practices

1. **Use official base images** - Start with trusted images
2. **Minimize layers** - Combine RUN commands when possible
3. **Use .dockerignore** - Exclude unnecessary files
4. **Don't run as root** - Create a non-root user
5. **Health checks** - Implement health check endpoints
6. **Environment variables** - Use env vars for configuration

## Optimization Tips

1. Use Alpine-based images for smaller size
2. Leverage build cache effectively
3. Use multi-stage builds
4. Remove unnecessary dependencies

## Conclusion

Docker is an indispensable tool for Java developers. By containerizing your applications, you gain consistency, portability, and easier deployment. Start with simple Dockerfiles and gradually adopt advanced techniques like multi-stage builds.
    `,
    createdAt: "2024-11-20",
    image: "https://images.unsplash.com/photo-1605745341075-9e29ad8e36b2?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Microservices Design Patterns",
    description:
      "Explore essential design patterns for building resilient and scalable microservices architectures.",
    content: `
# Microservices Design Patterns

Microservices architecture has become the standard for building large-scale, complex applications. However, with distributed systems come distributed problems. Design patterns help us solve common challenges.

## Core Patterns

### 1. API Gateway Pattern
An API Gateway acts as a single entry point for all clients, routing requests to appropriate microservices.

**Benefits:**
- Single entry point
- Request routing
- Authentication/Authorization
- Rate limiting

### 2. Service Discovery Pattern
Services need to find each other in a dynamic environment. Service discovery automates this process.

**Tools:**
- Netflix Eureka
- Consul
- Kubernetes DNS

### 3. Circuit Breaker Pattern
Prevents cascading failures by failing fast when a service is unavailable.

**Implementation:**
- Resilience4j
- Hystrix (legacy)

## Communication Patterns

### Synchronous Communication
- REST APIs
- gRPC

### Asynchronous Communication
- Message queues (RabbitMQ, Kafka)
- Event-driven architecture

## Data Patterns

### Database per Service
Each microservice has its own database to ensure loose coupling.

### Saga Pattern
Manages distributed transactions across multiple services using:
- Choreography
- Orchestration

### CQRS (Command Query Responsibility Segregation)
Separates read and write operations for better scalability.

## Resilience Patterns

### 1. Retry Pattern
Automatically retry failed requests with exponential backoff.

### 2. Timeout Pattern
Set timeouts to avoid waiting indefinitely for responses.

### 3. Bulkhead Pattern
Isolate resources to prevent complete system failure.

## Observability Patterns

### Distributed Tracing
Track requests across multiple services using trace IDs.

**Tools:**
- Zipkin
- Jaeger
- OpenTelemetry

### Centralized Logging
Aggregate logs from all services in one place.

**Tools:**
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Loki + Grafana

### Metrics & Monitoring
Collect and visualize metrics from all services.

**Tools:**
- Prometheus + Grafana
- Micrometer

## Security Patterns

### 1. JWT Token Pattern
Use JWT tokens for stateless authentication.

### 2. OAuth 2.0 / OpenID Connect
Implement standard protocols for authorization and authentication.

### 3. Service Mesh
Use a service mesh like Istio for security, observability, and traffic management.

## Conclusion

Microservices design patterns are essential tools in your architectural toolkit. They provide proven solutions to common problems in distributed systems. Start with the basics and gradually adopt more advanced patterns as your system grows.
    `,
    createdAt: "2024-10-05",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Getting Started with Kubernetes",
    description:
      "A practical introduction to Kubernetes for Java developers, from basic concepts to deploying your first application.",
    content: `
# Getting Started with Kubernetes

Kubernetes (K8s) is the de facto standard for container orchestration. If you're building modern cloud-native applications, understanding Kubernetes is essential.

## What is Kubernetes?

Kubernetes is an open-source container orchestration platform that automates deploying, scaling, and managing containerized applications.

## Core Concepts

### Pods
The smallest deployable unit in Kubernetes, containing one or more containers.

### Services
An abstraction that defines a logical set of Pods and a policy to access them.

### Deployments
Declarative updates for Pods and ReplicaSets, managing the desired state of your application.

### ConfigMaps & Secrets
Manage configuration data and sensitive information separately from container images.

## Your First Deployment

### 1. Create a Deployment YAML

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-java-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-java-app
  template:
    metadata:
      labels:
        app: my-java-app
    spec:
      containers:
      - name: app
        image: my-java-app:latest
        ports:
        - containerPort: 8080
\`\`\`

### 2. Create a Service

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: my-java-app-service
spec:
  selector:
    app: my-java-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
\`\`\`

### 3. Apply to Cluster

\`\`\`bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
\`\`\`

## Essential kubectl Commands

\`\`\`bash
# Get resources
kubectl get pods
kubectl get services
kubectl get deployments

# Describe resources
kubectl describe pod <pod-name>

# View logs
kubectl logs <pod-name>

# Execute commands in pod
kubectl exec -it <pod-name> -- /bin/bash

# Delete resources
kubectl delete deployment <deployment-name>
\`\`\`

## Best Practices

### 1. Resource Limits
Always set resource requests and limits:

\`\`\`yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "500m"
  limits:
    memory: "512Mi"
    cpu: "1000m"
\`\`\`

### 2. Health Checks
Implement liveness and readiness probes:

\`\`\`yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 20
  periodSeconds: 5
\`\`\`

### 3. Use Namespaces
Organize resources using namespaces for different environments.

### 4. ConfigMaps for Configuration
Externalize configuration using ConfigMaps.

### 5. Secrets for Sensitive Data
Use Kubernetes Secrets (or external secret managers) for passwords, tokens, etc.

## Scaling

Kubernetes makes scaling easy:

\`\`\`bash
# Manual scaling
kubectl scale deployment my-java-app --replicas=5

# Auto-scaling
kubectl autoscale deployment my-java-app --cpu-percent=70 --min=2 --max=10
\`\`\`

## Local Development

Use these tools for local Kubernetes development:
- **Minikube** - Single-node Kubernetes cluster
- **Kind** - Kubernetes in Docker
- **Docker Desktop** - Built-in Kubernetes

## Conclusion

Kubernetes is powerful but has a learning curve. Start with the basics: Pods, Deployments, and Services. Practice deploying your Java applications locally, then gradually explore advanced features like Ingress, StatefulSets, and Helm charts.
    `,
    createdAt: "2024-09-12",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Java Concurrency and Multithreading",
    description:
      "Master concurrent programming in Java with practical examples and common pitfalls to avoid.",
    content: `
# Java Concurrency and Multithreading

Concurrency is one of the most powerful and challenging aspects of Java programming. Understanding how to write thread-safe code is crucial for building high-performance applications.

## Why Concurrency?

Modern applications need to:
- Handle multiple requests simultaneously
- Perform background tasks
- Utilize multi-core processors efficiently
- Improve application responsiveness

## Java Concurrency Basics

### Creating Threads

**Method 1: Extending Thread**
\`\`\`java
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}
new MyThread().start();
\`\`\`

**Method 2: Implementing Runnable**
\`\`\`java
Runnable task = () -> System.out.println("Task running");
new Thread(task).start();
\`\`\`

**Method 3: Using ExecutorService (Recommended)**
\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> System.out.println("Task running"));
executor.shutdown();
\`\`\`

## Synchronization

### synchronized Keyword
\`\`\`java
public synchronized void increment() {
    count++;
}
\`\`\`

### Locks
\`\`\`java
private final Lock lock = new ReentrantLock();

public void increment() {
    lock.lock();
    try {
        count++;
    } finally {
        lock.unlock();
    }
}
\`\`\`

## Thread-Safe Collections

Java provides concurrent collections:
- **ConcurrentHashMap** - Thread-safe HashMap
- **CopyOnWriteArrayList** - Thread-safe ArrayList
- **ConcurrentLinkedQueue** - Thread-safe Queue
- **BlockingQueue** - Blocking queue implementations

## The java.util.concurrent Package

### CountDownLatch
Wait for multiple threads to complete:
\`\`\`java
CountDownLatch latch = new CountDownLatch(3);
// Each thread calls latch.countDown()
latch.await(); // Wait for all threads
\`\`\`

### Semaphore
Limit concurrent access:
\`\`\`java
Semaphore semaphore = new Semaphore(5); // Max 5 concurrent
semaphore.acquire();
try {
    // Critical section
} finally {
    semaphore.release();
}
\`\`\`

### CompletableFuture
Async programming made easy:
\`\`\`java
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> processData(data))
    .thenAccept(result -> saveResult(result))
    .exceptionally(ex -> handleError(ex));
\`\`\`

## Common Concurrency Issues

### 1. Race Conditions
Multiple threads access shared data without proper synchronization.

**Solution:** Use synchronization or atomic variables.

### 2. Deadlock
Two or more threads wait for each other indefinitely.

**Solution:** 
- Always acquire locks in the same order
- Use tryLock with timeout

### 3. Thread Starvation
A thread is unable to gain access to shared resources.

**Solution:** Use fair locks or proper thread priorities.

### 4. Memory Visibility
Changes made by one thread aren't visible to other threads.

**Solution:** Use volatile keyword or proper synchronization.

## Best Practices

1. **Prefer ExecutorService over raw Threads**
2. **Use concurrent collections** instead of synchronized wrappers
3. **Minimize synchronization scope** - Keep synchronized blocks small
4. **Use immutable objects** when possible
5. **Prefer higher-level abstractions** (CompletableFuture, Streams)
6. **Always handle InterruptedException** properly
7. **Use thread pools** with appropriate sizes
8. **Test concurrent code thoroughly**

## Virtual Threads (Java 21+)

Virtual threads are lightweight threads that dramatically simplify concurrent programming:

\`\`\`java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            // Task code
        });
    });
} // Auto-closes and waits for all tasks
\`\`\`

## Conclusion

Concurrency is complex but essential for modern Java applications. Start with high-level abstractions like ExecutorService and CompletableFuture. As you gain experience, explore lower-level primitives. Always test concurrent code thoroughly and be aware of common pitfalls.
    `,
    createdAt: "2024-08-18",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
  },
];
