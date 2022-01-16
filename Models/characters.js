const {Schema, model} = require('mongoose')

const ObjectId = Schema.ObjectId;
const CharacterSchema = new Schema({
    id: {type:ObjectId},
    realname: String,
    aka: {type:String, required:true},
    gender: {type:String, default:undefined},
    superpower: String,
    age: {type: Number, validate(value) { if (value < 0) throw new Error("Negative age are not real");}},
    residenceplace: String,
    side: {type:String, required:true},
    image: String,
},  {
    timestamps:true
});

const  character = model('character', CharacterSchema)
module.exports = {character};