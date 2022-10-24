"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
dotenv_1.default.config();
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    password: String,
    notes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Note' }]
});
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        //the passwordHash should not be revealed
        delete returnedObject.password;
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
