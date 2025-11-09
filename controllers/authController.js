// const express = require('express')

// const User = require("../../../mern/backend/models/userModel");
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const generateToken  = require('../utils/generateToken')

// const signUp = async (req, res) => {
//     try {
//         const {username, email, password } = req.body;
//         //email validation
//         const emailValidation = /^[^\$@]+@[^\$@]+\.[^\$@]+$/;
//         if(!emailValidation.test(email)){
//             res.status(400).json({"error":"invalid email"})
//         }

//         //validation
//         const userExists = await User.findOne({username})
//         const emailExists = await User.findOne({email})

//         if (userExists || emailExists) {
//            return res.status(400).json("username or email already exists")
//         }

//         if(password.length < 6){
//             res.status(400).json("password should have 6 characters")
//         }
//         //hashing password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         const newUser = new User({
//             username,
//             email,
//             password:hashedPassword
//         })

//         //saving data in db
//         if(newUser){
//             //generating token
//             generateToken(newUser._id,res)
//             await newUser.save()
//             res.status(200).json("user created successfully.")
//         }
//         else{
//             res.status(400).json("user not created")
//         }
//     }
//     catch(err){
//         console.log("error in signup controller",err)
//         res.status(400).json("internal server error",err)
//     }
// }


// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: "Username or password is incorrect" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Username or password is incorrect" });
//     }

   
//     const token = generateToken(user._id, res);

//     // ✅ Send both user info and token in response
//     return res.status(200).json({
//       message: "Login successful",
//       token, // <-- added here
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error in login:", error.message);
//     return res.status(500).json({ message: "Error in login controller" });
//   }
// };






// const login =async(req, res) => {
//     try {
//         const {username,password} = req.body
//         //get the user data
//         const user = await User.findOne({username:username})
//         const checkPassword = await bcrypt.compare(password,user.password)
    
//         if(!user || !checkPassword){
//           return res.status(400).json("username or password is incorrect")
//         }   
//         //generate token
//         generateToken(user._id,res)
//         res.status(200).json(user)
//     } catch (error) {
//         console.log("error in login")
//         res.status(400).json("error in login controller")
//     }
// }


const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Email validation
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValidation.test(email)) {
            return res.status(400).json({ error: "Invalid email" }); 
        }

        // Check for existing username/email
        const userExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });
        if (userExists || emailExists) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should have at least 6 characters" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

      
        const token = generateToken(newUser._id, res);

       
        return res.status(201).json({
            message: "User created successfully",
           
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error("Error in signup controller:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Username or password is incorrect" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Username or password is incorrect" });
        }

        // Generate token (sets cookie internally)
        const token = generateToken(user._id, res);

        // Send response
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



const logOut = async(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json("user logout successfull")
    }
    catch(error){
        console.log('error in logout controller')
        res.status(200).json({"error":"error in logout"})
    }
}


const getMe = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.user._id})
        if(!user){
            res.status(500).json("user not found")
        }
        res.status(200).json(user)

    } catch (error) {
        console.log("error in getme controller")
        res.status(400).json("internal server error")
    }

}


module.exports = { signUp, login,logOut,getMe };