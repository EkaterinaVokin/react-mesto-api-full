const mongoose = require('mongoose');
const validator = require('validator');

// создать схему для карточек
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: (value) => {
        if (validator.isURL(value)) {
          return true;
        }
        return false;
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, // тип ObjectId
      ref: 'user', // ссылка на модель автора карточки
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId], // массив ObjectId
      default: () => [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema); // создать модель для карточек
