
const Post = require("../models/postModel")
const User = require('../models/userModel')
const Shelf = require('../models/shelfModel')

// const allPosts = async (req, res) => {
//     try {
//         const post = await Post.find().populate("userId").select("-password");

//         if (!post) {
//             res.status(200).json("no post found")
//         }

//         res.status(200).json({
//             message:"success",
//             data:{
//                 post
//             }
//         })
//     }
//     catch (err) {
//         console.log("error in all post controller",err.message)
//         res.status(400).json("internal server error")
//     }
// }


const allPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "-password") // populate user but exclude password
      .lean();

    if (!posts || posts.length === 0) {
      return res.status(200).json({
        message: "No posts found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Success",
      data: posts,
    });
  } catch (err) {
    console.error("Error in allPosts controller:", err.message);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};



const createPost = async (req, res) => {
    try {
        const { bookName, bookImg, message, author } = req.body;
        const user = await User.findOne({ _id: req.user._id })
        if (!user) {
            res.status(400).json("user not found")
        }

        const newPost = new Post({
            userId: user._id,
            bookName,
            bookImg,
            message,
            author,
        })

        await newPost.save()
        res.status(200).json({"message":"post created successfully"})


    } catch (error) {
        console.log("error in create post controller", error.message)
        res.status(400).json("internal server error")
    }

}



const createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const id = req.params.id
        const user = req.user._id;

        if (!user) {
            res.status(400).json("text cannot be empty")
        }

        const post = await Post.findById({ _id: id })
        const comment = {
            user: user,
            text
        }

        post.comments.push(comment)
        await post.save()
        res.status(200).json(post)

    }
    catch (err) {
        res.status(500).json({ "error": "internal server error" })
        console.log("err in comment controller", err.message)
    }
}


//Code need to be revised
const shelf = async (req, res) => {
    try {
        const user = req.user._id;

        const getShelf = await Shelf.find({userId:user})
        res.status(200).json(getShelf)

    }
    catch(err){
        console.log("error in shelf",err.message)
        res.status(400).json({"error":"internal server error"})
    }
}
const createShelf = async (req, res) => {
    try {
        const { bookImg, bookName } = req.body;
        const user = req.user._id;


        const newShelf =new Shelf({
            userId: user,
            bookImg, 
            bookName
        })

        await newShelf.save()
        res.status(200).json(newShelf)


    } catch (error) {
        console.log('err in shelf', error.message)
        res.status(400).json({ "error": "internal server error" })
    }
}



module.exports = { allPosts, createPost, createComment,shelf,createShelf };