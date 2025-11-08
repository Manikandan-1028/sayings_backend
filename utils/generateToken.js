const jwt = require('jsonwebtoken')
// const secret = process.env.SECRET_KEY

const generateToken = (userId,res) =>{
    const token = jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:"14d"
    })

    res.cookie("jwt",token,{
        maxAge:14*24*60*1000,
        httpOnly:true,
        sameSite:"strict"
    })
}


module.exports=generateToken;