const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    bio:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true,
        minLength:6
    },
    profile:{
        type:String,
        default:""
    },
},{timestamps:true})


const User = mongoose.model("User",userSchema)
module.exports = User;