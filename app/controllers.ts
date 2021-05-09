import * as fs from 'fs'
import { Router, Request, Response } from 'express'
import { articles } from './models/articles'
import { musings } from './models/musings'

const router = Router()

router.get('/articles/:slug', (req: Request, res: Response) => {
  try {
    const content = fs.readFileSync(`./app/public/articles/${req.params.slug}.html`)
    const article = articles.find(x => x.slug === req.params.slug)
    res.render('articles/show', { content, article })
  } catch {
    res.render('misc/404')
  }
})

router.get('/articles', (req: Request, res: Response) => {
  res.render('articles/index', { articles })
})

router.get('/projects', (req: Request, res: Response) => {
  res.render('projects/index')
})

router.get('/books', (req: Request, res: Response) => {
  res.render('books/index')
})

router.get('/contact', (req: Request, res: Response) => {
  res.render('contact/index')
})

router.get('/vue-toronto-2020', (req: Request, res: Response) => {
  res.render('misc/vue-toronto-2020')
})

router.get('/musings/:slug', (req: Request, res: Response) => {
  try {
    const content = fs.readFileSync(`./app/public/musings/${req.params.slug}.html`)
    const musing = musings.find(x => x.slug === req.params.slug)
    res.render('musings/show', { content, musing })
  } catch {
    res.render('misc/404')
  }
})

router.get('/musings', (req: Request, res: Response) => {
  res.render('musings/index', { musings })
})

router.get('/screencasts/spreadsheet-engine-from-scratch', (req: Request, res: Response) => {
  res.render('screencasts/spreadsheet-engine-from-scratch')
})

router.get('/typing-the-test-suite', (req: Request, res: Response) => {
  const landingPage = fs.readFileSync('./app/views/marketing/typing-the-test-suite.html')
  res.render('marketing/typing-the-test-suite', {
    landingPage,
  })
})

router.get('/design-patterns-for-vuejs', (req: Request, res: Response) => {
  const landingPage = fs.readFileSync('./app/views/marketing/design-patterns-for-vuejs.html')
  res.render('marketing/design-patterns-for-vuejs', {
    landingPage,
  })
})

router.get('/screencasts', (req: Request, res: Response) => {
  res.render('screencasts/index')
})

router.get('/', (req: Request, res: Response) => {
  res.render('home/index')
})

router.get('*', (req: Request, res: Response) => {
  res.render('misc/404')
})

export {
  router
}
