const config = require("config");
const mongoose = require("mongoose");
const signup = require("./routes/signup");
const login= require("./routes/login");
const createForm = require("./routes/createForm")
const express = require("express");
const deleteDetail = require("./routes/deleteFile")
const forgotpassword = require("./routes/forgotpassword")
const resetpassword = require ("./routes/resetpassword")
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}


mongoose.connect('mongodb://localhost/vitasoft')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use("/loginroute", login);
app.use("/form/save-detail", createForm);
app.use("/form/delete-detail", deleteDetail);
app.use("/signup", signup);
app.use("/forgotpassword",forgotpassword);
app.use("/resetpassword",resetpassword);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
