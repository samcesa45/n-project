import   { Schema, model } from 'mongoose'
import {  IUSER } from '../../types/types'

const userSchema = new Schema<IUSER>({
  username:{ type:String,required:true },
  name:{ type:String,required:true },
  passwordHash:String,
  notes:[{
    type: Schema.Types.ObjectId,
    ref:'Note'
  }]
})

userSchema.set('toJSON',{
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = model<IUSER>('User', userSchema)


export default User