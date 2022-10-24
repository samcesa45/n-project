import  { Request, Response, NextFunction } from 'express'
import logger from './logger'


const requestLogger = (req:Request, _res:Response, next:NextFunction) => {
  logger.info('Method:', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint=(_req:Request,res:Response) => {
  res.status(404).send({ error:'unknown endpoint' })
}

const errorHandler =(error:Error,_req:Request,res:Response,next:NextFunction) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    res.status(400).send({ error:'malformatted id' })
  }else if(error.name === 'ValidationError'){
    res.status(400).json({ error:error.message })
  }else if(error.name === 'JsonWebTokenError'){
    res.status(401).json({ error: 'invalid token' })
  }else if(error.name === 'TokenExpiredError') {
    res.status(401).json({ error: 'token expired' })
  }

  logger.error(error.message)

  next(error)

}



export default {
  unknownEndpoint,
  errorHandler,
  requestLogger
}