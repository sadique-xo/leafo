import { createAdminClient } from "@/lib/supabase/admin";
import type { CollectionRow } from "@/lib/cms/map-collection";

export async function listAllCollectionsAdmin(): Promise<CollectionRow[]> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("collections").select("*").order("slug");
  if (error) throw error;
  return (data ?? []) as CollectionRow[];
}

export async function getCollectionAdmin(slug: string): Promise<CollectionRow | null> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("collections").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as CollectionRow | null;
}

export type ProjectAdminRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string | null;
  image_src: string;
  image_alt: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export async function listAllProjectsAdmin(): Promise<ProjectAdminRow[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ProjectAdminRow[];
}

export async function getProjectAdmin(id: string): Promise<ProjectAdminRow | null> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as ProjectAdminRow | null;
}

export type InquiryAdminRow = {
  id: string;
  created_at: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  project_type: string;
  quantity: string;
  message: string;
};

export async function countInquiriesAdmin(): Promise<number> {
  const admin = createAdminClient();
  const { count, error } = await admin.from("inquiries").select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

export async function listInquiriesAdmin(): Promise<InquiryAdminRow[]> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("inquiries").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as InquiryAdminRow[];
}

export async function getInquiryAdmin(id: string): Promise<InquiryAdminRow | null> {
  const admin = createAdminClient();
  const { data, error } = await admin.from("inquiries").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as InquiryAdminRow | null;
}
