"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const UserController_1 = require("../controller/UserController");
const NoteController_1 = require("../controller/NoteController");
const router = express_1.default.Router();
router.post('/signup', UserController_1.signup);
router.post('/login', UserController_1.login, auth_1.authenticateToken);
router.post('/notes', NoteController_1.createNote);
exports.default = router;
