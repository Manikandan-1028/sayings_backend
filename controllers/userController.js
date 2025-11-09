const User = require('../models/userModel')

const Suggestedpeople=async(req,res)=>{
    try{
        const userId = req.user._id;
        const users = await User.aggregate([{$match:{_id:{$ne:userId}}},{$sample:{size:10}}, { $project: { password: 0 } }])

        res.status(200).json(users)

    }
    catch(err){
        console.log(err)
        res.status(400).json({"error":"users not found"})
    }

}

const findPeople=async(req,res)=>{
    try {
        const userName = req.params.username;
        const findUser = await User.findOne({username:userName})

        if(!findUser){
            res.status(400).json({"error":"user not found"})
        }

        res.status(200).json(findUser)
    } catch (error) {
        console.log("error in usercontroller find people")
    }
}

module.exports = {Suggestedpeople,findPeople};