export interface Article {
  title: string
  slug: string
  published: string
  description: string
  image?: string
}

export const articles: Article[] = [
  {
    title: "Renderless Components Pattern in Vue.js 3",
    slug: "renderless-components-pattern-in-vue-3",
    published: "2020-11-07",
    description: "Learn about the renderless component pattern to make markup agnostic re-usable components.",
    image: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
  },
  {
    title: "Truly Modular Components with v-model",
    slug: "truly-modular-components-with-v-model",
    published: "2020-10-17",
    description: "Write a <date-time> component that is modular and reusable with any datetime library.",
    image: "https://images.unsplash.com/photo-1600152015632-77c2aa5565d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
  },
  {
    title: "Writing Testable Forms",
    slug: "writing-testable-forms",
    published: "2020-10-08",
    description: "Write more testable and reliable forms by isolating the business logic from the UI layer.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80"
  },
  {
    title: "Consistently and Reliably Emitting Events",
    slug: "consistently-and-reliably-emitting-events",
    published: "2020-09-29",
    description: "Some patterns, tips and tricks for consistency and reliability when emitting events in Vue components.",
  },
  {
    title: "Patterns for Testing Props",
    slug: "patterns-for-testing-props",
    published: "2020-09-22",
    description: "Learn about testing props in Vue apps, and how testing props can verify whether you are correctly separating your business logic and your UI.",
  }
]