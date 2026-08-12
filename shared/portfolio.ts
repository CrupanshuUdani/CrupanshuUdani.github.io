import type { Portfolio } from "./schema";

/*
 * Portfolio content source of truth for GitHub Pages.
 *
 * GitHub Pages is static hosting, so it cannot run the Express backend used by
 * the private preview. This shared module keeps the site modular: edit this file
 * to add, remove, reorder, or revise sections, then rebuild and push.
 */
const ROLES_OF_INTEREST = "SRE, production engineering, platform engineering, and AI infrastructure";

export const portfolio: Portfolio = {
  profile: {
    name: "Crupanshu Udani",
    title: "Production Engineer | Reliability & Core Infrastructure (Ex-Meta)",
    headline: "Production engineer building toward AI infrastructure and MLOps.",
    location: "San Francisco Bay Area",
    email: "crupanshu.udani@gmail.com",
    availability: `Currently pursuing an MBA and a self-directed MLOps transition; open to conversations about ${ROLES_OF_INTEREST} roles.`,
    summary:
      "Production engineer with three years at Meta building and operating Tier-0 distributed systems, now pairing that operational foundation with an MBA and a self-directed MLOps transition aimed at reliability engineering, MLOps, and AI infrastructure roles.",
    rolesOfInterest: ROLES_OF_INTEREST,
    links: [
      { label: "GitHub", href: "https://github.com/CrupanshuUdani" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/crupanshu-udani/" },
      { label: "Email", href: "mailto:crupanshu.udani@gmail.com" },
    ],
  },
  navigation: [
    { label: "About", href: "#about" },
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
      detail: "Servers across the Tier-0 distribution and indexing systems this role supported.",
    },
    {
      value: "10+ PB",
      label: "Indexed daily",
      detail: "Data indexed daily across Meta's distributed storage and indexing systems.",
    },
    {
      value: "10x",
      label: "Faster turnup",
      detail: "Automation improvements for region and cluster turnup workflows.",
    },
    {
      value: "3-10m",
      label: "Distribution time",
      detail: "Reduced remote storage distribution from 45-80 minutes to 3-10 minutes by moving from a push-based to a pull-based model.",
    },
    {
      value: "0.8 MW/hr",
      label: "Power savings",
      detail: "Autoscaling improvements cut wasted compute capacity, saving an estimated 0.8 MW/hr across the fleet.",
    },
  ],
  impactNarrative: [
    "Owned uptime and latency for Tier-0 services where an outage or a slow response propagates directly into product-facing failures.",
    "Replaced manual, error-prone operational workflows with automation, autoscaling, and proactive monitoring, cutting toil and incident response time.",
    "Raised developer velocity by building staging environments, internal tooling, and testing frameworks that other engineers relied on daily.",
  ],
  about: [
    "I spent nearly three years as a Production Engineer inside Meta's Core Infra org, on the Core Data team, keeping Tier-0 services healthy at roughly 10 billion queries per second and 10+ petabytes indexed daily. That foundation was built earlier at Infosys, shipping and maintaining an internet banking platform, and through a Master's in Computer Science at UT Arlington focused on databases and intelligent systems.",
    "I'm currently pursuing an MBA at Westcliff University (started January 2026) alongside a self-directed MLOps transition through InterviewKickstart, pairing Meta's production-systems discipline with machine learning infrastructure and the business judgment to make platform investment decisions. I'm building toward roles at the intersection of reliability engineering, MLOps, and AI infrastructure.",
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
        "Built monitoring and intelligent alerting for storage issues, usage spikes, and high-demand events such as New Year's traffic surges.",
        "Handled incident triage, resolution, RCA, capacity planning, forecasting, and autoscaling to maintain SLOs.",
      ],
      technologies: ["Python", "C/C++", "Shell", "Hive", "Spark", "Memcached", "CacheLib", "Mercurial", "Docker", "Kubernetes", "RocksDB"],
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
        "Built and modified features across messaging, persistence, and integration layers using RabbitMQ, Kafka, Hibernate, MongoDB and MySQL.",
      ],
      technologies: ["Java", "Spring Cloud", "RabbitMQ", "Hibernate", "Kafka", "Machine Learning", "MySQL", "MongoDB"],
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
        "Gathered requirements and implemented feature modules for core banking workflows, working directly with client stakeholders on design proposals.",
        "Led migration of a legacy module to a modernized architecture with minimal disruption to live banking operations.",
        "Raised team engineering velocity through internal tooling, unit and automation testing, and CI/CD adoption.",
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
        "Computer vision pipeline for detecting dogs and cats in CAD-model-derived images, covering data preprocessing, model training, and evaluation.",
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
        "Cluster analysis on five years of unstructured Texas weather data (2006-2010) to group stations by shared weather behavior.",
      period: "October 2020 - November 2020",
      stack: ["Data Analysis", "Clustering", "Weather Data"],
      links: [{ label: "Repository", href: "https://github.com/CrupanshuUdani/Weather-Data-Texas" }],
      featured: false,
    },
    {
      name: "Bank Marketing Dataset Analysis",
      tagline: "Applied analytics on marketing outcomes",
      description:
        "Data analysis project identifying which customer and campaign attributes correlated with marketing outcomes in a bank marketing dataset.",
      stack: ["Data Analysis", "Machine Learning", "Research"],
      links: [{ label: "Repository", href: "https://github.com/CrupanshuUdani/Bank-Marketing-Dataset-Analysis" }],
      featured: false,
    },
    {
      name: "CyberSecurityCourse",
      tagline: "Security coursework and applied learning",
      description:
        "Public coursework repository from a CodePath cybersecurity course, covering applied exercises in security fundamentals.",
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
      title: "AI/ML & MLOps foundations",
      skills: ["MLOps", "Deep Learning", "Big data & data science fundamentals", "Computer Vision", "Model deployment"],
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
      institution: "Westcliff University",
      degree: "Master of Business Administration",
      period: "Jan 2026 - Present",
      detail: "MBA coursework paired with a self-directed MLOps transition, building toward AI/ML infrastructure roles.",
    },
    {
      institution: "The University of Texas at Arlington",
      degree: "Master of Science, Artificial Intelligence / Computer Science",
      period: "Aug 2020 - May 2022",
      detail: "Specialization in Database and Intelligent Systems; GPA 3.7/4.0.",
    },
    {
      institution: "Dharmsinh Desai University",
      degree: "Bachelor of Technology, Computer Engineering",
      period: "2013 - 2017",
      detail: "Coursework spanning software systems, programming, and applied computer engineering.",
    },
  ],
  notes: [],
  seo: {
    title: "Crupanshu Udani | Production Engineer — Reliability & Core Infrastructure",
    description:
      "Portfolio for Crupanshu Udani, a production engineer with three years at Meta building Tier-0 reliability, distributed systems, and infrastructure automation, now transitioning toward MLOps and AI infrastructure.",
    siteUrl: "https://crupanshuudani.github.io/",
    ogImage: "https://crupanshuudani.github.io/og-image.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 630,
  },
};
