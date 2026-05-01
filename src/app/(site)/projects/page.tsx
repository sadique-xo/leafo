import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { ProjectShowcase } from "@/components/site/project-showcase";
import { projectsPage } from "@/data/site-content";
import { getPublishedProjects, hasProjects } from "@/lib/cms/get-projects";

export const metadata: Metadata = {
  title: "Projects - LEAFO installations",
  description:
    "Selected LEAFO planter installations across residential, hospitality, workplace, and landscape projects in India.",
};

/** CMS-backed list; avoid stale static shell from build-time empty cache. */
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  const showGallery = hasProjects(projects);

  return (
    <>
      <Reveal className="relative mx-auto max-w-6xl px-6 pt-10 md:pt-14">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-[color:var(--surface-strong)] md:aspect-[2.4/1]">
          <Image
            src={projectsPage.heroImageSrc}
            alt={projectsPage.heroImageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority
          />
        </div>
      </Reveal>
      <Reveal className="site-container section-space">
        <h1 className="font-display text-4xl tracking-tight text-[color:var(--charcoal)] md:text-6xl">
          {projectsPage.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {projectsPage.intro}
        </p>

        {showGallery ? (
          <RevealStagger
            staggerKey={projects.map((p) => p.id).join("-")}
            className="mt-16 md:mt-20"
          >
            <div className="flex flex-col">
              {projects.map((p, i) => (
                <ProjectShowcase key={p.id} project={p} index={i} />
              ))}
            </div>
          </RevealStagger>
        ) : (
          <>
            <p className="label-ui mt-16 text-[11px] text-muted-foreground">{projectsPage.comingLabel}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--charcoal)]">
              {projectsPage.comingBody}{" "}
              <Link href="/contact" className="link-underline-editorial label-ui text-[11px]">
                contact our team →
              </Link>
            </p>
          </>
        )}
      </Reveal>
    </>
  );
}
