const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    default:null
},

    items:[
        {

            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },

            quantity:Number,

            price:Number

        }

    ],

    customerName:String,

    mobile:String,

    house:String,

    street:String,

    city:String,

    state:String,

    pincode:String,

    paymentMethod:String,

    total:Number,

    orderStatus:{

        type:String,

        default:"Pending"

    }

},{timestamps:true});

module.exports = mongoose.model("Order",orderSchema);
