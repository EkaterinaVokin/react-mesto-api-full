const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('../constants');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getMe,
} = require('../controllers/users');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/me', getMe); // возвращает пользователя
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById); // возвращает пользователя по _id
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile); // обновляет профиль
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REGEX_URL),
  }),
}), updateAvatar); // обновляет аватар

module.exports = router;
