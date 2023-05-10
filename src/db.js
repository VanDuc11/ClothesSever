const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Ass_product_db');
        // await mongoose.connect('mongodb+srv://duytqph20012:duymanh03@cluster0.fm4fknj.mongodb.net/CP17301?retryWrites=true&w=majority');

        console.log("connect thành công");

    } catch (error) {
        console.log("connect không thành công");
        
    }
}
module.exports = { connect };
