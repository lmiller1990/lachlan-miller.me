export interface Article {
  title: string
  slug: string
  published: string
  description: string
  image?: string
}

export const articles: Article[] = [
  {
    title: "Patterns for Testing Props",
    slug: "patterns-for-testing-props",
    published: "2020-09-22",
    description: "Learn about testing props in Vue apps, and how testing props can verify whether you are correctly separating your business logic and your UI.",
  },
  {
    title: "Consistently and Reliably Emitting Events",
    slug: "consistently-and-reliably-emitting-events",
    published: "2020-09-29",
    description: "Some patterns, tips and tricks for consistency and reliability when emitting events in Vue components.",
  },
  {
    title: "Writing Testable Forms",
    slug: "writing-testable-forms",
    published: "2020-10-08",
    description: "Write more testable and reliable forms by isolating the business logic from the UI layer.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80"
  }
]