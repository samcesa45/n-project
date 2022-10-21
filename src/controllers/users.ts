import bcrypt from 'bcrypt'
import express,{ Request,Response, NextFunction } from 'express'
import User from '../models/user'

const userRouter = express.Router()


// eslint-disable-next-line @typescript-eslint/ban-types
userRouter.post('/', async (req:Request<{},{},{username:string,name:string,password:string}>,res:Response,next:NextFunction) => {
  const { username,name,password } = req.body


  const existingUser = await User.findOne({ username })
  if(existingUser){
    res.status(400).json({ error:'username must be unique' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)
  const match = await bcrypt.compare(passwordHash,password)

  const user = new User({
    username,
    name,
    password
  })

  try {
    const savedUser = await user.save()
    if(match){
      res.status(201).json(savedUser)

    }
  } catch (error) {
    next(error)
  }

})

export default userRouter



