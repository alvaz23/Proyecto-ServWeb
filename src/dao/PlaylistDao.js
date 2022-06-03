'use strict'
const uuidv4 = require('uuid/v4');
const Playlist = require('../models/Playlist');

async function create(data) {
    const result = await (new Playlist(data)).save();
    return result;
}

async function updateById(id, playlist) {
    // "Datos guardados correctamente"
    const result = await Playlist.findByIdAndUpdate(id, playlist);
    return result; 
}

async function getAll() {
    const result = await Playlist.find();
    return result;
}

async function getById(id){
    const result = await Playlist.findById(id).exec();
    return result;
}

async function deleteById(id){
    const result = await Playlist.deleteOne({_id:id});
    return result;
}


module.exports = {
    create,
    updateById,
    getAll,
    getById,
    deleteById
}

//Funciones para realizar consultas en la tabla 