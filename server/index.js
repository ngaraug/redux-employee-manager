import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";


const app = express()

app.use(bodyParser.urlencoded({extended:true}))

// connection to DB
const dbName = 'redux-usersDB'
const uri = 'mongodb+srv://ngaraug:GauMongoDB15@cluster0.drr9nzg.mongodb.net/' + dbName
mongoose.connect(uri).then(()=>{
    console.log("Connected successfully to " + dbName)
})

// DB document schema
const userSchema = new mongoose.Schema({
    name : String,
    salary: Number,
    age: Number
})

const User = new mongoose.model('User', userSchema)

app.post('/api/create', (req, res)=>{
    // console.log(req.body)
    res.send({msg: "yes working"})
})

app.listen(process.env.PORT || 3000, ()=> console.log("Express server started"))