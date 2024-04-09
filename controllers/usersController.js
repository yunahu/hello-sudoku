const express = require("express");
const { createUser, getUser, changeRole } = require("../services/users");
const authorize = require("../middlewares/authorize");

const usersController = express.Router();

usersController.post("/signup", async (req, res) => {
   try {
      const user = req.body;
      const userInfo = await createUser(user);
      const mongoRes = userInfo[1];

      if (mongoRes.acknowledged) {
         console.log(userInfo[0])
         const response = {
            role: userInfo[0].role,
            registrationDate: userInfo[0].registrationDate
         }
         res.send(response);
      }      
   } catch (err) {
      res.status(500).send(err.message);
   }
});

usersController.get("/signin", authorize(), async (req, res) => {
   try {
      if (req.user) {
         const response = {
            role: req.user.role,
            registrationDate: req.user.registrationDate
         }
         res.send(response);
      } else {
         res.sendStatus(401);
      }
   } catch (err) {
      res.status(500).send(err.message);
   }
});

usersController.get("/search/:username", authorize(["admin"]), async (req, res) => {
   const user = await getUser(req.params.username);
   
   if (!user)
      res.sendStatus(404);
   else
      res.send(user);
})

usersController.post("/changeRole", authorize(["admin"]), async (req, res) => {
   console.log(req.body.target)
   const user = await changeRole(req.body.target);

   if (!user) {
      res.sendStatus(404);
   } else {
      res.send(user);
   }
})

module.exports = usersController;