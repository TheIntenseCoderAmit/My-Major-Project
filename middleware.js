const Listing=require("./models/listing.js");
const {listingSchema,reviewSchema}=require("./schema.js"); 
const ExpressErr=require("./utils/ExpressErr.js");
const passport=require("passport");


// login Middleware
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in to create listing!");
        return res.redirect("/login");
      }
      next();
}

// It chech that you are the owner of the listing or not

module.exports.isOwner= async(req,res,next)=>{ 
  let { id } = req.params;
  let listing= await Listing.findById(id);
  if(! listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  } 
  next();
}

// checks validation for listing

module.exports.validateListing=(req,res,next)=>{
  let {error}= listingSchema.validate(req.body);

  if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressErr(400,errMsg);
  }else{
    next();
  }
}

// checks validation for reviews
module.exports.validateReview=(req,res,next)=>{
  let {error}= reviewSchema.validate(req.body);

  if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressErr(400,errMsg);
  }else{
    next();
  }
}
