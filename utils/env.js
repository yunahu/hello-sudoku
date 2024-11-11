require('dotenv').config();

module.exports = {
   SALT_ROUNDS: process.env.SALT_ROUNDS ?? 10,
   MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
}