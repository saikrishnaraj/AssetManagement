const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storedata = new Schema({
    
    place : { 
        type : String,
        required : true,
        unique:true, 
    }
}, {
    timestamps : true,
}) ;
const Store = mongoose.model('store',storedata);

module.exports = Store;