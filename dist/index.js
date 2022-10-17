"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const server = http_1.default.createServer(app_1.default);
server.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server running on port ${config_1.default.PORT}`);
});
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
