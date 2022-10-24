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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
// import { Model } from 'mongoose'
// import { IUSER } from '../../types/types'
const loginRouter = express_1.default.Router();
loginRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { username, password } = req.body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    let userData = req.body;
    // eslint-disable-next-line prefer-const
    try {
        if (userData !== null) {
            userData = yield user_1.default.findOne({ username: userData.username });
        }
    }
    catch (error) {
        next(error);
    }
    //   const saltRounds = 10
    //   const passwordHash = await bcrypt.hash(userData.password, saltRounds)
    const passwordCorrect = userData === null ? false : yield bcrypt_1.default.compare(req.body.password, userData.password);
    if (!(userData && passwordCorrect)) {
        res.status(401).json({ error: 'invalid username or password' });
    }
    const userForToken = {
        username: userData === null || userData === void 0 ? void 0 : userData.username,
        id: userData === null || userData === void 0 ? void 0 : userData.id
    };
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = jsonwebtoken_1.default.sign(userForToken, process.env.SECRET);
    res.status(200).send({ token, username: userData === null || userData === void 0 ? void 0 : userData.username, name: userData === null || userData === void 0 ? void 0 : userData.name });
}));
exports.default = loginRouter;
