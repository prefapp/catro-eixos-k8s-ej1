"use strict";

const os = require("os");

const express = require('express');
const app = express();

const uptime = Date.now();

const _package = require("./package.json");

const fs = require("fs");

const init = require("./lib/init.js");

let mongoVisitas;

app.get("/servidor", function(req, res){

  res.json({

    version: _package.version,

    hostname: os.hostname(),

    uptime: Math.round((Date.now() - uptime) / 1000)

  })

})

app.get('/', function(req, res){

  let v;

  mongoVisitas.getVisitas()

    .then((visitas) => {
    
      if(!visitas) v = 0;
      else  v = visitas.visitas;

      return mongoVisitas.nuevaVisita(v)
    })

    .then(() => {

      fs.readFile(__dirname + "/public/index.html", function(err, data){

        data = data.toString();  

        data = data.replace(/JSON/, JSON.stringify(
      
          {
          
            version: _package.version,
      
            hostname: os.hostname(),
      
            uptime: Math.round((Date.now() - uptime) / 1000),

            visitas: v
      
          }
        ))

        res.setHeader("Content-Type", "text/html");
        res.send(data);
        
      })
   })
})

init()

  .then(({MongoVisitas}) => {

    mongoVisitas = MongoVisitas;

    app.listen(process.env.PUERTO_APP || 3000);

  })

  .catch((err) => {

      console.log(`ERROR EN INIT: ${err}`);

      process.exit(1);

  })
