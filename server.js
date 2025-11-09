const express = require('express')
const app = express()
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cors())
app.use(cookieParser())

// const dataApi = await fetch('https://openlibrary.org/search.json?title=game+of+thrones')
// const data = await dataApi.json()
// const  {docs}  = data;
// console.log(books)
// console.log(data)
// if (docs) {
//     let newBook = docs.slice(0, 20).map(bookSingle => {

//         let {key,author_name,cover_i,title} = bookSingle;
//         return {
//             id: key,
//             author: author_name,
//             cover_id: cover_i,
//             title: title
//         }
//     })
//     console.log(newBook)
// }
// else{
//     console.log("error in condition")
// }



app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/people',userRoute)



app.listen(8000, () => {
    console.log("server listening in 8000")
    mongoose.connect(process.env.MONGO_URL)

        .then(() => {
            console.log("database connected")
        })
        .catch((err) => {
            console.log("error in db", err)
        })
})