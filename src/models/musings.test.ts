import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { listMusings } from "./musings.ts";

Deno.test("listMusings", async () => {
  const expected = ["test-post.html"];
  const actual = await listMusings("./tmp");

  assertEquals(actual, expected);
});
