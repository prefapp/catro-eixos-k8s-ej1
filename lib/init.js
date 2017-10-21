const MongoVisitas = require("./visitas.js");

module.exports = function(){

  return new Promise((cumplida, falla) => {

    new MongoVisitas()

          .iniciar()

          .then((MongoVisitas) => {

            cumplida({MongoVisitas})

          })

          .catch((err) => {
            falla(err)
          })
  })

}
