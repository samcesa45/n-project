import { Types } from 'mongoose'

export type INote ={
    id: string,
    content: string,
    date: Date,
    important: boolean,
    user:{types:Types.ObjectId,ref:string}
  }

export type IUSER ={
    username:string,
    name:string,
    passwordHash:string,
    notes:[{types:Types.ObjectId,ref:string}]

  }