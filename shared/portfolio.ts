import type { Portfolio } from "./schema";

/*
 * Portfolio content source of truth for GitHub Pages.
 *
 * GitHub Pages is static hosting, so it cannot run the Express backend used by
 * the private preview. This shared module keeps the site modular: edit this file
 * to add, remove, reorder, or revise sections, then rebuild and push.
 */
export const portfolio: Portfolio = {
  profile: {
    name: "Crupanshu Udani",
    title: "Production Engineer | Reliability Engineering | Ex-Meta Core Infra/Data",
    headline: "Production engineer for low-latency, high-frequency infrastructure.",
    location: "San Francisco Bay Area",
    email: "crupanshu.udani@gmail.com",
    availability: "Open to SRE, production engineering, platform, and AI infrastructure roles.",
    summary:
      "Systems engineer with a foundation in backend systems, distributed computing, and infrastructure engineering. I focus on reliability, scalability, automation, and performance for critical services where correctness, latency, and operational clarity matter.",
    links: [
      { label: "GitHub", href: "https://github.com/CrupanshuUdani" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/crupanshu-udani/" },
      { label: "Email", href: "mailto:crupanshu.udani@gmail.com" },
    ],
  },
  navigation: [
    { label: "Impact", href: "#impact" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  metrics: [
    {
      value: "~10B",
      label: "QPS supported",
      detail: "Tier-0 distributed counter services used across Meta's server fleet.",
    },
    {
      value: "~100K",
      label: "Servers",
      detail: "Infrastructure footprint across low-latency distribution and indexing systems.",
    },
    {
      value: "10+ PB",
      label: "Indexed daily",
      detail: "Data warehouse traffic served through high-frequency distributed systems.",
    },
    {
      value: "10x",
      label: "Faster turnup",
      detail: "Automation improvements for region and cluster turnup workflows.",
    },
    {
      value: "3-10m",
      label: "Distribution time",
      detail: "Reduced remote storage distribution from 45-80 minutes.",
    },
    {
      value: "0.8 MW/hr",
      label: "Power savings",
      detail: "Autoscaling work improved capacity efficiency and infrastructure cost posture.",
    },
  ],
  impactNarrative: [
    "Owned reliability, scalability, and performance for services where outages and delays directly affect production infrastructure.",
    "Reduced operational toil by replacing manual and slow workflows with automation, autoscaling, and proactive monitoring.",
    "Improved developer productivity through staging environments, tooling, testing frameworks, and cross-functional collaboration.",
  ],
  experience: [
    {
      role: "Production Engineer",
      company: "Meta Platforms, Inc.",
      location: "Menlo Park, CA",
      period: "July 2022 - April 2025",
      summary:
        "Core Infra/Core Data production engineering across Tier-0 counter, distribution, and indexing services serving low-latency, high-frequency workloads.",
      highlights: [
        "Managed reliability, scalability, and performance for systems supporting ~10B QPS and indexing 10+ PB of data daily.",
        "Built automation for region and cluster turnup, making turnup workflows 10x faster.",
        "Moved remote data storage distribution from a push-based model to a pull-based model, reducing distribution time from 45-80 minutes to 3-10 minutes.",
        "Created monitoring and intelligent alerting for storage issues, proactive usage shifts, and high-demand events such as New Year's traffic surges.",
        "Handled incident triage, resolution, RCA, capacity planning, forecasting, and service autoscaling to maintain service SLOs.",
      ],
      technologies: ["Python", "C/C++", "Shell", "Hive", "Spark", "Memcached", "CacheLib", "Mercurial"],
    },
    {
      role: "Software Engineering Intern",
      company: "Copart Inc.",
      location: "Dallas, TX",
      period: "January 2022 - May 2022",
      summary:
        "Modified and extended Java-based applications while collaborating with program managers, business analysts, and technical leads.",
      highlights: [
        "Worked across requirements analysis, application development, and existing-system improvements.",
        "Used modern backend and integration technologies including messaging, persistence, and machine learning-adjacent tooling.",
      ],
      technologies: ["Java", "Spring Cloud", "RabbitMQ", "Hibernate", "Kafka", "Machine Learning", "MySQL"],
    },
    {
      role: "Student Assistant, Web Developer",
      company: "The University of Texas at Arlington",
      location: "Arlington, TX",
      period: "April 2021 - February 2022",
      summary:
        "Supported web development for the Office of the Provost and Academic Affairs while completing graduate study.",
      highlights: [
        "Delivered web development tasks in an academic environment with multiple stakeholders.",
        "Balanced production web work with graduate coursework in AI, databases, and intelligent systems.",
      ],
      technologies: ["Web Development", "Accessibility", "Content Updates", "Stakeholder Collaboration"],
    },
    {
      role: "Senior System Engineer / System Engineer",
      company: "Infosys Ltd.",
      location: "Bengaluru, India",
      period: "September 2017 - August 2020",
      summary:
        "Full-stack engineering for an internet banking platform in a distributed Agile environment with direct client exposure.",
      highlights: [
        "Gathered client requirements, proposed high-level designs, and implemented feature modules for banking workflows.",
        "Led migration of a legacy platform to a newer architecture with minimal disruption to operations.",
        "Improved engineering productivity through tooling, scripting, unit testing, automation testing, and CI/CD practices.",
      ],
      technologies: ["React", "JavaScript", "jQuery", "J2EE", "Spring Boot", "IBM WebSphere", "Tomcat", "MSSQL", "Git"],
    },
  ],
  projects: [
    {
      name: "SRE Interview Prep Guide",
      tagline: "Reliability engineering preparation system",
      description:
        "A curated guide for SRE interview preparation, capturing reliability concepts, systems thinking, and production-readiness patterns.",
      stack: ["SRE", "Distributed Systems", "Interview Prep"],
      links: [{ label: "Repository", href: "https://github.com/CrupanshuUdani/sre-interview-prep-guide" }],
      featured: true,
    },
    {
      name: "Image Detection from CAD Models",
      tagline: "Computer vision and model-based image detection",
      description:
        "Repository containing partially trained models for image detection work using CAD-model-derived images of dogs and cats.",
      stack: ["Jupyter Notebook", "Computer Vision", "Deep Learning"],
      links: [{ label: "Repository", href: "https://github.com/CrupanshuUdani/Image-Detection-from-CAD-models" }],
      featured: true,
    },
    {
      name: "Exploring Image Super-Resolution Methods",
      tagline: "CNN and GAN-based super-resolution research",
      description:
        "Research project analyzing CNN and GAN-based techniques for image super-resolution, with parameter optimization to improve output quality.",
      period: "February 2021 - May 2021",
      stack: ["AI", "Computer Vision", "CNN", "GAN"],
      links: [],
      featured: true,
    },
    {
      name: "Texas Weather Data Analysis",
      tagline: "Clustering analysis on state weather patterns",
      description:
        "Cluster analysis on unstructured Texas weather data from 2006-2010 to uncover meaningful patterns across weather features.",
      period: "October 2020 - November 2020",
      stack: ["Data Analysis", "Clustering", "Weather Data"],
      links: [{ label: "Repository", href: "https://github.com/CrupanshuUdani/Weather-Data-Texas" }],
      featured: false,
    },
    {
      name: "Bank Marketing Dataset Analysis",
      tagline: "Applied analytics on marketing outcomes",
      description:
        "Data analysis project focused on extracting patterns from bank marketing data and understanding campaign-related outcomes.",
      stack: ["Data Analysis", "Machine Learning", "Research"],
      links: [{ label: "Repository", href: "https://github.com/CrupanshuUdani/Bank-Marketing-Dataset-Analysis" }],
      featured: false,
    },
    {
      name: "CyberSecurityCourse",
      tagline: "Security coursework and applied learning",
      description:
        "Public coursework repository from a CodePath cybersecurity course, reflecting applied security learning and practice.",
      stack: ["Cybersecurity", "Coursework", "Security Fundamentals"],
      links: [{ label: "Repository", href: "https://github.com/CrupanshuUdani/CyberSecurityCourse" }],
      featured: false,
    },
  ],
  skillGroups: [
    {
      title: "Reliability & operations",
      skills: ["SLO ownership", "Incident response", "RCA", "Monitoring", "Alerting", "Capacity planning", "Autoscaling"],
    },
    {
      title: "Infrastructure & data systems",
      skills: ["Distributed systems", "Storage optimization", "Hive", "Spark", "Kafka", "Memcached", "CacheLib", "Docker", "Kubernetes", "Terraform"],
    },
    {
      title: "Programming",
      skills: ["Python", "C/C++", "Java", "Shell scripting", "JavaScript", "React"],
    },
    {
      title: "Databases & tooling",
      skills: ["MySQL", "MSSQL", "MongoDB", "RocksDB", "Jenkins", "Git", "Mercurial", "Postman", "JUnit"],
    },
    {
      title: "Leadership signals",
      skills: ["High-level design", "Client communication", "Cross-functional collaboration", "Developer productivity", "Testing frameworks"],
    },
  ],
  certifications: [
    { name: "Learning Terraform", issuer: "LinkedIn", issued: "Aug 2025", skills: ["Terraform"] },
    { name: "Deep Learning", issuer: "The University of Texas at Arlington", issued: "May 2022", skills: ["AI", "Computer Vision"] },
    { name: "Big Data Management and Data Science", issuer: "The University of Texas at Arlington", issued: "May 2022", skills: ["Data Science", "Big Data"] },
    { name: "Apache Kafka Essential Training: Getting Started", issuer: "LinkedIn", issued: "Jan 2022", skills: ["Kafka"] },
    { name: "Python (Basic)", issuer: "HackerRank", issued: "Sep 2021", skills: ["Python"] },
    { name: "Machine Learning Course in Python and R", issuer: "Udemy Academy", issued: "Jun 2018", skills: ["Machine Learning", "Python", "R"] },
    { name: "Linux Training", issuer: "IIT Bombay", issued: "Feb 2014", skills: ["Linux"] },
  ],
  education: [
    {
      institution: "The University of Texas at Arlington",
      degree: "Master of Science, Artificial Intelligence / Computer Science",
      period: "Aug 2020 - May 2022",
      detail: "Specialization in Database and Intelligent Systems; LinkedIn profile lists GPA 3.7/4.0.",
    },
    {
      institution: "Dharmsinh Desai University",
      degree: "Bachelor of Technology, Computer Engineering",
      period: "2013 - 2017",
      detail: "Computer engineering foundation across software systems, programming, and applied engineering.",
    },
  ],
  maintenance: {
    contentModel: "Static modular portfolio data",
    editHint:
      "Edit shared/portfolio.ts to add, remove, reorder, or revise sections. GitHub Pages is static, so rebuild and push after content changes.",
  },
};
