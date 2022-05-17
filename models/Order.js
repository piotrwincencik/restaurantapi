const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        dishes:[{
            dishId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ],

    },
    {timestamps:true}
)
module.exports = mongoose.model("Order", OrderSchema); 