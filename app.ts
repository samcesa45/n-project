
import cors from 'cors'
import express from 'express'
import { connect } from 'mongoose'
import notesRouter from './controllers/notes'
import config from './utils/config'
import logger from './utils/logger'
import middleware from './utils/middleware'


const app = express()

//connect to mongoose
const password = config.MONGODB_URI
const url = `mongodb+srv://samcesa45:${password}@cluster0.lumxc.mongodb.net/noteApp?retryWrites=true&w=majority`

const run=async() => {
  //connect to mongoDB
  await connect(url)
  logger.info('connected')
  logger.info('note saved!')

}

run().catch(err => logger.error(err))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



export default app
