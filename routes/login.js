const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.headers["x-auth-token"]);
  const { error } = validate(req.body);
  if (error) return res.status(400).send("error");

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password.");

  const token = user.generateAuthToken();
  user.verifyAuthToken(token);
  res.send(token);
});

function validate(req) {
  const schema = {
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
