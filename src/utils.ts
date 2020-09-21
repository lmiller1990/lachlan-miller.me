import { readStringDelim } from "https://deno.land/std/io/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

interface Config {
  rootDir: string;
}

async function loadConfig(): Promise<Config> {
  const text = await Deno.readTextFile("config.json");
  return JSON.parse(text);
}

export async function loadAsset(path: string): Promise<string> {
  try {
    const config = await loadConfig();
    const filename = join(Deno.cwd(), config.rootDir, ...path.split("/"));
    let fileReader = await Deno.open(filename);

    let content = "";
    for await (let line of readStringDelim(fileReader, "\n")) {
      content += line + "\n";
    }
    fileReader.close();
    return content;
  } catch (e) {
    console.log(`Could not load ${path}`);
    return loadAsset("templates/404.html");
  }
}
