export const en = {
  // Navbar
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
  },
  
  // Hero Section
  hero: {
    greeting: "Hi, I'm",
    name: "Dat Truong Thanh",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
  },
  
  // About Section
  about: {
    title: "About",
    heading: "I am a curious and passionate developer.",
    paragraph1: "I'm a backend engineer who thrives on designing scalable, maintainable systems. With deep expertise in Java and the Spring ecosystem, I focus on crafting clean APIs, optimizing database performance, and architecting solutions that handle real-world scale.",
    paragraph2: "My work spans RESTful API development, microservice architecture, system design, and performance optimization. I'm passionate about writing code that's not just functional, but elegant — and sharing what I learn through technical writing.",
  },
  
  // Skills Section
  skills: {
    title: "Skills",
    heading: "Tools & technologies.",
    backend: "Backend",
    database: "Database",
    devops: "DevOps",
  },
  
  // Projects Section
  projects: {
    title: "Projects",
    heading: "Selected work.",
    code: "Code",
    demo: "Demo",
    preview: "Preview",
    month: "month",
    months: "months",
    year: "year",
    years: "years",
    present: "Present",
    lessThanMonth: "< 1 month",
    overview: "Overview",
    projectInfo: "Project Information",
    customer: "Customer",
    teamSize: "Team Size",
    members: "members",
    technologies: "Technologies Used",
    backToHome: "Back to Home",
    projectNotFound: "Project Not Found",
    projectNotFoundDesc: "The project you're looking for doesn't exist.",
  },
  
  // Blog Section
  blog: {
    title: "Blog",
    heading: "Latest writing.",
    latestArticles: "Latest Articles",
    subtitle: "Thoughts on software development, architecture, and technology. Sharing knowledge and experiences from building scalable systems.",
    readMore: "Read More",
  },
  
  // Contact Section
  contact: {
    title: "Contact",
    heading: "Get in touch.",
    subtitle: "Have a project in mind or want to chat? Drop me a message or connect on social.",
    name: "Name",
    namePlaceholder: "Dat Truong Thanh",
    email: "Email",
    emailPlaceholder: "you@example.com",
    message: "Message",
    messagePlaceholder: "Your message...",
    send: "Send Message",
    successMessage: "Thanks for reaching out! (This is a demo — no message was sent.)",
  },
  
  // Footer
  footer: {
    builtWith: "Built with React, TypeScript & TailwindCSS",
    rights: "All rights reserved.",
  },
  
  // Not Found Page
  notFound: {
    title: "404",
    heading: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    backHome: "Back to Home",
  },
  
  // Language Toggle
  language: {
    english: "English",
    vietnamese: "Vietnamese",
    code: "ENG",
    codeVi: "VI",
  },
  
  // Date formatting
  date: {
    locale: "en-US",
    monthFormat: { month: "short", year: "numeric" } as const,
    fullDateFormat: { year: "numeric", month: "long", day: "numeric" } as const,
  },
};

export type TranslationKeys = typeof en;
