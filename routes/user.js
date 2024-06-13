const express=require("express");
const router =express.Router(); 
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const flash = require("connect-flash");
const userController=require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup))



router.route("/login")
.get(userController.renderLogin)
.post(passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login)


// Logout user
   router.get("/logout",userController.logout);

module.exports=router;
