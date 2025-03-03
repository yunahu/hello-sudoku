const express = require('express');
const { mongo } = require('../utils/db');
const usersController = require('../controllers/usersController');
const sudokuController = require('../controllers/sudokuController');
const { initialize } = require('../services/sudoku');
const logger = require('../middlewares/logger');
const path = require('path');

const app = express();
const PORT = process.env.PORT;

process.on("unhandledRejection", error => console.log('Unhandled rejection', error));

app.use(express.static(path.join(__dirname, "../views")));
app.use(express.json());

app.use(logger);
app.use("/users", usersController);
app.use("/sudoku", sudokuController);

console.log("Connecting to the database...");
mongo.connect().then(async () => {
   console.log("Initializing puzzles...");
   await initialize();
   
   app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
   });
});