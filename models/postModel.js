const mongoose = require('mongoose')
require('./userModel')


const postSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    bookImg:{
        type:String,

    },
     bookName:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    message:{
        type:String,
        required:true,
    },
    comments:[
        {
            text:{
                type:String,
                required:true
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        }
    ]
},{timestamps:true})



const postModel = mongoose.model("Post",postSchema)
module.exports = postModel;