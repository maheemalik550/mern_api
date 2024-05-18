const mongoose  = require('mongoose')

const connect_to_database =  async()=>{
    mongoose.connect(process.env.MONGODB_DATABASE);
    mongoose.connection.on("connected",()=>{
        console.log("mongodb is connected")
    })
    mongoose.connection.on("error",(error)=>{
        console.log("an error is occured ")
    })
}
module.exports = connect_to_database 