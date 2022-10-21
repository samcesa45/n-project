import dotenv from 'dotenv'
import { Schema,model } from 'mongoose'
import { INote } from '../../types/types'


dotenv.config()




const noteSchema = new Schema<INote>({
  content:{ type:String,minlength:5,required:true },
  date:{ type:Date,required:true },
  important:Boolean,
  user:{
    type: Schema.Types.ObjectId,
    ref:'User'
  }
})



noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Note = model<INote>('Note',noteSchema)

export default Note
