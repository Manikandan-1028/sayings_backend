const express = require('express')
const router = express.Router()
const {signUp,login,logOut,getMe} = require('../controllers/authController')
const protectedRoute = require('../middlewares/protectedRoute')


router.post('/signup',signUp)
router.post('/login',login)
router.delete('/logout',logOut)
//logout remaining
router.get('/me',protectedRoute,getMe)

// router.get('me')


module.exports = router;