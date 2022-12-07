const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({

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
 });

const superadmin = mongoose.model("superadmin", adminSchema);
module.exports = superadmin;
