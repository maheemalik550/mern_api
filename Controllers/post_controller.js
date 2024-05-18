const post_schema = require("../models/post_model")

const post_controller = async (req,res,next) =>{
try {
    const user = req.user
    const user_id = user._id 
    const body = req.body
    
    const create_post = await post_schema.create({
        ...body,
        user_id
    })
    
    if(!create_post){
        return res.json({message:"an error is occcured user is not found"})
    }
    console.log(user)
    return res.json({sucess:true,data:create_post})
} catch (error) {
    console.log(error)
    res.status(500).json({messgae:error})
}
}

// const getAllPost_Controller = async (req, res) => {
//     try {
//         const find_posts = await post_schema.find().populate('user_id', { password: 0 });

//         return res.json({ success: true, data: find_posts });
//     } catch (error) {
//         // Handling any errors that occur during the controller execution
//         return res.status(500).json({ success: false, message: "Internal server error!", error: error.message });
//     }
// }



    module.exports = {post_controller}