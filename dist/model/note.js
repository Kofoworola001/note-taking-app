"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NoteSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
    usersName: String,
    gender: String,
    phonenumber: Number,
    createdAt: { type: Date, default: Date.now() },
});
const Note = mongoose_1.default.model("Note", NoteSchema);
exports.default = Note;
