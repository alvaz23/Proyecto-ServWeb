const { response } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const PlaylistDao = require('../dao/PlaylistDao.js');
const SongsDao = require('../dao/SongDao');

const url_uploads = './src/public/uploads/';

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const directory = url_uploads+req.params.id;
        cb(null, directory);
    },
    filename: async function (req, file, cb) {
        const filename = req.body.filename;
        const extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null, filename + extension);
    }
})
//Nos permite definir archivos que subiremos al servidor

var upload = multer({ storage:storage });
var uploadfile = upload.single('file'); //Definimos que colo podemos definir un archivo por cada consulta 

//APIS CON FUNCIONES CRUD PARA LISTA
router.post('/create/playlist/', async(req, res) => {
    const playlist = req.body.params;
    playlist._id = uuidv4(); //se genera un única id 
    var response = await PlaylistDao.create(playlist);
    if(response!=null){
        const directory = url_uploads+response._id;
        try {
            if (!fs.existsSync(directory)){ //detecta si existe un directorio, si no, lo crea de la playlist
                fs.mkdirSync(directory)
            }
        } catch (err) {
            console.error(err)
        }
        res.status(200).json({message:'Se ha agregado la playlist '+playlist.name, result:response});
    }else
        res.status(203).json({message:'No se guardó esta playlist', result:null});
});

router.get('/getall/playlists', async(req, res) =>{
    const response = await PlaylistDao.getAll();
    if(response!=null){
        res.status(200).json({message:'Consulta realizada', result:response});
    }else
        res.status(203).json({message:'No se ha pudieron recuperar los datos', result:[]});
        
});

router.put('/update/playlist/byId/:id', async(req , res) => {
    const id = req.params.id;
    const playlist = req.body.playlist;
    const response = await PlaylistDao.updateById(id, playlist);
    if(response!=null){
        res.status(200).json({message:'Se actualizó el archivo en la base de datos', result:response});
    }else
        res.status(203).json({message:'No se pudo actualizar este archivo', result:null});

});

router.get('/get/playlist/byId/:id', async(req, res) =>{
    const playlist_id = req.params.id;
    const playlist = await PlaylistDao.getById(playlist_id);
    const songs = await SongsDao.getByPlaylistId(playlist_id);
    if(songs != null){
        res.status(200).json({message:'Playlist encontrada', data:{songs, playlist}});
    }else{
        res.status(203).json({message:'No hay información disponible', data:null});
    }
});

router.post('/delete/playlists/byIds', async(req , res) => {
    const playlist_ids = req.body.ids;
    for(const i in playlist_ids){
        const id = playlist_ids[i];
        await PlaylistDao.deleteById(id);
        await SongsDao.deleteAllByPlaylistId(id);
        deleteFolder(url_uploads+id);
    }

    if(true){
        res.status(200).json({message:'Elementos eliminados', success:true});
    }else
        res.status(203).json({message:'No hay información disponible', success:false});

})
//Eliminamos un grupo de playlist mediante sus ids por el metodo post

router.post('/add/song/byPlaylistId/:id', async(req, res) => {
    var file = req.body.song;
    const path = req.params.id;
    file._id = uuidv4();
    file.src = './uploads/'+path+'/';
    
    const response = await SongsDao.add(file);
    if(response!=null){
        res.status(200).json({message:'Se ha agregado esta canción a la playlist '+file.playlist_name, result:response});
    }else{
        res.status(203).json({message:'No se pudo guardar esta canción', result:null});
    }
});
//Se crea un registro en la base de datos de una canción 

router.put('/uploadfile/:id', async (req, res) => {
    uploadfile(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).json({message:'A Multer error occurred when uploading.'});
        } else if (err) {
            res.status(500).json({message:'An unknown error occurred when uploading.'});
        }
        
        res.status(200).json({message:'Archivo subido'});
    });
});
//Se carga al servidor la canción 

router.get('/get/song/byId/:id', async(req, res) =>{
    const id = req.params.id;
    const response = await SongsDao.getById(id);
    if(response!=null){
        res.status(200).json({message:'Canción encontrada', result:response});
    }else{
        res.status(203).json({message:'No se pudieron encontrar los datos de esta canción', result:null});
    }
});
//Se obtiene la canción por el id 

router.put('/update/song/byId/:id', async(req , res) => {
    const songId = req.params.id;
    const song = req.body.song;
    const response = await SongsDao.updateById(songId, song);
    if(response!=null){
        res.status(200).json({message:'Se ha actualizado esta canción', result:response});
    }else{
        res.status(203).json({message:'No se pudo actualizar esta canción', result:null});
    }
});
//Se actualiza una canción por el id

router.delete('/delete/song/byId/:id', async(req , res) => {
    const id = req.params.id;
    console.log(id);
    const response = await SongsDao.deleteById(id);
    console.log(response);
    if(true){
        res.status(200).json({message:'Se ha eliminado esta canción', success:true});
    }else{
        res.status(203).json({message:'No se pudo eliminar esta canción',success:false});
    }

})
//Se elimina una cancion por id
//APIS CON FUNCIONES CRUD PARA CANCIONES

function deleteFolder(path) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
//esta funcion recibe un directorio y elimina el directorio y sus archivos 

module.exports = router;
