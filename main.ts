import {
  serve,
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { root, articles, projects, musings } from "./src/controllers.ts";
import { loadAsset } from "./src/utils.ts";

const server = serve({ port: 8000 });

type EndpointHandler = (req: ServerRequest) => void;

interface Route {
  path: string;
  method: "get" | "post";
  callback: (req: ServerRequest) => void;
}

function createRouter() {
  const routes: Record<string, Route> = {};

  return {
    routes,
    register: (path: string, callback: EndpointHandler) => {
      routes[path] = {
        path,
        method: "get",
        callback,
      };
    },
  };
}

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
