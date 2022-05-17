const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const app = express();
dotenv.config();



mongoose.connect(
    process.env.MONGO
    ).then(()=>console.log("DBConnection is successsfull."))
     .catch((error)=>{
         console.log(error);
     });





app.listen(3001 , ()=>{
    console.log(`Server is running.`);
}) 