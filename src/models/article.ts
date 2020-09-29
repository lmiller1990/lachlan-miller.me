import { loadAsset } from "../utils.ts"
import { interpolate } from "../controllers.ts"
import { articles } from "../articles.ts"

export interface Article {
  title: string
  slug: string
  published: string
  description: string
}

export function articleMeta(article?: Article): string {
  if (!article) {
    return ''
  }

  return `
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@Lachlan19900" />
    <meta name="twitter:title" content="${article.title}" />
    <meta name="twitter:description" content="${article.description}" />
    <meta og:description="${article.description}" />
    <meta og:title="${article.title}" />
  `
}

export async function articlePreview(article: Article): Promise<string> {
  const articlePreviewTemplate = await loadAsset("templates/partials/_article.html")
  const html = interpolate(articlePreviewTemplate,
    { replace: '{{title}}', with: article.title },
    { replace: '{{slug}}', with: article.slug },
    { replace: '{{description}}', with: article.description },
    { replace: '{{published}}', with: article.published },
  )
  return html
}

export async function articleList(): Promise<string[]> {
  return Promise.all(articles.map(articlePreview))
}