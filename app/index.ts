const express = require('express')
const fs = require('fs')
import { router } from './controllers'

try {
  const app = express()
  app.set('view engine', 'pug')
  app.set('views', './app/views')
  app.use(router)
  app.listen('8000', () => console.log('Started on port 8000'))
} catch (e) {
  fs.writeFileSync('./error.txt', e.message)
}