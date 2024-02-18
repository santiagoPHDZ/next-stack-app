
import superjson from "superjson";
export const transformer = superjson;

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  console.log("VERCEL_URL", process.env.VERCEL_URL)
  console.log("PRODUCTION_URL", process.env.PRODUCTION_URL)
  if (process.env.PRODUCTION_URL) return `https://${process.env.PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}
