require('dotenv').config();

module.exports = {
   PORT: process.env.PORT ?? 3000,
   SALT_ROUNDS: process.env.SALT_ROUNDS ?? 10,
   MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
}