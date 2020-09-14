import {
  serve,
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { readStringDelim } from "https://deno.land/std/io/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import { resolve } from "https://deno.land/std@0.69.0/path/win32.ts";

const server = serve({ port: 8000 });

type EndpointHandler = (req: ServerRequest) => void;

async function loadAsset(path: string): Promise<string> {
  try {
    const filename = join(Deno.cwd(), path);
    let fileReader = await Deno.open(filename);

    let content = "";
    for await (let line of readStringDelim(fileReader, "\n")) {
      content += line + "\n";
    }

    return content;
  } catch (e) {
    throw Error(e);
  }
}

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

app.router.register("/", async (req: ServerRequest) => {
  req.headers.append("Content-Type", "text/html");
  req.respond({ body: await loadAsset("index.html") });
});

app.router.register("/hello", (req: ServerRequest) => {
  req.respond({ body: "hello world\n" });
});

for await (const req of server) {
  if (app.router.routes[req.url]) {
    app.router.routes[req.url].callback(req);
  } else if (req.url.endsWith('.css')) {
    const css = await loadAsset(req.url) 
    req.headers.append('Content-Type', 'text/css')
    req.respond({ body: css })
  } else {
    console.log(`[LOG]: 404 when requesting ${req.url}`)
    req.respond({ body: "404" });
  }
}
