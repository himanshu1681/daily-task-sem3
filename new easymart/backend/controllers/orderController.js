
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ===============================
// PLACE ORDER
// ===============================

const placeOrder = async (req, res) => {

    try {

        const userId = req.headers.userid;

        const cart = await Cart.find({

            user: userId

        }).populate("product");

        if (cart.length === 0) {

            return res.status(400).json({

                success: false,

                message: "Cart Empty"

            });

        }

        let itemsTotal = 0;

        const items = cart.map(item => {

            itemsTotal += item.product.price * item.quantity;

            return {

                product: item.product._id,

                quantity: item.quantity,

                price: item.product.price

            };

        });

        let deliveryCharge = 0;

        if (itemsTotal > 0 && itemsTotal < 299) {

            deliveryCharge = 20;

        }

        const finalTotal = itemsTotal + deliveryCharge;

        const order = await Order.create({

            user: userId,

            customerName: req.body.name,

            mobile: req.body.mobile,

            house: req.body.house,

            street: req.body.street,

            city: req.body.city,

            state: req.body.state,

            pincode: req.body.pincode,

            paymentMethod: req.body.paymentMethod,

            items,

            total: finalTotal

        });

        await Cart.deleteMany({

            user: userId

        });

        res.json({

            success: true,

            message: "Order Placed Successfully",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// GET ORDERS
// ===============================

const getOrders = async (req, res) => {

    try {

        const userId = req.headers.userid;

        const orders = await Order.find({

            user: userId

        })

        .populate("items.product")

        .sort({

            createdAt: -1

        });

        res.json(orders);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// UPDATE STATUS
// ===============================

const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {

                orderStatus: req.body.orderStatus

            },

            {

                new: true

            }

        );

        res.json(order);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// DELETE ORDER
// ===============================

const deleteOrder = async (req, res) => {

    try {

        const userId = req.headers.userid;

        await Order.findOneAndDelete({

            _id: req.params.id,

            user: userId

        });

        res.json({

            success: true,

            message: "Order Deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    placeOrder,

    getOrders,

    updateOrderStatus,

    deleteOrder

};
