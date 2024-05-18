const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const user_schema = require("../models/user_model")
const cookieParser = require('cookie-parser')
const generate_otp = require("../serives/generate_otp")
const send_email_verification = require("../serives/nodemailer_service")
const verification_otp_schema = require("../models/verification_otp_model")
const donors_schema = require("../models/doners_model")



//check

const get_controller =  async (req,res)=>{
try {
    const response = await donors_schema.find()
    // return res.status(200).json({message:"hello world"})
    return res.json({response,message:"donor is get"})
} catch (error) {
    return res.status(500).json({message:"not found",error})
}
}

//Signup
const Signup_controller = async (req,res)=>{
try {
    const body = req.body
    const  salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(body.password, salt);
    const user = await user_schema.create({
        ...body,
        password:hash_password
    })
    const generated_otp = generate_otp()
    await verification_otp_schema.create({
        user_id:user._id,
        otp_code:generated_otp
    })
    const answer = await send_email_verification(body.email,generated_otp)
    console.log(generated_otp)

    return res.send({answer,success:true,data:user,message:"registered successfully! please verify your email via OTP"})
} catch (error) {
    return res.status(500).json({success:false,messages:"not found",error})
}
}


const verify_otp_controller = async (req,res)=>{
try {
    const {email,otp_code} = req.body
    const find_user = await user_schema.findOne({email})
    if(!find_user){
       return res.status(401).json({message:"Entered invalid otp"})
    }
    const find_user_otp = await verification_otp_schema.findOne({user_id:find_user._id})
    if(!find_user_otp){
        return res.status(401).json({message:"Entered invalid otp"})
    }

    await find_user_otp.deleteOne()
    await find_user.updateOne({is_verified:true})
    return res.status(200).json({message:"OTP successfully verified",find_user_otp,find_user})

} catch (error) {
    return res.json({message:"an error is occured",error})
}
}


const Login_controllers = async (req,res)=>{
   const body = req.body
   const find_user = await user_schema.findOne({email:body.email})
   if(!find_user){
    return res.json("invalid credentails")
   }
   console.log("user",find_user)

   const compare = await bcrypt.compareSync(body.password, find_user.password);
   console.log(compare)
   if(!compare){
    return res.status(200).json({ success: false, message: "invalid credential" })
       }
    
       const payload = {
        userId:find_user._id
       }
    
       const jwt_token = jwt.sign(payload, process.env.JWT_SECRECT_KEY, {
        expiresIn: "1h",
      });

      find_user.$inc('login_Count',1)
      await find_user.save()

      res.cookie("auth_token",jwt_token)
   return res.json({message:"user is logged in ",sucess:true,user:find_user,token:jwt_token})
}

//check_auth
const Check_auth_controller = async (req, res) => {
 try {
    // const auth_token = req.cookies.auth_token
    // const varify_token = jwt.verify(auth_token,process.env.JWT_SECRECT_KEY)
    
    // if(!varify_token){
    //     return res
    //     .status(402)
    //     .json({message:"unauthorize user"})
    // }
    // const user = varify_token.userId
    // // console.log(user)
    // //find user throught userid 
    // const find_user = await user_schema.findById(user)
    // console.log(find_user)
    const user  = req.user
    return res.json({message:"auth controller",succes:true,user})
 } catch (error) {
    return res
    .status(500)
    .json({success:false,message:"internal server errror .."})
 }
};

//logoutcontroller
const Logout_Controller = async (req,res)=>{
res.clearCookie('auth_token').status(200).json({message:"logout controller succesfully running"})
}
// module.exports = {
//     "Signup_controller": Signup_controller,
//     "verify_otp_controller": verify_otp_controller,
//     "Login_controllers": Login_controllers,
//     "Check_auth_controller": Check_auth_controller
// }

module.exports = {get_controller,Logout_Controller,Signup_controller,verify_otp_controller,Login_controllers,Check_auth_controller}