import { Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface INote{
    id:string,
    content: string,
    date: Date,
    important: boolean,
     // Use `Types.ObjectId` in document interface...
    user:Types.ObjectId,
  }

export interface TokenInterface {
    user: {
       username: string;
       name: string;
       id: string;
    };
  }

export interface IUSER {
    id:string,
    username:string,
    name:string,
    password:string,
    notes:Types.ObjectId

  }