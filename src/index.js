const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
//const SocketIO = require('socket.io');


//var connect = 'mongodb://localhost/db_request';
var connect = `mongodb://localhost/db_playlist`;

mongoose.connect(connect)
    .then(db => {console.log('DB is connected')
        //setting
        const app = express();
        
        //process.env.PORT coloca el puerto que el SO genera por default si no agrega el puerto 3000
        
        app.set('port',3000);
        // app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json({limit: '50mb'}));

        //Routes
        app.use('/api/server', require('./routes/playlist_manager')) //Api
        app.use(express.static(path.join(__dirname, 'public'))); //Ruta publica en la que el cliente puede acceder
        //Apis 

        const server = app.listen(app.get('port'), () =>{
            console.log("server runing in: "+ app.get('port'));
        });
        
        //const io = SocketIO(server);
        // websockets
        /*
        io.on('connection' , (socket) => { //cuando alguien se conecta
            //console.log('new connection' , socket.id);
            socket.on('message', (msg) => 
                io.emit('message',{ 'user': socket.username, 'message': msg })
            )
        
            socket.on('message_credit', (msg) => 
                io.emit('message_credit',{ 'message': msg })
            )
        });
        */
    })
    .catch(err => {
        console.log(err)
    });

