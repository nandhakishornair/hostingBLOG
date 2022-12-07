const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    email:String,
    heading:String,
    description:String,
    category:String,
    time : { type : Date, default: Date.now }
});


const post = mongoose.model("post", PostSchema);
module.exports = post;