const express=require("express");
const router =express.Router({mergeParams:true}); 
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressErr=require("../utils/ExpressErr.js");
const {reviewSchema}=require("../schema.js"); 
const Review=require("../models/review.js");
const Listing = require("../models/listing.js"); 

const {validateReview}=require("../middleware.js");

const reviewController=require("../controllers/review.js");
// reviews
// post route

router.post("/",validateReview,wrapAsync(reviewController.createReview));
     
// delete review route
    router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));
    
    module.exports=router;