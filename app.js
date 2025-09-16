'use strict';
/* serveur web*/
var port;
var express = require('express');
var exp = express();
exp.use(express.static(__dirname + '/www'));
exp.get('/', function (req, res) {
    console.log('Reponse a un client');
 res.sendFile(__dirname + '/www/index.html');
});

exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
});

 


/* *************** serveur WebSocket express ********************* */
//
var expressWs = require('express-ws')(exp);
// Connexion des clients � la WebSocket /echo et evenements associ�s
exp.ws('/echo', function (ws, req) {
    console.log('Connection WebSocket %s sur le port %s',
        req.connection.remoteAddress, req.connection.remotePort);
    ws.on('message', function (message) {
        console.log('De %s %s, message :%s', req.connection.remoteAddress,
            req.connection.remotePort, message);
        ws.send(message);
    });
    ws.on('close', function (reasonCode, description) {
        console.log('Deconnexion WebSocket %s sur le port %s',
            req.connection.remoteAddress, req.connection.remotePort);
    });
});

/*serveur web et web socket en �coute sur le port 80*/
var portServ = 80;
exp.listen(portServ, function () {
    console.log('serveur en ecoute');
});