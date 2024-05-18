const mongoose = require('mongoose')
//user schema
const user = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required:true
    }, 
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    is_verified:{
        type:Boolean,
        required:true,
        default:false
    },
    profile_image:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type: String,
        unique:true,
        required:true
    },
   
    login_Count:{
        type:Number,
        required:true,
        default:0
    },
}) 

const userSchema = mongoose.model("signup_users",user)

module.exports = userSchema 