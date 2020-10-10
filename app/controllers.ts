import fs from 'fs'
import { Router, Request, Response } from 'express'
import { articles } from './models/articles'

const router = Router()

router.use('/articles/:slug', (req: Request, res: Response) => {
  const content = fs.readFileSync(`./app/public/articles/${req.params.slug}.html`)
  const article = articles.find(x => x.slug === req.params.slug)
  console.log(article)
  res.render('articles/show', { content, article })
})

router.use('/articles', (req: Request, res: Response) => {
  res.render('articles/index', { articles: articles.reverse() })
})

router.use('/projects', (req: Request, res: Response) => {
  res.render('projects/index')
})

router.use('/contact', (req: Request, res: Response) => {
  res.render('contact/index')
})

router.use('/musings/:slug', (req: Request, res: Response) => {
  const content = fs.readFileSync(`./app/public/musings/${req.params.slug}.html`)
res.render('musings/show', { content })
})

router.use('/musings', (req: Request, res: Response) => {
  res.render('musings/index')
})

router.use('/screencasts/spreadsheet-engine-from-scratch', (req: Request, res: Response) => {
  res.render('screencasts/spreadsheet-engine-from-scratch')
})

router.use('/design-patterns-for-vuejs', (req: Request, res: Response) => {
  const landingPage = fs.readFileSync('./app/views/marketing/design-patterns-for-vuejs.html')
  res.render('marketing/design-patterns-for-vuejs', { landingPage })
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
