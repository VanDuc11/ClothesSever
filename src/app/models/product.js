var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name: {type: String,maxLength: 100},
    image: {type: String,maxLength: 10000},
    soluong: {type: String,maxLength: 100},
    status: {type: String,maxLength: 20},
    price: {type: String,maxLength: 20},
    loai: {type: String,maxLength: 100},
    
},{timestamps: true});
module.exports = mongoose.model('product',product);