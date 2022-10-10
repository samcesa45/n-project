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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const password = process.env.MONGODB_URI;
const url = `mongodb+srv://samcesa45:${password}@cluster0.lumxc.mongodb.net/noteApp?retryWrites=true&w=majority`;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    //connect to mongoDB 
    yield (0, mongoose_1.connect)(url);
    console.log('connected');
    console.log('note saved!');
});
run().catch(err => console.log(err));
const noteSchema = new mongoose_1.Schema({
    content: String,
    date: Date,
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
