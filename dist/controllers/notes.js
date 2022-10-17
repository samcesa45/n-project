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
const notesRouter = express_1.default.Router();
notesRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find({});
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
    const { content, important } = req.body;
    if (content === undefined) {
        res.status(400).json({ error: 'content missing' });
    }
    const note = new note_1.default({
        content: content,
        important: important || false,
        date: new Date()
    });
    try {
        const savedNote = yield note.save();
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
