const {
  NODE_ENV,
  PORT = 3000,
  JWT_SECRET,
} = process.env;
const MONGO_CODE = 11000;
const REGEX_URL = /^https?:\/\/(www\.)?[\w\d-]+\.\w/;

module.exports = {
  JWT_SECRET,
  MONGO_CODE,
  REGEX_URL,
  PORT,
  NODE_ENV,
};
