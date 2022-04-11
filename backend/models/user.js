const mongoose = require('mongoose');
const validator = require('validator');
const { isValidUrl } = require('../utils/methods');

const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто', // присваивается стандартные значение
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: (avatar) => isValidUrl(avatar),
      message: 'Ссылка некорректная',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  email: {
    type: String,
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    unique: true, // уникальное значение
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email введен некорректно',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Так по умолчанию хеш пароля пользователя не будет возвращаться из базы
  },
});

module.exports = mongoose.model('user', userSchema);
