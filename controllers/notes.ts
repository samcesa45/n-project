/* eslint-disable @typescript-eslint/ban-types */
import express,{ Request,Response,NextFunction } from 'express'
import Note from '../models/note'
const notesRouter = express.Router()




notesRouter.get('/',async(_req:Request,res:Response) => {
  const notes = await Note.find({})
  return res.json(notes)
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

  if(content === undefined){
    res.status(400).json({ error:'content missing' })
  }

  const note = new Note({
    content:content,
    important:important || false,
    date:new Date()
  })

  try {
    const savedNote = await note.save()
    res.json(savedNote)

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
  await Note.findByIdAndRemove(id)
  try {
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})


export default notesRouter