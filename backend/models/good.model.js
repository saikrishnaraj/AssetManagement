const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gooddata = new Schema({
    storid :{
        type : Schema.Types.ObjectId,
        ref : 'storage'
    },
    storageid : {
        type : Number,
        required : true
    },
    goodid : { 
        type : Number,
        required : true,
        unique : true,  
    },
    gpsval : { 
        type : [Number],
        required : true,
    },
    
}, {
    timestamps : true,
}) ;
const Good = mongoose.model('good',gooddata);

module.exports = Good;