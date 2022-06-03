const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuidv4 = require('uuid/v4');

const Song = Schema({
    _id: {type: String, default: uuidv4()},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    title: { type:String, default:'unknown'},
    artist: {type: String, default:'unknown'},
    extension:String,
    mimetype:String,
    src:String,
    playlist_id:String,
    size:Number,
    album:{type:String, default:'unknown'},
    year:{type:Date, default: Date.now }
});

module.exports = mongoose.model('Song', Song);
//Aqui creamos el modelo de la tabla de la base datos D
//Modelo de las canciones 
