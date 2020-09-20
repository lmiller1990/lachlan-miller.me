import {
  assertMatch
} from "https://deno.land/std/testing/asserts.ts";
import { loadAsset } from "./utils.ts"

Deno.test("loadAsset", async () => {
  const actual = await loadAsset("models/musings.test.ts")
  assertMatch(actual, /Deno\.test\("listMusings"/)
})