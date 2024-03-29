const mongoose = require('mongoose')
const ResSchema = new mongoose.Schema({
    Name : {
        type : String,
        required :true
    },
    Rating : {
        type:Number
    },
    location :{
        type:String,
        require : true
    },
    Price : {
        type:String,
        require:true
    },
    Dish :{
        type:String

    },
    DishName :{
        type:String
    },
    imgLink : {
        type : String
    }
},{versionKey:false})
const ResDB = mongoose.model( 'Restaurant',ResSchema) 
module.exports={ResDB};