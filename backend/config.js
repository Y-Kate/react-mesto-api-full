require('dotenv').config();

const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
};
