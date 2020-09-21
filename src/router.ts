import {
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { RequestMeta } from "./controllers.ts";

export type EndpointHandler = (req: ServerRequest) => void;

export interface Route {
  path: string;
  method: "get" | "post";
  callback: (req: ServerRequest, meta?: RequestMeta) => void;
}

export function processMeta(url: string, matcher: RegExp): RequestMeta {
  const match = url.match(matcher);
  if (match && match[1]) {
    const [_, ...matches] = match;
    return {
      params: matches,
    };
  }

  return {
    params: [],
  };
}

export interface RouteDefinition<T extends Function = Function> {
  match: RegExp | string;
  method: "GET";
  handler: T;
}

export function createRouter<T extends Function>() {
  const routes: RouteDefinition<T>[] = [];

  return {
    route: (path: string) => {
      return routes.find((route) => {
        if (typeof route.match === "string") {
          return route.match === path;
        }
        // Regexp
        return path.match(route.match);
      });
    },
    register: (path: RegExp | string, handler: T) => {
      routes.push({
        match: path,
        method: "GET",
        handler,
      });
    },
  };
}
