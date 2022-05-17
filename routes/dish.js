const router = require("express").Router();
const Dish = require("../models/Dish");
const { verifyTokenAndAdmin} = require("./verifyToken");



 //CREATE
router.post("/", verifyTokenAndAdmin,  async (req,res)=>{
const newDish = new Dish(req.body)
try {
    const savedDish = await newDish.save();
    res.status(200).json(savedDish)
} catch (error) {
    res.status(500).json(error)
}
})


 //UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  
    try {
      const updatedDish = await Dish.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDish);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Dish.findByIdAndDelete(req.params.id);
      res.status(200).json("Dish has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get dish
  router.get("/:id", async (req, res) => {
    try {
      const dish = await Dish.findById(req.params.id);
      res.status(200).json(dish);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get all dishes
  router.get("/",  async (req, res) => {
    const newQuery = req.query.new;
    const categoryQuery = req.query.category;
    const  ingredientsQuery = req.query.ingredients;
    try {
      let dishes;
      if(newQuery){
        dishes = await Dish.find().sort({createdAt:-1}.limit(1))
      } else if(categoryQuery){
        dishes = await Dish.find({categories:{
              $in:[categoryQuery],
          },
    });
      }
      else if(ingredientsQuery){
        dishes = await Dish.find({ingredients:{
            $in:[ingredientsQuery],
        }, });}
    else{
          dishes = await Dish.find();
      }
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 