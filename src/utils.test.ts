import {
  assertEquals,
  assertMatch, assertNotMatch,
} from "https://deno.land/std/testing/asserts.ts";
import { loadAsset } from "./utils.ts";
import { removeInterpolations, render } from "./controllers.ts";

Deno.test("loadAsset", async () => {
  const actual = await loadAsset("models/musings.test.ts");
  assertMatch(actual, /Deno\.test\("listMusings"/);
});

Deno.test("render", async () => {
  const actual = await render({ replace: "{{_subscribe}}", with: "templates/partials/_subscribe.html" })
  assertMatch(actual, /This is a section/)
  assertNotMatch(actual, /{{content}}/)
})

Deno.test("removeInterpolations", async () => {
  const actual = removeInterpolations('It worked.{{content}} Great!')
  assertEquals(actual, 'It worked. Great!')
})