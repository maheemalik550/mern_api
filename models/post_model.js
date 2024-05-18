const mongoose = require('mongoose')
const { schema } = require('./user_model')

const post = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"signup_users"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
}, { timestamps:true})

const post_schema = mongoose.model("post",post)

module.exports = post_schema