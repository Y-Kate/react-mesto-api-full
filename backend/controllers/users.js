const bcrypt = require('bcryptjs'); // модуль для хэширования пароля
const jwt = require('jsonwebtoken'); // модуль для создания токенов
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error'); // 404
const ConflictError = require('../errors/conflict-error'); // 409
const IncorrectDataError = require('../errors/incorrect-data-error'); // 400
const UnauthorizedError = require('../errors/unauthorized-error'); // 401
const { JWT_SECRET } = require('../config');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDataError('Переданы некорректные данные при создании пользователя'));
      next(err);
    });
};

module.exports.postUser = (req, res, next) => {
  const {
    name,
    avatar,
    about,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10) // хэшируем пароль
    .then((hash) => User.create({
      name,
      avatar,
      about,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = {
        name: user.name,
        avatar: user.avatar,
        about: user.about,
        email: user.email,
        _id: user._id,
      };
      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('Переданы некорректные данные при создании пользователя'));
      if (err.code === 11000 && err.name === 'MongoServerError') next(new ConflictError('Пользователь с таким email уже существует'));
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const currentUserId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    currentUserId,
    {
      name,
      about,
    },
    {
      new: true, // в then будут обновленные данные пользователя
      runValidators: true, // валидировать новые данные перед записью в базу
    },
  )
    .then((user) => {
      if (user === null) throw new NotFoundError('Пользователь по указанному _id не найден');
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('Переданы некорректные данные при создании пользователя'));
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const currentUserId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    currentUserId,
    {
      avatar,
    },
    {
      new: true, // в then будут обновленные данные пользователя
      runValidators: true, // валидировать новые данные перед записью в базу
    },
  )
    .then((user) => {
      if (user === null) throw new NotFoundError('Пользователь по указанному _id не найден');
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDataError('Переданы некорректные данные при создании пользователя'));
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) throw new UnauthorizedError('Указан неверный логин или пароль');
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnauthorizedError('Указан неверный логин или пароль');
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь по указанному _id не найден');
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDataError('Переданы некорректные данные при создании пользователя'));
      next(err);
    });
};
