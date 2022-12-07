const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryTitle:  String ,
  description:String
});


const category = mongoose.model("category", categorySchema);
module.exports = category;
