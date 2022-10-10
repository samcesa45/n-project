"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const url = "mongodb+srv://username:<password>@cluster0.lumxc.mongodb.net/noteApp?retryWrites=true&w=majority";
const noteSchema = new mongoose_1.Schema({
    content: { type: String },
    date: { type: Date },
    important: Boolean,
});
const Note = (0, mongoose_1.model)('Note', noteSchema);
(0, mongoose_1.connect)(url)
    .then(() => {
    console.log('connected');
    const note = new Note({
        content: 'HTML is Easy',
        date: new Date(),
        important: true
    });
    return note.save();
})
    .then(() => {
    console.log('note saved!');
    return mongoose_1.connection.close();
})
    .catch(err => console.log(err));
