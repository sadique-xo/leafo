import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RevealStagger } from "@/components/motion/reveal-stagger";
import { projectsPage } from "@/data/site-content";
import { getPublishedProjects, hasProjects } from "@/lib/cms/get-projects";

export const metadata: Metadata = {
  title: "Projects — LEAFO installations",
  description:
    "Selected LEAFO planter installations across residential, hospitality, workplace, and landscape projects in India.",
};

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
            className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((p) => (
              <article key={p.id} data-stagger-item>
                <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--surface-strong)]">
                  {p.imageSrc ? (
                    <Image
                      src={p.imageSrc}
                      alt={p.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <h2 className="font-display mt-4 text-xl text-[color:var(--charcoal)]">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              </article>
            ))}
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
