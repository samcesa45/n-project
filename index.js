"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_1 = __importDefault(require("./models/note"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.static('build'));
(0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms');
const requestLogger = (req, _res, next) => {
    console.log('Method:', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ', req.body);
    console.log('---');
    next();
};
//   const unknownEndpoint=(_req:Request,res:Response)=>{
//     res.status(404).send({error:'unknown endpoint'})
// }
app.use(requestLogger);
app.use((0, morgan_1.default)('tiny'));
app.get('/api/notes', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find({});
    return res.json(notes);
}));
app.get('/api/notes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const note = yield note_1.default.findById(id);
    return res.json(note);
}));
app.post('/api/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, important } = req.body;
    if (content === undefined) {
        return res.status(400).json({ error: 'content missing' });
    }
    const note = new note_1.default({
        content: content,
        important: important || false,
        date: new Date()
    });
    const savedNote = yield note.save();
    return res.json(savedNote);
}));
const PORT = process.env.PORT || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
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
