/* eslint-disable @typescript-eslint/ban-types */
import express,{ Request,Response,NextFunction } from 'express'
import Note from '../models/note'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import { TokenInterface } from '../../types/types'
const notesRouter = express.Router()


const getTokenFrom = (req:Request) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }

  return null
}


notesRouter.get('/',async(_req:Request,res:Response) => {
  const notes = await Note.find({}).populate('user', { username:1, name:1 })
  res.json(notes)
})

notesRouter.get('/:id',async(req:Request<{id:string}>,res:Response,next:NextFunction) => {
  const id = req.params.id
  try {
    const note = await Note.findById(id)
    if(note){
      res.json(note)
    }else{
      res.status(404).end()
    }

  } catch (error) {
    next(error)

  }
})

notesRouter.post('/',async(req:Request<{},{},{content:string,important:boolean,date:Date}>,res:Response,next:NextFunction) => {
  const { content,important } = req.body

  const token = getTokenFrom(req)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const decodedToken = jwt.verify(token as string, process.env.SECRET!)
  if(!(decodedToken as TokenInterface).user.id){
    res.status(401).json({ error: 'token missing or invalid' })
  }



  const user = await User.findById((decodedToken as TokenInterface).user.id)


  if(content === undefined){
    res.status(400).json({ error:'content missing' })
  }

  const note = new Note({
    content,
    important:important === undefined ? false : important,
    date:new Date(),
    user:user?._id
  })

  try {
    const savedNote = await note.save()

    user?.notes   ? [...[user?.notes],savedNote._id] : undefined
    await user?.save()
    res.status(201).json(savedNote)


  } catch (error) {
    next(error)
  }

})

notesRouter.put('/:id',async(req:Request<{id:string},{},{content:string,important:boolean}>,res:Response,next:NextFunction) => {
  const { content,important } = req.body
  const id = req.params.id
  const note ={
    content:content,
    important:important
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(id,note,{ new:true,runValidators:true,context:'query' })
    res.json(updatedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id',async(req:Request<{id:string}>,res:Response,next:NextFunction) => {
  const id= req.params.id
  try {
    await Note.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})


export default notesRouter