const express = require('express')
const router = express.Router()
const { allPosts,createPost, createComment,shelf, createShelf } = require('../controllers/postController');
const protectedRoute = require('../middlewares/protectedRoute');



router.get('/feed',protectedRoute,allPosts)
router.post('/create',protectedRoute,createPost)
router.post('/comment/:id',protectedRoute,createComment)
router.get('/shelf',protectedRoute,shelf)
router.post('/createshelf',protectedRoute,createShelf)


module.exports = router;