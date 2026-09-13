const express = require("express");

const router = express.Router();

const {

    signup,

    login,

    logout,

    getCurrentUser

} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


// ===================================
// PUBLIC ROUTES
// ===================================

router.post("/signup", signup);

router.post("/login", login);


// ===================================
// PRIVATE ROUTES
// ===================================

router.get(

    "/me",

    authMiddleware,

    getCurrentUser

);

router.post(

    "/logout",

    logout

);


// ===================================

module.exports = router;
