import {Schema,model,connect, connection} from 'mongoose';

// if(process.argv.length < 3){
//     console.log('Please provide the password as an argument:node mongo,ts <password>');
//     process.exit(1)    
// }

// const password = 'wHwspSFLB3wijV0y'
interface INOTE{
    content:String,
    date:Date,
    important:boolean,
}
const url = "mongodb+srv://username:<password>@cluster0.lumxc.mongodb.net/noteApp?retryWrites=true&w=majority"

const noteSchema = new Schema<INOTE>({
    content:{type:String},
    date:{type:Date},
    important:Boolean,
})

const Note = model<INOTE>('Note',noteSchema)

connect(url)
.then(()=>{
    console.log('connected');

    const note = new Note({
        content:'HTML is Easy',
        date:new Date(),
        important:true
    })

    return note.save()
    
})
.then(()=>{
    console.log('note saved!');
    return connection.close()
    
})
.catch(err=>console.log(err));
