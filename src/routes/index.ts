import express from 'express';
import Note from '../model/NoteModel';
const router = express.Router();

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

router.get('/users/dashboard', async (req, res, next) => {
  const userId = (req.session as any).userId;
  if (!userId) {
    const err = new Error('Unauthorized');
    return next(err);
    }
    const fullName = (req.session as any).fullName;
    const userNotes = await Note.find({userId});
    res.render('dashboard', { userNotes, fullName });
  // res.render('dashboard');
});

export default router;