const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require('./routes/auth');
const dishRoute = require('./routes/dish');
const orderRoute = require('./routes/order');



const app = express();
dotenv.config();



mongoose.connect(
    process.env.MONGO
    ).then(()=>console.log("DBConnection is successsfull."))
     .catch((error)=>{
         console.log(error);
     });

     app.use(express.json());


     app.use("/api/auth", authRoute);
     app.use("/api/users", userRoute);
     app.use("/api/dishes", dishRoute);
     app.use("/api/orders", orderRoute);




app.listen(5000 , ()=>{
    console.log(`Server is running.`);
}) 