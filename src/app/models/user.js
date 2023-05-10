const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User =  new Schema({
    name:{type: String,maxLength: 100},
    password:{type: String, maxLength: 100},
    email:{type: String,maxLength: 100},
},{timestamps:true});

module.exports = mongoose.model('user',User);
