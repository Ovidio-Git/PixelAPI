const {Schema, model} = require('mongoose')

const ObjectId = Schema.ObjectId;
const registersSchema = new Schema({
    id: {type:ObjectId},
    name: {type:String},
    artist: {type:String},
    typepixelart: {type:String, required:true},
    animation: {type:Boolean},
    published: {type:Date},
    urlpixelart: {type:String, required:true},
    originpage: {type:String, required:true},
},  {
    timestamps:true
});

module.exports = model('registers', registersSchema);