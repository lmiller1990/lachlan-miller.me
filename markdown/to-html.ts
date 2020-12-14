import fs from 'fs'
import MarkdownIt from 'markdown-it'
// @ts-ignore
import highlightLines from 'markdown-it-highlight-lines'
import hljs from 'highlight.js'

/**
 * Usage:
 * yarn ts-node markdown/to-html.ts articles/markdown/vue-pdf-custom-renderer.md
 */

const article = process.argv.slice(2)[0]

// Actual default values
const md: any = MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

md.use(highlightLines)

const str = fs.readFileSync(article, 'utf8')
const out = md.render(str)
process.stdout.write(out)