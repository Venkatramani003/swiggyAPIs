const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
    ResName : {
        type:String,
        require:true
    },
    FoodName : {
        type :String,
        require :true
    },
    Price :{
        type:Number,
        require:true
    }
},{versionKey:false})
const CartDB = mongoose.model( 'Cart', CartSchema ) 
module.exports= {CartDB};