import {
  serve,
} from "https://deno.land/std/http/server.ts";
import {
  root,
  articles,
  projects,
  musings,
  screencasts,
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
app.router.register("/projects", projects);
app.router.register("/musings", musings);
app.router.register("/screencasts", screencasts);

for await (const req of server) {
  if (app.router.routes[req.url]) {
    app.router.routes[req.url].callback(req);
  } else if (req.url.endsWith(".css")) {
    const css = await loadAsset(req.url);
    req.headers.append("Content-Type", "text/css");
    req.respond({ body: css });
  } else {
    console.log(`[LOG]: 404 when requesting ${req.url}`);
    req.respond({ body: "404" });
  }
}
