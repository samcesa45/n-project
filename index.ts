
import express,{ Request,Response,NextFunction} from 'express';
import Note from './models/note';
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan';
dotenv.config()
const app = express()
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('build'))
morgan(':method :url :status :res[content-length] - :response-time ms')

const requestLogger=(req:Request,_res:Response,next:NextFunction)=>{
    console.log('Method:',req.method);
    console.log('Path: ',req.path);
    console.log('Body: ', req.body);
    console.log('---');
    next()
  }
  
//   const unknownEndpoint=(_req:Request,res:Response)=>{
//     res.status(404).send({error:'unknown endpoint'})
// }


app.use(requestLogger)
app.use(morgan('tiny'))
// app.use(unknownEndpoint)


// let notes:Note[] = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]

  type Note ={
    id: string,
    content: string,
    date: string,
    important: boolean
  }

    

app.get('/api/notes',async(_req:Request,res:Response)=>{
   const notes = await Note.find({})
   return res.json(notes)
  })

app.get('/api/notes/:id',async(req:Request<{id:string}>,res:Response)=>{
  const id = req.params.id
 const note = await Note.findById(id)
 return res.json(note)
})

app.post('/api/notes',async(req:Request<{},{},{content:string,important:boolean,date:Date}>,res:Response)=>{
  const {content,important} = req.body

  if(content === undefined){
    return res.status(400).json({error:'content missing'})
  }

  const note = new Note({
    content:content,
    important:important || false,
    date:new Date()
  })

 const savedNote =await  note.save()
 return res.json(savedNote)
})


const PORT = process.env.PORT || process.env.PORT

app.listen( PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})



//   app.get('/api/notes/:id',(req:Request<{id:string}>,res:Response)=>{
//    const id = Number(req.params.id)
//    const note = notes.find(note => note.id === id)
//    if(note){
//     res.json(note)
//    }else{
//     res.status(400).end()
//    }

//   })

// const getId=()=>{
//     const maxId =notes.length > 0 ? Math.max(...notes.map(n=>n.id)) : 0
//     return maxId + 1

// }


// app.post('/api/notes',(req:Request<{},{},{content:string,date:string,important:boolean}>,res:Response,_next:NextFunction)=>{
//     const body = req.body

//     if(!body.content){
//         return res.status(400).json({error:"no content"})
      
//     }
//     const note ={
//         id: getId(),
//         content: body.content,
//         date: body.date,
//         important: body.important
//     }


//         notes = notes.concat(note)
//         return res.json(note)
    
// })

// app.delete('/api/notes/:id',(req:Request<{id:string}>,res:Response)=>{
//     const id = Number(req.params.id)
//     notes = notes.filter(note=>note.id !== id)
//     res.status(204).end()
// })