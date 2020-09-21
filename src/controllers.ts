import {
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { listMusings, renderMusingsList } from "./models/musings.ts";
import { processMeta } from "./router.ts";
import { loadAsset } from "./utils.ts";

export interface RequestMeta {
  params: string[];
}

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

export const screencasts = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/screencasts.html" },
  );
  req.respond({ body });
};

export const contact = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/contact.html" },
  );
  req.respond({ body });
};

export const musingGet = async (req: ServerRequest) => {
  const { params } = processMeta(req.url, /musings\/(.*)/);
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: `musings/${params[0]}.html` },
  );
  req.respond({ body });
};

export const musings = async (req: ServerRequest, meta?: RequestMeta) => {
  req.headers.append("Content-Type", "text/html");
  const musingsList = await listMusings("./src/musings");
  const rendered = await renderMusingsList(musingsList);
  const template = await render(
    { replace: "{{content}}", with: "views/musings.html" },
  );
  const body = template.replace("{{posts}}", rendered);
  req.respond({ body });
};
