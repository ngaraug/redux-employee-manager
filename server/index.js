import express  from "express";
import mongoose from "mongoose";
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

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
    console.log(req.body)
    const newUser = new User({
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    })

    newUser.save().then( ()=> res.status(200).json({success: true}))
})
app.delete('/api/delete/:id', (req, res)=>{
    const id = req.params.id
    User.findByIdAndRemove({_id:id})
    .then(()=>res.status(200).json({success: true}))
    .catch((err)=> console.log(err.message))
})
app.put('/api/update', (req, res)=>{
    User.updateOne({_id: req.body._id}, 
        {$set: {
                    name: req.body.name,
                    salary: req.body.salary,
                    age: req.body.age
                }
        }).then(()=>{
            res.status(200).json({success: true})
                    }    
        )
    
})
app.get('/api/read', (req, res)=>{
    // console.log(req.body)
    User.find({}).then((user)=>{
        res.json(user)
    })
  
})

app.listen(process.env.PORT || 3000, ()=> console.log("Express server started"))