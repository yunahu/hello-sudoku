const { MongoClient } = require("mongodb");
const env = require('./env');

const mongo = new MongoClient(env.MONGODB_CONNECTION_STRING);

mongo.on("open", () => console.log("Connected to the database successfully"));

module.exports = {
   mongo
}