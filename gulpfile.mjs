// @ts-check

import gulp from "gulp";
import chokidar from "chokidar";
import execa from "execa";

execa("node", ["./app/index.js"])
  .then(() => console.log("start on port 7001"))
  .catch(console.error);

const w = chokidar.watch("./markdown");
w.on("change", async (f) => {
  console.log(f);
  try {
    console.log("HTML...");
    const re = await execa("node", ["./markdown/to-html.mjs", f]);
  } catch (e) {
    console.log("nooo", e);
  }
});
