import {
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { articleList, articleMeta } from "./models/article.ts";
import { listMusings, renderMusingsList } from "./models/musings.ts";
import { processMeta } from "./router.ts";
import { loadAsset } from "./utils.ts";
import { articles as allArticles } from './articles.ts'

export interface RequestMeta {
  params: string[];
}

interface Replacer {
  replace: string;
  with: string;
}

export function removeInterpolations(str: string): string {
  return str.replaceAll(/\{\{(?!\s).*\}/gi, '')
}

export async function render(...replacers: Replacer[]): Promise<string> {
  let html = await loadAsset("templates/index.html")

  for (const replacer of replacers) {
    try {
      const content = await loadAsset(replacer.with)
      html = html.replaceAll(replacer.replace, content);
    } catch (e) {
      throw Error(e);
    }
  }
  return html
}

export function interpolate(base: string, ...replacers: Replacer[]): string {
  let html = base
  for (const replacer of replacers) {
    try {
      html = html.replaceAll(replacer.replace, replacer.with);
    } catch (e) {
      throw Error(e);
    }
  }
  return html
}

export const root = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  let body = await render(
    { replace: "{{content}}", with: "views/index.html" },
  );
  req.respond({ body: removeInterpolations(body) });
};

export const articles = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  let body = await render(
    { replace: "{{content}}", with: "views/articles.html" },
  );
  const allArticlesHtml = await articleList()
  console.log('body', body)
  body = interpolate(body, { replace: "{{articles}}", with: allArticlesHtml.join('') })
  req.respond({ body: removeInterpolations(body) });
};

export const articleGet = async (req: ServerRequest) => {
  const { params } = processMeta(req.url, /articles\/(.*)/);
  req.headers.append("Content-Type", "text/html");
  let body = await render(
    { replace: "{{content}}", with: `articles/${params[0]}.html` },
    { replace: "{{_subscribe}}", with: `templates/partials/_subscribe.html` },
  );
  body = interpolate(body, { replace: '{{meta}}' , with: articleMeta(allArticles.find(x => x.slug === params[0])) })
  req.respond({ body: removeInterpolations(body) });
};

export const projects = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/projects.html" },
  );
  req.respond({ body: removeInterpolations(body) });
};

export const screencasts = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/screencasts.html" },
  );
  req.respond({ body: removeInterpolations(body) });
};

export const contact = async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: "views/contact.html" },
  );
  req.respond({ body: removeInterpolations(body) });
};

export const musingGet = async (req: ServerRequest) => {
  const { params } = processMeta(req.url, /musings\/(.*)/);
  req.headers.append("Content-Type", "text/html");
  const body = await render(
    { replace: "{{content}}", with: `musings/${params[0]}.html` },
  );
  req.respond({ body: removeInterpolations(body) });
};

export const musings = async (req: ServerRequest, meta?: RequestMeta) => {
  req.headers.append("Content-Type", "text/html");
  const musingsList = await listMusings("./src/musings");
  const rendered = await renderMusingsList(musingsList);
  const template = await render(
    { replace: "{{content}}", with: "views/musings.html" },
  );
  const body = template.replace("{{posts}}", rendered);
  req.respond({ body: removeInterpolations(body) });
};
