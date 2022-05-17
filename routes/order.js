const router = require("express").Router();
const Order = require("../models/Order");
const {verifyJwtToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");


 //CREATE
 router.post("/", verifyJwtToken,  async (req,res)=>{
    const newOrder= new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
    
    //UPDATE
    router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
      
        try {
          const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedOrder);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    
    
    //DELETE
    router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
        try {
          await Order.findByIdAndDelete(req.params.id);
          res.status(200).json("Dishes in bill has been deleted.");
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
    
      //GET ORDER
      router.get("/:userId", verifyTokenAndAuthorization , async (req, res) => {
        try {
          const order= await Order.findOne({userId: req.params.userId});
          res.status(200).json(order);
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
      //GET ALL ORDERS
      router.get("/", verifyTokenAndAdmin, async (req, res) => {
       try {
           const orders = await Order.find();
           res.status(200).json(orders);
       } catch (error) {
           res.status(500).json(error);
       }
      });
      

module.exports = router 