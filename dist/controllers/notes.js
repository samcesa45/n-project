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
/* eslint-disable @typescript-eslint/ban-types */
const express_1 = __importDefault(require("express"));
const note_1 = __importDefault(require("../models/note"));
const user_1 = __importDefault(require("../models/user"));
const notesRouter = express_1.default.Router();
notesRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find({}).populate('user', { username: 1, name: 1 });
    res.json(notes);
}));
notesRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const note = yield note_1.default.findById(id);
        if (note) {
            res.json(note);
        }
        else {
            res.status(404).end();
        }
    }
    catch (error) {
        next(error);
    }
}));
notesRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, important, userId } = req.body;
    const user = yield user_1.default.findById(userId);
    if (content === undefined) {
        res.status(400).json({ error: 'content missing' });
    }
    const note = new note_1.default({
        content,
        important: important === undefined ? false : important,
        date: new Date(),
        user: user === null || user === void 0 ? void 0 : user._id
    });
    try {
        const savedNote = yield note.save();
        (user === null || user === void 0 ? void 0 : user.notes) ? [...[user === null || user === void 0 ? void 0 : user.notes], savedNote._id] : undefined;
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(201).json(savedNote);
    }
    catch (error) {
        next(error);
    }
}));
notesRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, important } = req.body;
    const id = req.params.id;
    const note = {
        content: content,
        important: important
    };
    try {
        const updatedNote = yield note_1.default.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: 'query' });
        res.json(updatedNote);
    }
    catch (error) {
        next(error);
    }
}));
notesRouter.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield note_1.default.findByIdAndRemove(id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
}));
exports.default = notesRouter;
