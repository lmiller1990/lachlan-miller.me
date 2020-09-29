import { Article } from './models/article.ts'

export const articles: Article[] = [
  {
    title: "Patterns for Testing Props",
    slug: "patterns-for-testing-props",
    published: "2020-09-22",
    description: "Learn about testing props in Vue apps, and how testing props can verify whether you are correctly separating your business logic and your UI.",
  },
  {
    title: "Patterns for Testing Events",
    slug: "patterns-for-testing-events",
    published: "2020-09-29",
    description: "Some patterns, tips and tricks for consistency and reliability when emitting events in Vue components.",
  }
]