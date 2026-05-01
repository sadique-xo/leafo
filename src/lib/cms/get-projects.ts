import { unstable_cache } from "next/cache";
import { resolveImageSrc } from "@/lib/cms/resolve-image-src";
import { createPublicClient } from "@/lib/supabase/public";

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string | null;
  imageSrc: string;
  imageAlt: string;
  sortOrder: number;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string | null;
  image_src: string;
  image_alt: string;
  sort_order: number;
};

async function fetchPublishedProjects(): Promise<ProjectItem[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return [];
    }

    return (data as ProjectRow[]).map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      body: row.body,
      imageSrc: resolveImageSrc(row.image_src),
      imageAlt: row.image_alt,
      sortOrder: row.sort_order,
    }));
  } catch {
    return [];
  }
}

export const getPublishedProjects = unstable_cache(
  fetchPublishedProjects,
  ["published-projects"],
  { tags: ["projects"] },
);

export function hasProjects(projects: ProjectItem[]): boolean {
  return projects.length > 0;
}
