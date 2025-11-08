const express = require("express");
const protectedRoute = require("../middlewares/protectedRoute");
const { findPeople, Suggestedpeople } = require("../controllers/userController");
const router = express.Router()


router.get('/suggestedpeople',protectedRoute,Suggestedpeople)
router.get('/search/:username',protectedRoute,findPeople)

module.exports = router;