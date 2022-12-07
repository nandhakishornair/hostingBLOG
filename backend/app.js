const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv/config');

const path = require('path');
 app.use(express.static(`./dist/frontend`));
 

// const Manageadmin = require("./routes/manage-admin");
const user = require("./routes/user");
const admin = require("./routes/admin")
const superadmin = require("./routes/superadmin")
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// app.use("/superadmin", Manageadmin);
app.use("/api/user", user);
app.use("/api/admin",admin)
app.use("/api/superadmin",superadmin)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + `/dist/frontend/index.html`));
 });
// let dburl =
//   "mongodb+srv://tcsion:ZW9gV0QxjqiGclvl@cluster0.kfviieu.mongodb.net/test";
mongoose.connect(process.env.dbUrl, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true
});
const port=process.env.PORT||3000;

mongoose.connection.on("connected", () => {
  console.log("connected");
  console.log(mongoose.connection.readyState); //logs 1
});
// Server
app.listen(port, () => {
  console.log("Server starts at :3000");
});
