const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


    const user = new User({firstName,lastName,email,password:hashedPassword});
    await user.save();
    res.send({
      success:true,
      message: "user registered sucessfully",
    });
  } catch (error) {
    res.send({
      success:false,
      message:error.message,
    });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    // check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User doesn't exist");
    }
    // check pasword
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCorrect) {
      throw new Error("Invalid Password");
    }
    //  create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "30d",
    });
    res.send({
      success: true,
      data: token,
      message: "User Logged in sucessfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
