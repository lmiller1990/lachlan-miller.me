import * as fs from 'fs'
import { Router, Request, Response } from 'express'
import { articles } from './models/articles'
import { musings } from './models/musings'

const router = Router()

router.use('/articles/:slug', (req: Request, res: Response) => {
  const content = fs.readFileSync(`./app/public/articles/${req.params.slug}.html`)
  const article = articles.find(x => x.slug === req.params.slug)
  res.render('articles/show', { content, article })
})

router.use('/articles', (req: Request, res: Response) => {
  res.render('articles/index', { articles })
})

router.use('/projects', (req: Request, res: Response) => {
  res.render('projects/index')
})

router.use('/books', (req: Request, res: Response) => {
  res.render('books/index')
})

router.use('/contact', (req: Request, res: Response) => {
  res.render('contact/index')
})

router.use('/vue-toronto-2020', (req: Request, res: Response) => {
  res.render('misc/vue-toronto-2020')
})

router.use('/musings/:slug', (req: Request, res: Response) => {
  const content = fs.readFileSync(`./app/public/musings/${req.params.slug}.html`)
  const musing = musings.find(x => x.slug === req.params.slug)
  res.render('musings/show', { content, musing })
})


router.use('/musings', (req: Request, res: Response) => {
  res.render('musings/index', { musings })
})

router.use('/screencasts/spreadsheet-engine-from-scratch', (req: Request, res: Response) => {
  res.render('screencasts/spreadsheet-engine-from-scratch')
})

router.use('/design-patterns-for-vuejs', (req: Request, res: Response) => {
  const landingPage = fs.readFileSync('./app/views/marketing/design-patterns-for-vuejs.html')
  res.render('marketing/design-patterns-for-vuejs', {
    landingPage,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
  })
})

router.use('/screencasts', (req: Request, res: Response) => {
  res.render('screencasts/index')
})

router.use('/', (req: Request, res: Response) => {
  res.render('home/index')
})

export {
  router
}
