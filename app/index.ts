const express = require('express')
const fs = require('fs')
import { router } from './controllers'

const PORT = 8000

try {
  const app = express()
  app.set('view engine', 'pug')
  app.set('views', './app/views')
  app.use(router)
  app.listen(PORT, () => console.log(`Started on port ${PORT}`))
} catch (e) {
  fs.writeFileSync('./error.txt', e.message)
}