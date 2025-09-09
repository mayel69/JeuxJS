'use strict';
/* serveur web*/
var port;
var express = require('express');
var exp = express();
exp.use(express.static(_dirname + '/www'));
exp.get('/', function (req, res) {
    console.log('reponse a un client');
    res.sendFile(_dirname + '/www/index.html');
});

exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('erreur serveur express');
});

exp.listen(80, function () {
    console.log('Serveur en ecoute');
});


/* serveur websocket express*/
var expressWs = require('express-ws')(exp);
//connexion des clients à la websocket /echo et evenement associes
exp.ws('/echo', function (ws, req) {
    console.log('Console websocket %s sur le port %s',
        req.connexion.remoteAdress, req.connexion.remotePort);

    ws.on('close', function (message) {
        console.log('De %s %s, message :%s', req.connexion.remoteAddress,
            req.connection.remotePort, message);
        ws.send(message)
    });

    ws.on('close', function (reasonCode, description) {
        console.log('Deconnexion websocket %s sur le port %s',
            req.connection.remoteAddress, req.connection.remotePort)
    });
});