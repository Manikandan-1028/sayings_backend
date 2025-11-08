const mongoose = require('mongoose')

const shelfSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    bookImg:{
        type:String,
        required:true
    },
    bookName:{
        type:String,
        required:true
    }
})


const shelfModel = mongoose.model("Shelf",shelfSchema)
module.exports = shelfModel;