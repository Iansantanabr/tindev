const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');


const httpServer = express();
const server = require('http').Server(httpServer);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    console.log( user, socket.id );

    connectedUsers[ user ] = socket.id;
});

mongoose.connect('mongodb+srv://tindev:tindev@cluster0-z8adh.mongodb.net/tindevdb?retryWrites=true&w=majority', {
    useNewUrlParser: true //necessário para informar que está usando nova forma de passar os dados
});

httpServer.use((req, res, next) => { 
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
 });

 
httpServer.use(cors());
httpServer.use(express.json());
//GET, POST, PUT, DELETE
httpServer.use(routes);

server.listen(3333);

//MVC 
//M - MODEL (ABSTRAÇÃO DO BANDO DE DADOS)
//V-VIEW ( TELAS )
//C-CONTROLLER (GUARDA AS REGRAS DE NEGÓCIOS)

