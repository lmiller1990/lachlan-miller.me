export interface Article {
  title: string
  slug: string
  published: string
  description: string
  image?: string
}

export const articles: Article[] = [
  {
    title: "Decoding Variable Length Quantity (VLQ) for Source Maps",
    slug: "decoding-variable-length-quantity-vlq-for-source-maps",
    published: "2021-01-19",
    description: "Write a function to decode source map variable length quantity (VLQ).",
    image: "https://images.unsplash.com/photo-1569605803663-e9337d901ff9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"
  },
  {
    title: "A Futuristic Functional Language for Web Dev - ESNext Pipelines",
    slug: "esnext-pipelines",
    published: "2021-01-08",
    description: "Learn about the completing proposals for the pipeline operator in JavaScript.",
    image: "https://images.unsplash.com/photo-1538474705339-e87de81450e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
  },
  {
    title: "PDF Customer Renderer for Vue.js 3",
    slug: "vue-3-pdf-customer-renderer",
    published: "2020-12-14",
    description: "Create a custom PDF renderer using Vue.js 3's new modular architecture.",
    image: "https://images.unsplash.com/photo-1582184081605-053a591eef94?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fG1hcmtlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  },
  {
    title: "Mocking Lower Layers for Better Test Coverage and Confidence",
    slug: "mocking-lower-layers-for-better-test-coverage-and-confidence",
    published: "2020-11-22",
    description: "Stop mocking Vuex! Improve your test coverage and confidence with Mock Server Worker.",
    image: "https://images.unsplash.com/photo-1596729889508-9b4c7a1f647a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBvZiUyMGNhcmRzfGVufDB8fDB8&auto=format&fit=crop&w=900&q=60"
  },
  {
    title: "Cypress, Docker and X11",
    slug: "cypress-x11-docker",
    published: "2020-11-19",
    description: "Set up the Cypress interactive runner to work with X11 in Docker.",
    image: "https://images.unsplash.com/photo-1512419944406-9e8e4d4fee8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
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
