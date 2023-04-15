const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const authMiddleware =require("../middlewares/authMiddleware")


router.post("/register", async (req, res) => {
  console.log("hello");
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      throw new Error("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    // console.log(user)
    await user.save();
    res.send({
      success: true,
      message: "user registered sucessfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// login a user
router.post("/login", async (req, res) => {
  

  try {
    console.log("hii")
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      throw new Error("User doesn't exist");
    }
    console.log("niya")
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("ash")
    if (!passwordCorrect) {
      throw new Error("Invalid Password");
    }
console.log("ariya")
    const token = jwt.sign(
      {
        userId:user._id,
      },
      SECRET
     
  );

  console.log("alan")
  console.log(token)
    res.send({
      success:true,
      data:token,
      message:"User Logged in sucessfully",
    });
  } catch (error) {
    console.log(error)
    res.send({
      success:false,
      message:error.message,
    });
  }
});

// get logges in user
router.get("/get-logged-in-user",authMiddleware ,async(req,res)=>{
  try{
    const user = await User.findOne({_id:req.body.userId})
    user.password =undefined;
    res.send({
      success:true,
      data:user,
      message:"User fetched sucessfully"
    })

  }catch(error){
   res.send({
    success:false,
    message:error.message,
   })
  }
})
module.exports = router;
