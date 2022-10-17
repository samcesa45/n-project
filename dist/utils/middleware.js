"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (req, _res, next) => {
    logger_1.default.info('Method:', req.method);
    logger_1.default.info('Path: ', req.path);
    logger_1.default.info('Body: ', req.body);
    logger_1.default.info('---');
    next();
};
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
    }
    next(error);
};
exports.default = {
    unknownEndpoint,
    errorHandler,
    requestLogger
};
