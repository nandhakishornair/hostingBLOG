const superadmin = require("../models/superadmin");
const admin_and_user = require("../models/admin-and-users")
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");

// route.post("/asa",(req,res)=>{
//   let datas = {
//     email: req.body.email,
//     password: req.body.password,
    
//   };
  
//   let data = new superadmin(datas);
//   data.save();
//   res.json({message:"new user data saving,,,"})
// } 
// )

route.post("/login", (req, res) => {
    console.log("inside the login route", req.body);
 
    superadmin.findOne({ email: req.body.email }, (err, data) => {
      if (err) {
        console.log(err);
        // res.json({"message":"enter valid email"})
         res.send(err);
      }
       else if(data){
        console.log("user email  is matching");
        console.log("data", data);
        
        
        if(req.body.password === data.password){
          let payload = { subject: data.email + data.password };
              let token = jwt.sign(payload, "secretKey");
              res.json({
                message: "password matching",
                status: "success",
                id: data._id,
                tok: token,
              });
            // console.log("password matching")
            // res.json({message:"password matching"})
        }
        else{
            res.send({message:"invalid password"})
        }
      }
      else{
        res.send({message:"email not matching"})
      }
    });
  });
route.get("/allusers",(req,res)=>{
  admin_and_user.find({isAdmin:false}).then((data)=>{
    console.log("data with users",data);
    res.send(data)
  }).catch((err)=>{
    console.log("err ",err)
  })
})
route.get("/alladmins",(req,res)=>{
  admin_and_user.find({isAdmin:true}).then((data)=>{
    console.log("data with admins",data);
    res.send(data)
  }).catch((err)=>{
    console.log("err ",err)
  })
})
route.put("/editStatus",(req,res)=>{
   
   if(req.body.isAdmin==true){
    req.body.isAdmin = false;
   }
   else if(req.body.isAdmin==false){
    req.body.isAdmin = true;
   }
  console.log("heeee",req.body)
  console.log("dfgd",req.body);
  
  admin_and_user.findByIdAndUpdate( { _id: req.body._id },
    { $set: { isAdmin:req.body.isAdmin} }
  ).then(()=>{console.log("updated");
res.send({message:"updated"})}).catch((err)=>{
  res.send("error",err)
});
})

module.exports = route;
