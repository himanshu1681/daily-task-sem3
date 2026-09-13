require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// ========================
// Database
// ========================

connectDB();

// ========================
// Middlewares
// ========================

app.use(express.json());

app.use(cookieParser());

app.use(cors({

    origin: "http://127.0.0.1:5500",

    credentials: true

}));

// ========================
// Home Route
// ========================

app.get("/", (req, res) => {

    res.send("🚀 EasyMart Backend Running");

});

// ========================
// Routes
// ========================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

// ========================
// Test Product
// ========================

app.get("/add-test-product", async (req, res) => {

    try {

        const Product = require("./models/Product");

        const product = new Product({

            name: "Basmati Rice",

            category: "Grocery",

            price: 100,

            stock: 50,

            variant: "1kg"

        });

        await product.save();

        res.send("✅ Product Added");

    }

    catch (error) {

        res.send(error.message);

    }

});

// ========================
// Start Server
// ========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server Running On Port ${PORT}`);

});
