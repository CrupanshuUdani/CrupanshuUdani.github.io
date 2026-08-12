import { z } from "zod";

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
  detail: z.string(),
});

export const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  location: z.string(),
  period: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const projectSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  period: z.string().optional(),
  stack: z.array(z.string()),
  links: z.array(linkSchema),
  featured: z.boolean(),
});

export const skillGroupSchema = z.object({
  title: z.string(),
  skills: z.array(z.string()),
});

export const certificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  issued: z.string(),
  skills: z.array(z.string()),
});

export const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  period: z.string(),
  detail: z.string(),
});

export const noteSchema = z.object({
  title: z.string(),
  source: z.string(),
  href: z.string(),
  date: z.string(),
});

export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string(),
    title: z.string(),
    headline: z.string(),
    location: z.string(),
    email: z.string(),
    availability: z.string(),
    summary: z.string(),
    rolesOfInterest: z.string(),
    links: z.array(linkSchema),
  }),
  navigation: z.array(linkSchema),
  metrics: z.array(metricSchema),
  impactNarrative: z.array(z.string()),
  about: z.array(z.string()),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skillGroups: z.array(skillGroupSchema),
  certifications: z.array(certificationSchema),
  education: z.array(educationSchema),
  notes: z.array(noteSchema),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    siteUrl: z.string(),
    ogImage: z.string(),
    ogImageWidth: z.number(),
    ogImageHeight: z.number(),
  }),
});

export type Link = z.infer<typeof linkSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Note = z.infer<typeof noteSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
