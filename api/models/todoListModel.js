
'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema ({

    name:{
        type: String,
        default:"asad"
    },

    player:{
        type:String,
        default:"Saqib"
        
    },

    Created_Date:{
        type: Date,
        default:Date.now

    },

    Ratings:{
        type:String,
        default:0
    },

    Status:{
        type:[{
        type: String,
        enum: ['pending','ongoing','created' ]
        }],
        default:['pending']
    }

});

module.exports=mongoose.model('Tasks',TaskSchema);