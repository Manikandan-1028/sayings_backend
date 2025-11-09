const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


// const protectedRoute = async(req,res,next)=>{
//     try {
//         //getting token from req
//         const token = req.cookies.jwt
//         if(!token){
//             res.status(500).json("token not found")
//         }

//         //decode
//         const decode = jwt.verify(token,process.env.SECRET_KEY)
//         if(!decode){
//             res.status(500).json("cannot decode token")
//         }
//         console.log(decode)

//         //getting user
//         const user = await User.findOne({_id:decode.userId}).select("-password")
//         req.user = user;
//         next()
        

//     } catch (error) {
//         console.log("error in protected route")
//         res.status(400).json("internal server error")
//     }
// 

// const protectedRoute = async(req,res,next)=>{
//     const header = req.headers["authorization"]
//     const token = header && header.split('')[1];

//     if(!token) return res.status(401).json({message:"Access token missing"})

//     jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
//         if(err) return res.status(401).json({message:"Invalid token"});

//         req.user= user;
//         next()
//     })



// }

// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

const protectedRoute = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing or malformed" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // now has _id, name, email, etc.
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// export default protectedRoute;


// const protectedRoute = async (req, res, next) => {
//   const header = req.headers["authorization"];

//   if (!header || !header.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Access token missing or malformed" });
//   }

//   const token = header.split(" ")[1];

//   try {
 
//     const user = jwt.verify(token, process.env.SECRET_KEY);

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };




module.exports = protectedRoute