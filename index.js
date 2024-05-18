require("dotenv").config()
const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:5173'
  };
  app.use(cors(corsOptions));
const all_routes = require('./routes/index')
const connect_to_database = require("./database")
const cookieParser = require('cookie-parser')
app.get("/app",(req,res)=>{
return res.send("<h1>hello world</h1>")
})

app.use(express.json())
app.use(cookieParser())
app.use(all_routes)
connect_to_database()

// const port = process.env.PORT
app.listen(process.env.PORT ,()=>{
    console.log(`server is runnig ${process.env.PORT}`)
})