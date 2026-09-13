const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ===============================
// GET CART
// ===============================

const getCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const cart = await Cart.find({

            user: userId

        }).populate("product");

        res.status(200).json(cart);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===============================
// ADD TO CART
// ===============================

const addToCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const { productId, quantity } = req.body;

        if (!productId) {

            return res.status(400).json({

                success: false,

                message: "Product ID Required"

            });

        }

        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product Not Found"

            });

        }

        let item = await Cart.findOne({

            user: userId,

            product: productId

        });

        if (item) {

            item.quantity += quantity || 1;

            await item.save();

        }

        else {

            item = await Cart.create({

                user: userId,

                product: productId,

                quantity: quantity || 1

            });

        }

        const updatedCart = await Cart.find({

            user: userId

        }).populate("product");

        res.status(200).json({

            success: true,

            message: "Product Added To Cart",

            cart: updatedCart

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
// UPDATE CART
// ===============================

const updateCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const { quantity } = req.body;

        if (quantity < 1) {

            return res.status(400).json({

                success: false,

                message: "Quantity Must Be Greater Than 0"

            });

        }

        const item = await Cart.findOneAndUpdate(

            {

                _id: req.params.id,

                user: userId

            },

            {

                quantity

            },

            {

                new: true

            }

        ).populate("product");

        if (!item) {

            return res.status(404).json({

                success: false,

                message: "Cart Item Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Cart Updated",

            item

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
// DELETE CART ITEM
// ===============================

const deleteCartItem = async (req, res) => {

    try {

        const userId = req.user.id;

        const item = await Cart.findOneAndDelete({

            _id: req.params.id,

            user: userId

        });

        if (!item) {

            return res.status(404).json({

                success: false,

                message: "Item Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Item Removed"

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
// CLEAR CART
// ===============================

const clearCart = async (req, res) => {

    try {

        const userId = req.user.id;

        await Cart.deleteMany({

            user: userId

        });

        res.status(200).json({

            success: true,

            message: "Cart Cleared"

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

    getCart,

    addToCart,

    updateCart,

    deleteCartItem,

    clearCart

};
