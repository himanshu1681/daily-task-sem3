const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    getCart,

    addToCart,

    updateCart,

    deleteCartItem,

    clearCart

} = require("../controllers/cartController");

// ======================================
// ALL CART ROUTES REQUIRE LOGIN
// ======================================

router.get(

    "/",

    authMiddleware,

    getCart

);

router.post(

    "/",

    authMiddleware,

    addToCart

);

router.put(

    "/:id",

    authMiddleware,

    updateCart

);

router.delete(

    "/:id",

    authMiddleware,

    deleteCartItem

);

router.delete(

    "/",

    authMiddleware,

    clearCart

);

module.exports = router;
