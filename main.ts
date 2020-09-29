import {
  serve,
} from "https://deno.land/std/http/server.ts";
import {
  root,
  articles,
  projects,
  musings,
  screencasts,
  musingGet,
  contact,
  articleGet,
} from "./src/controllers.ts";
import { createRouter, EndpointHandler } from "./src/router.ts";
import { loadAsset } from "./src/utils.ts";

const server = serve({ port: 8000 });

function createApp() {
  const router = createRouter();

  return {
    router,
    get: (path: string, handler: EndpointHandler) => {
      router.register(path, handler);
    },
  };
}

const app = createApp();

app.router.register("/", root);
app.router.register("/articles", articles);
app.router.register(/articles\/(.*)/, articleGet);
app.router.register("/projects", projects);
app.router.register(/musings\/(.*)/, musingGet);
app.router.register(/musings/, musings);
app.router.register("/screencasts", screencasts);
app.router.register("/contact", contact);

for await (const req of server) {
  try {
    const route = app.router.route(req.url);
    if (route) {
      route.handler(req);
    } else if (req.url.endsWith(".css")) {
      const css = await loadAsset(req.url);
      req.headers.append("Content-Type", "text/css");
      req.respond({ body: css });
    } else {
      console.log(`[LOG]: 404 when requesting ${req.url}`);
      req.respond({ body: "404" });
    }
  } catch (e) {
    // ...
  }
}
