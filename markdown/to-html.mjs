import fs from "fs";
import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";
import path from "path";
import markdownItLatex from "markdown-it-latex";
import highlightLines from "markdown-it-highlight-lines";
import hljs from "highlight.js";

import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
/**
 * Usage:
 * yarn ts-node markdown/to-html.ts articles/markdown/vue-pdf-custom-renderer.md
 */

async function main() {
  const article = process.argv.slice(2)[0];

  // Actual default values
  const md = MarkdownIt({
    // highlight: function (str, lang) {
    //   if (lang && hljs.getLanguage(lang)) {
    //     try {
    //       return (
    //         '<pre class="hljs"><code>' +
    //         hljs.highlight(lang, str, true).value +
    //         "</code></pre>"
    //       );
    //     } catch (__) {}
    //   }
    //   return (
    //     '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    //   );
    // },
  });

  md.use(markdownItLatex.default);

  md.use(
    await Shiki({
      fallbackLanguage: "sh",
      themes: {
        light: "github-dark",
        dark: "github-dark",
      },
    })
  );

  md.use(highlightLines);

  const str = fs.readFileSync(article, "utf8");
  const out = md.render(str);
  const base = path.basename(article);

  const name = base.replace(".md", "");
  const t = path.join(
    __dirname,
    "..",
    "app",
    "public",
    "articles",
    `${name}.html`
  );
  console.log(`Writing to ${t}`);

  fs.writeFileSync(t, out);
  // process.stdout.write(out)
}

main();
