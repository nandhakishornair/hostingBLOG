const adminModel = require("../models/admin-and-users");
const express = require("express");
const { default: mongoose } = require("mongoose");
const { json } = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const Category = require("../models/category");
const post = require("../models/posts");
const jwt = require("jsonwebtoken");
try {
  route.post("/login", (req, res) => {
    console.log("inside the login route", req.body);

    adminModel.findOne(
      { email: req.body.email, isAdmin: true },
      (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
          // res.send(err);
        } else if (data) {
          console.log("admin email  is matching");
          console.log("data", data);

          bcrypt.compare(req.body.password, data.password, (err, resp) => {
            if (err) {
              console.log("error in bcrypt");
              res.json({ message: "error while password comparison" });
            }
            if (resp) {
              let payload = { subject: data.email + data.password };
              let token = jwt.sign(payload, "secretKey");
              res.json({
                message: "password matching",
                status: "success",
                id: data._id,
                tok: token,
              });
              // res.json({ message: "password matching" });
            } else {
              res.json({ message: "password donot match" });
            }
          });
        } else {
          console.log("wrong email id");
          res.json({ message: "invalid email" });
        }
      }
    );
  });
} catch (err) {
  console.log(err);
}

try {
  route.get("/landing", (req, res) => {
    CategoryAndPost.find().then((data) => {
      res.send(data);
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.post("/addCategory", async (req, res) => {
    console.log("body in addcategory route", req.body);
    let datas = {
      categoryTitle: req.body.categoryTitle,
      description: req.body.description,
    };
    let data = new Category(datas);
    data.save().then(console.log("saved successfully"));
    res.send({ message: "new user data saving,,," });
  });
} catch (err) {
  console.log(err);
}

try {
  route.get("/viewCategories", (req, res) => {
    Category.find().then((data) => {
      res.send(data);
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.post("/addPost/:categoryTitle", async (req, res) => {
    // console.log("category title is ",category)
    console.log("body in add post route", req.body);
    let datas = {
      // email:req.body.email,
      category: req.params.categoryTitle,
      heading: req.body.heading,
      description: req.body.description,
      email:req.body.email
    };
    let data = new post(datas);
    data.save().then(()=>{console.log("post is saved")
  res.send({message:"post created"})});
  });
} catch (err) {
  console.log(err);
}

try {
  route.get("/viewPostsInCategory/:categoryTitle", (req, res) => {
    let category = req.params.categoryTitle;

    post.find({ category: category }, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (data) {
        console.log(data);
        res.json(data);
      }
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.delete("/deleteCategory/:categoryName", function (req, res) {
    const category = req.params.categoryName;
    //console.log(id);
    Category.findOneAndDelete({ categoryTitle: category }).then(() => {
      console.log("delete success");
      res.send({ message: "delete success" });
    });
  });
} catch (err) {
  console.log(err);
}
// deleteCategory

try {
  route.delete("/deletePost/:id", function (req, res) {
    const id = req.params.id;
    console.log("id is", id);
    post.findByIdAndDelete({ _id: id }).then(() => {
      console.log("delete success");
      res.send({message:"delete success"});
    });
  });
} catch (err) {
  console.log(err);
}

try {
  route.put("/updateCategory", (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    let id = req.body._id;
    Category.findByIdAndUpdate(
      { _id: id },
      { $set: { categoryTitle: title, description: description } }
    ).then(console.log("updated"));
  });
} catch (err) {
  console.log(err);
}

try {
  route.put("/updatePost", (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    let id = req.body._id;
    post
      .findByIdAndUpdate(
        { _id: id },
        { $set: { heading: title, description: description } }
      )
      .then(()=>{
        console.log("updated");
        res.send({message:"updated successfully"})
      });
  });
} catch (err) {
  console.log(err);
}

try {
  route.get("/viewLatestPost", (req, res) => {
    post
      .find()
      .sort({ time: -1 })
      .limit(4)
      .then((data) => {
        res.send(data);
      });
  });
} catch (err) {
  console.log(err);
}
try {
  route.get("/viewApost/:postid", (req, res) => {
    let id = req.params.postid;
    console.log(id);
    post.findOne({ _id: id }).then((data) => {
      console.log(data);
      res.send(data);
    });
  });
} catch (err) {
  console.log(err);
}

module.exports = route;
