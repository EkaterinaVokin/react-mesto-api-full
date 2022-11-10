// eslint-disable-next-line arrow-body-style
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, MONGO_CODE } = require('../constants');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

// возвращает всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

// возвращает пользователя по _id
const getUserById = (req, res, next) => {
  User.findById(req.params.userId).orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Не корректный _id'));
      } else {
        next(err);
      }
    });
};

// регистрация пользователя(создается пользователь)
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    // eslint-disable-next-line arrow-body-style
    .then((hash) => {
      return User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      res.status(201).send({
        _id: user._id, email: user.email, name: user.name, about: user.about, avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.code === MONGO_CODE) {
        next(new ConflictingRequestError('Пользователь уже создан'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Запрос был неправильно сформирован'));
      } else {
        next(err);
      }
    });
};

// обновляет профиль
const updateProfile = (req, res, next) => {
  const owner = req.user._id; // _id пользователя
  const { name, about } = req.body;
  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true }).orFail()
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else {
        next(err);
      }
    });
};

// обновляет аватар
const updateAvatar = (req, res, next) => {
  const owner = req.user._id; // _id пользователя
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true }).orFail()
    .then((newAvatar) => {
      res.send(newAvatar);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else {
        next(err);
      }
    });
};

// авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body; // получили данные
  User.findOne({ email }).select('+password') // получить хеш пароль
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль'); // пользователь не найден
      }
      return user; // возвращаем пользователя
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) { // если пароли не совпали
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }); // создаем токен если совпали емаил и пароль
        return token; // возвращаем токен
      }))
    .then((token) => {
      res.cookie('jwt', token, { // сохраняем токен в куках
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({});
    })
    .catch((err) => {
      next(err);
    });
};

// возвращать пользователя
const getMe = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Не корректный _id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getMe,
};
