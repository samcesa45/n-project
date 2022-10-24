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
const bcrypt_1 = __importDefault(require("bcrypt"));
const test_helper_test_1 = __importDefault(require("./test_helper.test"));
const supertest_1 = __importDefault(require("supertest"));
const user_1 = __importDefault(require("../models/user"));
const app_1 = __importDefault(require("../app"));
const api = (0, supertest_1.default)(app_1.default);
describe('when there is initially one user in db', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
        const passwordHash = yield bcrypt_1.default.hash('sekret', 10);
        const user = new user_1.default({ username: 'root', password: passwordHash, name: 'user1' });
        yield user.save();
    }));
    test('creation succeeds with a fresh username', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersAtStart = yield test_helper_test_1.default.usersInDb();
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        };
        yield api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const userAtEnd = yield test_helper_test_1.default.usersInDb();
        expect(userAtEnd).toHaveLength(usersAtStart.length + 1);
        const usernames = userAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    }));
    test('creation fails with proper statuscode and message if username already taken', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersAtStart = yield test_helper_test_1.default.usersInDb();
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        };
        const result = yield api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error).toContain('username must be unique');
        const usersAtEnd = yield test_helper_test_1.default.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    }));
});
