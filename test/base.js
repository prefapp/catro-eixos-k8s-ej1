const {expect} = require("chai") 

const os = require("os");

const fetch = require('node-fetch');

describe("Funcionamiento general", function(){

  before(function(){

    process.env.PUERTO_APP = 3000;
    
  })

  before(function(hecho){

    require("../index.js")

    setTimeout(hecho, 1000)

  })

  it("Permite solicitar informes de servidor", function(hecho){

    fetch('http://localhost:3000/servidor')

    .then(function(res){

      return res.json();

    })

    .then(function(r){

      expect(r.hostname).to.equal(os.hostname())
      
      hecho();

    })

  })

  it("Terminar", function(){

    process.exit(0);

  })


})
