/**
 * Create or update the single CMS admin Auth user from ADMIN_EMAIL / ADMIN_PASSWORD.
 * Run: `npm run setup:admin`
 */
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

if (existsSync(join(root, ".env.local"))) {
  dotenv.config({ path: join(root, ".env.local") });
}
dotenv.config({ path: join(root, ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "";

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local");
  process.exit(1);
}

if (password.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters");
  process.exit(1);
}

const admin = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function findUserIdByEmail(targetEmail) {
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find((user) => user.email?.toLowerCase() === targetEmail);
    if (match) return match.id;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

const existingId = await findUserIdByEmail(email);

if (existingId) {
  const { error } = await admin.auth.admin.updateUserById(existingId, {
    password,
    email_confirm: true,
  });
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  console.log("Updated password for existing admin user.");
} else {
  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  console.log("Created admin user.");
}

console.log("Sign in at /admin/login with ADMIN_EMAIL and ADMIN_PASSWORD from .env.local.");
