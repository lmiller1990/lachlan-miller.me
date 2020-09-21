import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { createRouter, processMeta } from "./router.ts";

Deno.test("processMeta", () => {
  const actual = processMeta("/musings/new-website", /musings\/(.*)/);
  assertEquals(actual, {
    params: ["new-website"],
  });
});

Deno.test("string route", () => {
  let count = 0;
  let counter = () => count += 1;

  const router = createRouter();
  router.register("/root", counter);

  router.route("/root")!.handler();
  assertEquals(count, 1);
});

Deno.test("matches regexp route with capture group", () => {
  let count = 0;
  let counter = () => count += 1;

  const router = createRouter();
  router.register(/musings\/(.*)/, counter);

  router.route("/musings/new-website")!.handler();
  assertEquals(count, 1);
});

Deno.test("matches regexp route without capture group", () => {
  let count = 0;
  let counter = () => count += 1;

  const router = createRouter();
  router.register(/musings/, counter);

  router.route("/musings")!.handler();
  assertEquals(count, 1);
});
