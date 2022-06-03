'use strict'
const uuidv4 = require('uuid/v4');
const Song = require('../models/Song');

async function add(song) {
    const result = await (new Song(song)).save();
    return result;
}

async function getById(id) {
    const result = await Song.findById(id);
    return result;
}

async function deleteAllByPlaylistId(id){
    const result = await Song.deleteMany({playlist_id:id});
}

async function getByPlaylistId(id){
    const songs = await Song.find({playlist_id:id});
    return songs;
}

async function deleteById(id){
    console.log(id);
    const result = await Song.deleteOne({_id:id});

    return result;
}

async function updateById(id, song){
    const result = await Song.findByIdAndUpdate(id, song);
    return result;
}

module.exports = {
    add,
    updateById,
    getById,
    deleteById,
    getByPlaylistId,
    deleteAllByPlaylistId

}

//Funciones para realizar consultas en la tabla 