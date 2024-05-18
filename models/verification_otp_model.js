const { Schema,model } = require("mongoose");

const verification_otp = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'signup_users'
    },
    otp_code:{
        type:String,
        required:true
    }
},{timestamps:true})


const verification_otp_schema = model("otp_code",verification_otp)
module.exports = verification_otp_schema