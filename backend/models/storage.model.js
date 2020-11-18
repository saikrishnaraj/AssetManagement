const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storagedata = new Schema({
    storageid:{
        type : Number,
        required : true,
        unique: true,
    },
    location: {
        type: String,
        required:true
    },
    temp : { 
        type : [Number],
        required : true 
    },
    
    humid : { 
        type : [Number],
        required : true,
    },
}, {
    timestamps : true,
}) ;
const Storage = mongoose.model('storage',storagedata);

module.exports = Storage;