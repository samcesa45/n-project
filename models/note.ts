import dotenv from 'dotenv'
import {Schema,model,connect} from 'mongoose';
dotenv.config()
interface INOTE{
    content:String,
    date:Date,
    important:boolean,
}

 const password = process.env.MONGODB_URI
const url = `mongodb+srv://samcesa45:${password}@cluster0.lumxc.mongodb.net/noteApp?retryWrites=true&w=majority`

const run=async()=>{
  //connect to mongoDB 
  await connect(url)
  console.log('connected')
      console.log('note saved!');
      
  }
  
    run().catch(err=>console.log(err))

const noteSchema = new Schema<INOTE>({
    content:String,
    date:Date,
    important:Boolean,
})



noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Note = model<INOTE>('Note',noteSchema)

export default Note
