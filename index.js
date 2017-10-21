"use strict";

const os = require("os");

const express = require('express');
const app = express();

const uptime = Date.now();

const _package = require("./package.json");

const fs = require("fs");

app.get("/servidor", function(req, res){

  res.json({

    version: _package.version,

    hostname: os.hostname(),

    uptime: Math.round((Date.now() - uptime) / 1000)

  })

})

app.get('/', function(req, res){

  fs.readFile(__dirname + "/public/index.html", function(err, data){

    data = data.toString();  

    data = data.replace(/JSON/, JSON.stringify(
  
      {
      
        version: _package.version,
  
        hostname: os.hostname(),
  
        uptime: Math.round((Date.now() - uptime) / 1000)
  
      }
    ))

    res.setHeader("Content-Type", "text/html");
    res.send(data);
    
  })

})

app.listen(process.env.PUERTO_APP || 3000);
