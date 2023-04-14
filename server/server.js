require("dotenv").config();
require("./config/dbConfig")
const express =require('express');
const cors =require("cors")
const app=express();

app.use(cors());
app.use(express.json({limit:"50mb"}));

app.use(express.json())

const port =process.env.PORT || 5000;
const userRoute=require("./routes/userRoute")
app.use("/api/users",userRoute);
app.listen(port,()=>
 console.log(`node running ${port}`)
)

