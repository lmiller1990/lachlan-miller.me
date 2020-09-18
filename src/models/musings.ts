import { walk } from "https://deno.land/std/fs/mod.ts";

export async function listMusings(musingsDir: string) {
  const musings: string[] = [];
  for await (const entry of walk(musingsDir)) {
    if (entry.isFile && entry.name.endsWith(".html")) {
      musings.push(entry.name);
    }
  }
  return musings;
}
