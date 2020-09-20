import {
  ServerRequest,
} from "https://deno.land/std/http/server.ts";

export type EndpointHandler = (req: ServerRequest) => void;

interface Route {
  path: string;
  method: "get" | "post";
  callback: (req: ServerRequest) => void;
}

export function createRouter() {
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
