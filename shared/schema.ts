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

export const sectionCopySchema = z.object({
  kicker: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
});

export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    headline: z.string(),
    location: z.string(),
    availability: z.string(),
    summary: z.string(),
    rolesOfInterest: z.string(),
    links: z.array(linkSchema),
  }),
  navigation: z.array(linkSchema),
  heroPanel: z.object({
    kicker: z.string(),
    title: z.string(),
    directionLabel: z.string(),
  }),
  pages: z.object({
    writing: z.object({ title: z.string(), subtitle: z.string() }),
  }),
  sections: z.object({
    about: sectionCopySchema,
    impact: sectionCopySchema,
    experience: sectionCopySchema,
    projects: sectionCopySchema,
    skills: sectionCopySchema,
    certifications: sectionCopySchema,
    education: sectionCopySchema,
    contact: sectionCopySchema,
    writing: sectionCopySchema,
  }),
  metrics: z.array(metricSchema),
  impactNarrative: z.array(z.string()),
  about: z.array(z.string()),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skillGroups: z.array(skillGroupSchema),
  certifications: z.array(certificationSchema),
  education: z.array(educationSchema),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    siteUrl: z.string(),
    ogImage: z.string(),
    ogImageWidth: z.number(),
    ogImageHeight: z.number(),
  }),
});

export type SectionCopy = z.infer<typeof sectionCopySchema>;
export type Link = z.infer<typeof linkSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
