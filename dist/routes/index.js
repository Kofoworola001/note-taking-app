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
const express_1 = __importDefault(require("express"));
const NoteModel_1 = __importDefault(require("../model/NoteModel"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});
router.get('/users/signup', function (req, res, next) {
    res.render('signup');
});
router.get('/users/login', function (req, res, next) {
    res.render('login');
});
router.get('/users/dashboard', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.userId;
    if (!userId) {
        const err = new Error('Unauthorized');
        return next(err);
    }
    const fullName = req.session.fullName;
    const userNotes = yield NoteModel_1.default.find({ userId });
    res.render('dashboard', { userNotes, fullName });
    // res.render('dashboard');
}));
exports.default = router;
