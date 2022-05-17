const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
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
      amount:{type:Number, required:true},
    },
    {timestamps:true}
)
module.exports = mongoose.model("Bill", BillSchema); 