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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const userRouter = express_1.default.Router();
userRouter.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({}).populate('notes', { content: 1, date: 1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
}));
// eslint-disable-next-line @typescript-eslint/ban-types
userRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, password } = req.body;
    const existingUser = yield user_1.default.findOne({ username });
    if (existingUser) {
        res.status(400).json({ error: 'username must be unique' });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    // const match = await bcrypt.compare(passwordHash,password)
    const user = new user_1.default({
        username,
        name,
        password: passwordHash
    });
    try {
        const savedUser = yield user.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = userRouter;
