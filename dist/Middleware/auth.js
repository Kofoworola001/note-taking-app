"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateAccessToken(user) {
    const payload = {
        email: user.email,
        id: user.id,
    };
    const secret = process.env.secret;
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
exports.generateAccessToken = generateAccessToken;
function verifyAccessToken(token) {
    const secret = process.env.secret;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { success: true, data: decoded };
    }
    catch (error) {
        return { success: false, data: error.message };
    }
}
exports.verifyAccessToken = verifyAccessToken;
function authenticateToken(req, res, next) {
    const token = req.session.token;
    const userId = req.session.id;
    if (!token) {
        const err = new Error('Missing or invalid token');
        return next(err);
    }
    const result = verifyAccessToken(token);
    if (!result.success) {
        const err = new Error('Missing or invalid token');
        return next(err);
    }
    res.redirect("/users/dashboard");
    // res.status(200).json({ message: 'Login successful', token })
}
exports.authenticateToken = authenticateToken;
