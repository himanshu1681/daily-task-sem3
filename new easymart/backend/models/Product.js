const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        required:true
    },

    variant:{
        type:String,
        default:""
    },

    image:{
        type:String,
        default:"https://via.placeholder.com/150"
    },

    rating:{
        type:Number,
        default:4.5
    }

},{
    timestamps:true
});

module.exports =
mongoose.model("Product", productSchema);
