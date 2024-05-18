const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const user_schema = require("../models/user_model");
const userSchema = require("../models/user_model");

const Check_auth_middleware = async (req, res,next) => {
    try {
       const auth_token = req.cookies.auth_token 
       console.log(auth_token)
       //get auth token from cookie
       const varify_token = jwt.verify(auth_token,process.env.JWT_SECRECT_KEY) // varify auth token
       console.log("varify_token",varify_token)
       if(!varify_token){
           return res
           .status(402)
           .json({message:"unauthorize user"})
       }
       const user_check = varify_token
       console.log("user_check",user_check)
       console.log(user_check.userId)   
       const user = varify_token.userId
        console.log(user._id)
      //  //find user throught userid 
       const find_user = await userSchema.findById(user)
       console.log("find_user",find_user)
       req.user = find_user
       return next()
      //  return res.json({succes:true,message:"hello  world"})
    } catch (error) {
       return res
       .status(500)
       .json({success:false,message:"internal server error"})
    }
   };
   

   module.exports = Check_auth_middleware 