const userSchema = require("../models/user_model")

const test_middleware = async (req,res,next)=>{
    try {
        const userId = req.params.id
        const find_user = await userSchema.findById(userId)

        if(!find_user){
            return res.json({message:"user not  found"})
        }
        req.user =  find_user
        if(find_user){
            return next()
        }
        
    } catch (error) {
        // return res.status(402).json({message:"an error is occured"})
    }
  
}

module.exports = test_middleware