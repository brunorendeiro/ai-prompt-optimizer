import "server-only";

const REST_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const LOGINS_KEY = "logins";
const MAX_LOGINS = 500;

async function command(...args: (string | number)[]): Promise<unknown> {
  if (!REST_URL || !REST_TOKEN) return null;
  const path = args.map((a) => encodeURIComponent(String(a))).join("/");
  const res = await fetch(`${REST_URL}/${path}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.result;
}

export type LoginEvent = { email: string; timestamp: string };

export async function recordLogin(email: string): Promise<void> {
  const event: LoginEvent = { email, timestamp: new Date().toISOString() };
  await command("lpush", LOGINS_KEY, JSON.stringify(event));
  await command("ltrim", LOGINS_KEY, 0, MAX_LOGINS - 1);
}

export async function listLogins(limit = 100): Promise<LoginEvent[]> {
  const raw = await command("lrange", LOGINS_KEY, 0, limit - 1);
  if (!Array.isArray(raw)) return [];
  return raw
    .map((r) => {
      try {
        return JSON.parse(r as string) as LoginEvent;
      } catch {
        return null;
      }
    })
    .filter((e): e is LoginEvent => e !== null);
}
