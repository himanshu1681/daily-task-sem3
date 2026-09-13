const express = require("express");

const router = express.Router();

const {

    placeOrder,

    getOrders,

    updateOrderStatus,

    deleteOrder

} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, placeOrder);

router.get("/", authMiddleware, getOrders);

router.put("/:id", authMiddleware, updateOrderStatus);

router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;
