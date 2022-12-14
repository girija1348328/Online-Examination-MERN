const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const route = require("./routes/route.js")

const app = express()
//midleware
app.use(express.json())
app.use(cors());

//db
mongoose.connect("mongodb+srv://linagodbole99:dAix1EtU6C6yxJDR@cluster0.oip3eje.mongodb.net/onlineExamGirija", { 
    useNewUrlParser: true
})
.then(()=>console.log("MongoDB is connected.."))
.catch(err =>console.log(err))

app.use('/',route);

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listen on port ${port}`))