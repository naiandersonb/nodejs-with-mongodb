import express from 'express'
import { connectDatabase } from './config/dbConnect.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { handler404 } from './middlewares/handler404.js'
import { routes } from './routes/index.js'

const mongoDBConnection = await connectDatabase()

mongoDBConnection.on('error', (error) => {
  console.error('Connection error', error)
})

mongoDBConnection.once('open', () => {
  console.log('Connected to MongoDB')
})

const app = express()
app.use(express.json());
routes(app)

app.use(handler404)
app.use(errorHandler)

export { app }
