const express = require ('express')
const app = express()

const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3000

app.use('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
})