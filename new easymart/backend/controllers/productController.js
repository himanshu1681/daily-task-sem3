 const Product = require("../models/Product");

// Get All Products

const getProducts = async (req, res) => {


try {

    const products = await Product.find();

    res.json(products);

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

// Add Product

const addProduct = async (req, res) => {


try {

    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
        success: true,
        product
    });

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

// Update Product

const updateProduct = async (req, res) => {


try {

    const product =
    await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }

    );

    res.json({
        success: true,
        product
    });

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

// Delete Product

const deleteProduct = async (req, res) => {


try {

    await Product.findByIdAndDelete(
        req.params.id
    );

    res.json({
        success: true,
        message: "Product Deleted"
    });

} catch (error) {

    res.status(500).json({
        message: error.message
    });

}


};

module.exports = {
getProducts,
addProduct,
updateProduct,
deleteProduct
};
