"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { toStoragePath } from "@/lib/cms/resolve-image-src";

const ADMIN = (process.env.ADMIN_EMAIL ?? "dev.leafo@gmail.com").trim().toLowerCase();

async function assertAdmin() {
  const supabase = await createClient();

  const {
    data: { user: verifiedUser },
  } = await supabase.auth.getUser();

  let email = verifiedUser?.email?.toLowerCase();

  // Server Actions often run with the same cookie jar as the page, but `getUser()` can return
  // empty here when the access token is between refresh cycles (SSR client uses autoRefreshToken: false).
  // `getSession()` reads the persisted session from cookies so we can still verify the allowlisted email.
  if (!email) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    email = session?.user?.email?.toLowerCase();
  }

  if (!email || email !== ADMIN) {
    throw new Error(
      "Unauthorized - stay signed in with the same email as ADMIN_EMAIL in .env.local (no extra spaces).",
    );
  }
}

function linesToArray(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function commaToArray(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function updateCollectionAction(formData: FormData) {
  await assertAdmin();
  const slug = String(formData.get("slug") ?? "");
  if (!slug) throw new Error("Missing slug");

  const payload = {
    name: String(formData.get("name") ?? ""),
    subtitle: String(formData.get("subtitle") ?? ""),
    category: String(formData.get("category") ?? ""),
    material: String(formData.get("material") ?? ""),
    finish: String(formData.get("finish") ?? ""),
    price_note: String(formData.get("price_note") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    sizes: linesToArray(String(formData.get("sizes") ?? "")),
    story: linesToArray(String(formData.get("story") ?? "")),
    features: linesToArray(String(formData.get("features") ?? "")),
    image_src: String(formData.get("image_src") ?? ""),
    image_alt: String(formData.get("image_alt") ?? ""),
    shapes: commaToArray(String(formData.get("shapes") ?? "")),
    finishes: commaToArray(String(formData.get("finishes") ?? "")),
    scale_tags: commaToArray(String(formData.get("scale_tags") ?? "")),
    published: formData.get("published") === "on",
  };

  const admin = createAdminClient();
  const { error } = await admin.from("collections").update(payload).eq("slug", slug);
  if (error) throw error;
  updateTag("collections");
}

export async function uploadCollectionImageAction(formData: FormData) {
  await assertAdmin();
  const slug = String(formData.get("slug") ?? "");
  const file = formData.get("file");
  if (!slug || !(file instanceof File) || file.size === 0) {
    throw new Error("Missing slug or file");
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = toStoragePath("collections", `${slug}-${Date.now()}.${ext || "jpg"}`);
  const buf = Buffer.from(await file.arrayBuffer());

  const admin = createAdminClient();
  const { error: upErr } = await admin.storage.from("media").upload(path, buf, {
    contentType: file.type || "image/jpeg",
    upsert: true,
  });
  if (upErr) throw upErr;

  const { error: dbErr } = await admin
    .from("collections")
    .update({ image_src: path, updated_at: new Date().toISOString() })
    .eq("slug", slug);
  if (dbErr) throw dbErr;
  updateTag("collections");
}

export async function createProjectAction(formData: FormData) {
  await assertAdmin();
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!slug || !title) throw new Error("Slug and title required");

  const admin = createAdminClient();
  const { data: created, error } = await admin.from("projects").insert({
    slug,
    title,
    summary: String(formData.get("summary") ?? ""),
    body: String(formData.get("body") ?? "") || null,
    image_src: String(formData.get("image_src") ?? ""),
    image_alt: String(formData.get("image_alt") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 0),
    published: formData.get("published") === "on",
  }).select("id").single();
  if (error) throw error;
  updateTag("projects");
  redirect(`/admin/projects/${created.id}/edit`);
}

export async function updateProjectAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  const payload = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? ""),
    body: String(formData.get("body") ?? "") || null,
    image_src: String(formData.get("image_src") ?? ""),
    image_alt: String(formData.get("image_alt") ?? ""),
    sort_order: Number(formData.get("sort_order") ?? 0),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  const admin = createAdminClient();
  const { error } = await admin.from("projects").update(payload).eq("id", id);
  if (error) throw error;
  updateTag("projects");
}

export async function uploadProjectImageAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const file = formData.get("file");
  if (!id || !(file instanceof File) || file.size === 0) {
    throw new Error("Missing id or file");
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = toStoragePath("projects", `${id.slice(0, 8)}-${Date.now()}.${ext || "jpg"}`);
  const buf = Buffer.from(await file.arrayBuffer());

  const admin = createAdminClient();
  const { error: upErr } = await admin.storage.from("media").upload(path, buf, {
    contentType: file.type || "image/jpeg",
    upsert: true,
  });
  if (upErr) throw upErr;

  const { error: dbErr } = await admin
    .from("projects")
    .update({ image_src: path, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (dbErr) throw dbErr;
  updateTag("projects");
}

export async function deleteProjectAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  const admin = createAdminClient();
  const { error } = await admin.from("projects").delete().eq("id", id);
  if (error) throw error;
  updateTag("projects");
}

export async function deleteInquiryAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  const admin = createAdminClient();
  const { error } = await admin.from("inquiries").delete().eq("id", id);
  if (error) throw error;
  redirect("/admin/inquiries");
}
