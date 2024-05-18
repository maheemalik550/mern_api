const response_controller = async (req,res)=>{
    try {
        const user = req.user

        return res.status(200).json({message:"user is found",database_user:user})
        } catch (error) {
        return res.status(402).json({message:"an error is occured",error})
    }
}
module.exports = response_controller