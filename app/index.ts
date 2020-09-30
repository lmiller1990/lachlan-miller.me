import express from 'express'

import { router } from './controllers'

const app = express()
app.set('view engine', 'pug')
app.set('views', './app/views')

app.use(router)

app.listen('8000', () => console.log('Started on port 8000'))
