const { Schema, model } = require("mongoose");

const donors = new Schema({
    full_name:{
        type:String,
        required:true,
    },
    blood_group:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    phone_number:{
        type:String,
        required:true,
        minLength:11 
    }
})

const donors_schema = model("blood_donors",donors)


module.exports = donors_schema