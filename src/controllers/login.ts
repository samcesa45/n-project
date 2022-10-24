import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express, { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import { IUSER } from '../../types/types'


const loginRouter = express.Router()



loginRouter.post('/', async (req:Request,res:Response,next:NextFunction) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  let userData: IUSER | null = req.body
  // eslint-disable-next-line prefer-const
  try {
    if(userData !== null){
      userData = await User.findOne({ username: userData.username })

    }

  } catch (error) {
    next(error)
  }
  const passwordCorrect = userData === null ? false : await bcrypt.compare(req.body.password, userData.password)
  if(!(userData && passwordCorrect)){
    res.status(401).json({ error:'invalid username or password' })
  }

  const userForToken = {
    username: userData?.username,
    id:userData?.id
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = jwt.sign(userForToken, process.env.SECRET!, { expiresIn: 60 * 60 })

  res.status(200).send({ token, username:userData?.username, name:userData?.name })
})


export default loginRouter