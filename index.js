"use strict";

const os = require("os");

const express = require('express');
const app = express();

const uptime = Date.now();

const _package = require("./package.json");

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){

    res.sendFile(__dirname + '/public/index.html'); 

});

app.get("/servidor", function(req, res){

  res.json({

    version: _package.version,

    hostname: os.hostname(),

    uptime: Math.round((Date.now() - uptime) / 1000)

  })

})

app.listen(process.env.PUERTO_APP || 3000);
