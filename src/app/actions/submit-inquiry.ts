"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type InquiryFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const MAX = {
  name: 200,
  company: 200,
  role: 120,
  email: 320,
  phone: 80,
  city: 200,
  projectType: 120,
  quantity: 80,
  message: 8000,
} as const;

function trimStr(value: FormDataEntryValue | null, max: number): string {
  const s = typeof value === "string" ? value.trim() : "";
  return s.length > max ? s.slice(0, max) : s;
}

function isValidEmail(s: string): boolean {
  if (s.length < 3 || s.length > MAX.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function submitInquiryAction(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const name = trimStr(formData.get("name"), MAX.name);
  const email = trimStr(formData.get("email"), MAX.email);
  const phone = trimStr(formData.get("phone"), MAX.phone);
  const message = trimStr(formData.get("message"), MAX.message);

  if (!name) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (phone.length < 5) {
    return { status: "error", message: "Please enter a phone number (with country code)." };
  }

  const company = trimStr(formData.get("company"), MAX.company);
  const role = trimStr(formData.get("role"), MAX.role);
  const city = trimStr(formData.get("city"), MAX.city);
  const projectType = trimStr(formData.get("projectType"), MAX.projectType);
  const quantity = trimStr(formData.get("quantity"), MAX.quantity);

  try {
    const admin = createAdminClient();
    const { error } = await admin.from("inquiries").insert({
      name,
      company,
      role,
      email,
      phone,
      city,
      project_type: projectType,
      quantity,
      message,
    });
    if (error) {
      console.error("[submitInquiryAction]", error.message);
      return {
        status: "error",
        message: "Your inquiry could not be saved. Please try again or email us directly.",
      };
    }
    return { status: "success" };
  } catch (e) {
    console.error("[submitInquiryAction]", e);
    return {
      status: "error",
      message: "Something went wrong on our side. Please email us or try again later.",
    };
  }
}
