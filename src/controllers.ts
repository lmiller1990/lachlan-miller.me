import {
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { loadAsset } from "./utils.ts";

interface Replacer {
  replace: string;
  with: string;
}
async function render(replacer: Replacer): Promise<string> {
  try {
    const [template, content] = await Promise.all([
      loadAsset("templates/index.html"),
      loadAsset(replacer.with),
    ]);
    return template.replace(replacer.replace, content);
  } catch (e) {
    throw Error(e);
  }
}

export const root = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/index.html" },
  );
  req.respond({ body });
};

export const articles = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/articles.html" },
  );
  req.respond({ body });
};

export const projects = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/projects.html" },
  );
  req.respond({ body });
};

export const musings = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/musings.html" },
  );
  req.respond({ body });
};
