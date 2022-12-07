const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  firstname: { type: String },
  lastname: { type: String },
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  gender: { type: String },
  isAdmin: { type: Boolean, default: false }
});

const user_admin = mongoose.model("admin_and_user", userSchema);
module.exports = user_admin;
