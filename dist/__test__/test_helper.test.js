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
const note_1 = __importDefault(require("../models/note"));
const user_1 = __importDefault(require("../models/user"));
const initialNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true,
    },
];
const nonExistingId = () => __awaiter(void 0, void 0, void 0, function* () {
    const note = new note_1.default({ content: 'willremovethissoon', date: new Date() });
    yield note.save();
    yield note.remove();
    return note._id.toString();
});
const notesInDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find({});
    return notes.map(note => note.toJSON());
});
const usersInDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
    return users.map(u => u.toJSON());
});
exports.default = {
    initialNotes,
    nonExistingId,
    notesInDb,
    usersInDb
};
