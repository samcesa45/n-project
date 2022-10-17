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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const notes_1 = __importDefault(require("./controllers/notes"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const app = (0, express_1.default)();
//connect to mongoose
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const password = config_1.default.MONGODB_URI;
// const url = `mongodb+srv://samcesa45:${password}@cluster0.lumxc.mongodb.net/noteApp?retryWrites=true&w=majority`
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    //connect to mongoDB
    yield (0, mongoose_1.connect)(password);
    logger_1.default.info('connected');
    logger_1.default.info('note saved!');
});
run().catch(err => logger_1.default.error(err));
app.use((0, cors_1.default)());
app.use(express_1.default.static('build'));
app.use(express_1.default.json());
app.use(middleware_1.default.requestLogger);
app.use('/api/notes', notes_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
