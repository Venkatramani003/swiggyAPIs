const mongoose = require('mongoose')
const UserSchema =new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    EmailId:{
        type:String,
        require:true,
        unique:true
    },
    PhNo : {
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{versionKey:false});
const UserDB = mongoose.model('User',UserSchema);
module.exports={UserDB};