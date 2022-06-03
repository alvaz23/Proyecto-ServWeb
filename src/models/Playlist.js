const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuidv4 = require('uuid/v4');

const Playlist = Schema({
    _id: {type: String, default: uuidv4()},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    name: String,
    description: String
});

module.exports = mongoose.model('Playlist', Playlist);
//Aqui creamos el modelo de la tabla de la base datos 
//Modelo de la playlist 