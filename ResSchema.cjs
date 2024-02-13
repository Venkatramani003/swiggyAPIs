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
    veg :{
        type:Array

    },
    nonVeg : {
        type:Array
    }
},{versionKey:false})
const ResDB = mongoose.model( 'Restaurant',ResSchema) 
module.exports={ResDB};