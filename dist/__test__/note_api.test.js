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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const test_helper_test_1 = __importDefault(require("./test_helper.test"));
const app_1 = __importDefault(require("../app"));
const note_1 = __importDefault(require("../models/note"));
const api = (0, supertest_1.default)(app_1.default);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield note_1.default.deleteMany({});
    const noteObjects = test_helper_test_1.default.initialNotes
        .map(note => new note_1.default(note));
    const promiseArray = noteObjects.map(note => note.save());
    yield Promise.all(promiseArray);
}));
test('notes are returned as json', () => __awaiter(void 0, void 0, void 0, function* () {
    yield api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}), 100000);
test('all notes are returned', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/api/notes');
    expect(response.body).toHaveLength(test_helper_test_1.default.initialNotes.length);
}), 100000);
test('a specific note is within the returned notes', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/api/notes');
    const contents = response.body.map((r) => r.content);
    expect(contents).toContain('Browser can execute only Javascript');
}));
test('a valid note can be added', () => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
    };
    yield api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    const notesAtEnd = yield test_helper_test_1.default.notesInDb();
    expect(notesAtEnd).toHaveLength(test_helper_test_1.default.initialNotes.length + 1);
    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain('async/await simplifies making async calls');
}));
test('note without content is not added', () => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = {
        important: true
    };
    yield api
        .post('/api/notes')
        .send(newNote)
        .expect(400);
    const notesAtEnd = yield test_helper_test_1.default.notesInDb();
    expect(notesAtEnd).toHaveLength(test_helper_test_1.default.initialNotes.length);
}));
test('a specific note can be viewed', () => __awaiter(void 0, void 0, void 0, function* () {
    const notesAtStart = yield test_helper_test_1.default.notesInDb();
    const noteToView = notesAtStart[0];
    const resultNote = yield api
        .get(`/ap/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
}));
test('a note can be deleted', () => __awaiter(void 0, void 0, void 0, function* () {
    const notesAtStart = yield test_helper_test_1.default.notesInDb();
    const noteToDelete = notesAtStart[0];
    console.log(noteToDelete);
    yield api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204);
    const notesAtEnd = yield test_helper_test_1.default.notesInDb();
    expect(notesAtEnd).toHaveLength(test_helper_test_1.default.initialNotes.length - 1);
    const contents = notesAtEnd.map(r => r.content);
    expect(contents).not.toContain(noteToDelete.content);
}));
afterAll(() => {
    mongoose_1.default.connection.close();
});
