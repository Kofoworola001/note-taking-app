import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { signup, login } from '../controller/UserController';
import { createNote } from '../controller/NoteController';
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login, authenticateToken);
router.post('/notes', createNote)


export default router;