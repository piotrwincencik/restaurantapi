const mongoose = require("mongoose");

const DishesSchema = new mongoose.Schema(
    {
        title:{type:String, required:true, unique:true},
        ingredients:{type:Array, required:true},
        categories:{type:Array, required:true},
        weight:{type:Number},
        price:{type:Number, required:true}  
    },
    {timestamps:true}
)
module.exports = mongoose.model("Dishes", DishesSchema); 