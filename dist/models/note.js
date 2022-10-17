"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const noteSchema = new mongoose_1.Schema({
    content: { type: String, minlength: 5, required: true },
    date: { type: Date, required: true },
    important: Boolean,
});
noteSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Note = (0, mongoose_1.model)('Note', noteSchema);
exports.default = Note;
