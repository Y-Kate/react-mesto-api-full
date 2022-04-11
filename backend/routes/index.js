const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const {
  login,
  postUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  validateLogin,
  validatePostUser,
} = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-error');

// роуты, не требующие авторизации
router.post('/signin', validateLogin, login);
router.post('/signup', validatePostUser, postUser);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна
router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Ошибка, некорректный запрос'));
});

module.exports = router;
