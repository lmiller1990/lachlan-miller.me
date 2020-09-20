import { walk } from "https://deno.land/std/fs/mod.ts";
import { loadAsset } from "../utils.ts";

export async function listMusings(musingsDir: string) {
  const musings: string[] = [];
  for await (const entry of walk(musingsDir)) {
    if (entry.isFile && entry.name.endsWith(".html")) {
      musings.push(entry.name);
    }
  }
  return musings;
}

export async function renderMusingsList(paths: string[]): Promise<string> {
  let musings = "";
  const template = await loadAsset(`partials/musing.html`);
  for await (const entry of paths) {
    const text = await loadAsset(`musings/${entry}`);
    const title = text.split("\n");
    let content = template.replace("{{title}}", title[0]) + title[1];
    musings += content;
  }
  return musings;
}
