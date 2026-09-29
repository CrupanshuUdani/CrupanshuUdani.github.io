import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import type { Project } from "@shared/schema";
import SectionTitle from "./SectionTitle";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={project.featured ? "panel rounded-xl p-6 md:col-span-2" : "panel rounded-xl p-6"} data-testid={`card-project-${index}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {project.featured ? "Featured project" : project.period || "Project"}
          </p>
          <h3 className="font-display mt-3 text-2xl font-extrabold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-sm font-bold text-primary">{project.tagline}</p>
        </div>
        {project.links[0] ? (
          <a
            aria-label={`Open ${project.name}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background hover-elevate active-elevate-2"
            data-testid={`link-project-${index}`}
            href={project.links[0].href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        ) : null}
      </div>
      <p className="mt-5 text-sm leading-6 text-muted-foreground">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground" key={tech}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const sortedProjects = useMemo(() => [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)), [projects]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="projects">
      <SectionTitle kicker="GitHub and research" title="Selected work that supports the infrastructure story.">
        Public GitHub repositories and academic projects are used as proof points, while private repositories stay private.
      </SectionTitle>
      <div className="grid gap-5 md:grid-cols-2">
        {sortedProjects.map((project, index) => (
          <ProjectCard index={index} key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
