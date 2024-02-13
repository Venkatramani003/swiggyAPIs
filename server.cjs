const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const {UserDB} = require('./UserSchema.cjs')
const {ResDB} = require('./ResSchema.cjs')
const {CartDB} = require('./CartSchema.cjs')
const port =process.env.PORT||8000           //=>for Generic host || for local host
async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://vr:123@venkat.mgv0myn.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log('connected to db..')
        app.listen(port,()=>{
            console.log(`listening on port ${port}`)
        })
    }catch(error){
        console.log(`Error connecting to the database: ${error}`)
    }
}
//Connection to db
connectToDb()
// Sign-up
app.post('/sign-up',async (req,res)=>{
    try{
        await UserDB.create({
            Name:req.body.username,
            EmailId :req.body.emailId,
            PhNo: req.body.PhNo,
            password: req.body.password,
        })
        res.status(201).json({
            'status':'User Created'
        })
    }catch(err){
        const result = await  UserDB.findOne({EmailId:req.body.emailId}) 
        if(!result) res.send({'status':'This email is already registered!'})
        else res.status(501).json({
            'status':"Failed",
            "message":'Invalid credentials!',
        })
        console.log(err)
    }
})
//Log-in
app.post('/log-in',async (req,res)=>{
    try{
        const result = await UserDB.findOne({
            EmailId:req.body.emailId,
            password:req.body.password
        });
        if (result==null) return res.status(403).json("Wrong Credentials")
        else return res.json("Successfully logged in")
    }catch(err){
        console.log("wrong credentials")
    }
})
//restaurant deatails enter {admim}
app.post('/newRes',async (req,res)=>{
    try{
        await ResDB.create({
            Name:req.body.name,
            Rating:req.body.rating,
            location:req.body.location,
            veg:req.body.veg,
            nonVeg:req.body.nonVeg
        })
        res.status(201).json({'status':'Restaurent Added !..'})
    }catch(err){
        res.json({
            'status':'Error'
        })
    }
})
//view res
app.get('/viewRes',async (req,res)=>{
    res.json(await ResDB.find())
})
//add to cart
app.post('/addTocart',async (req,res)=>{
    try{
        await CartDB.create({
            ResName:req.body.name,
            FoodName:req.body.fname,
            Price:req.body.price
        })
        res.json({'status':'Added to cart'})
    }catch(err){
        res.json({'status':'Failed to add'})
    }
})